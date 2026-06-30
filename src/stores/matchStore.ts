import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { groupMatches } from '../data/matches'
import { teams, groupNames } from '../data/teams'
import type { GroupMatch, GroupStanding, ThirdPlaceRanking } from '../types'

export const useMatchStore = defineStore('matches', () => {
  const matches = ref<GroupMatch[]>(loadMatches())

  function loadMatches(): GroupMatch[] {
    return JSON.parse(JSON.stringify(groupMatches))
  }

  function saveMatches() {
    localStorage.setItem('wc2026-matches', JSON.stringify(matches.value))
  }

  function updateScore(matchId: number, homeScore: number | null, awayScore: number | null) {
    const match = matches.value.find(m => m.id === matchId)
    if (match) {
      match.homeScore = homeScore
      match.awayScore = awayScore
      saveMatches()
    }
  }

  function resetAllScores() {
    matches.value = JSON.parse(JSON.stringify(groupMatches))
    localStorage.removeItem('wc2026-matches')
  }

  function getMatchesByGroup(group: string): GroupMatch[] {
    return matches.value.filter(m => m.group === group)
  }

  // Calculate standings for a group
  function calculateStandings(group: string): GroupStanding[] {
    const groupTeams = teams.filter(t => t.group === group)
    const groupMatchList = matches.value.filter(m => m.group === group)

    const standings: GroupStanding[] = groupTeams.map(team => {
      const teamMatches = groupMatchList.filter(
        m => (m.homeTeam === team.code || m.awayTeam === team.code) &&
          m.homeScore !== null && m.awayScore !== null
      )

      let played = 0, won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0

      teamMatches.forEach(m => {
        played++
        const isHome = m.homeTeam === team.code
        const gf = isHome ? m.homeScore! : m.awayScore!
        const ga = isHome ? m.awayScore! : m.homeScore!

        goalsFor += gf
        goalsAgainst += ga

        if (gf > ga) won++
        else if (gf === ga) drawn++
        else lost++
      })

      return {
        teamCode: team.code,
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
        points: won * 3 + drawn,
        position: 0,
        qualified: null,
      }
    })

    // Sort by: points, goal difference, goals scored, then FIFA ranking
    standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor

      // Head-to-head
      const h2h = getHeadToHead(a.teamCode, b.teamCode, groupMatchList)
      if (h2h !== 0) return h2h

      // FIFA ranking (lower is better)
      const teamA = teams.find(t => t.code === a.teamCode)
      const teamB = teams.find(t => t.code === b.teamCode)
      return (teamA?.fifaRanking ?? 999) - (teamB?.fifaRanking ?? 999)
    })

    // Assign positions
    standings.forEach((s, i) => {
      s.position = i + 1
      if (i === 0) s.qualified = 'first'
      else if (i === 1) s.qualified = 'second'
      else if (i === 2) s.qualified = null // will be determined by third-place comparison
      else s.qualified = null
    })

    return standings
  }

  function getHeadToHead(teamA: string, teamB: string, matchList: GroupMatch[]): number {
    const h2hMatch = matchList.find(
      m => ((m.homeTeam === teamA && m.awayTeam === teamB) ||
        (m.homeTeam === teamB && m.awayTeam === teamA)) &&
        m.homeScore !== null && m.awayScore !== null
    )

    if (!h2hMatch) return 0

    const aIsHome = h2hMatch.homeTeam === teamA
    const aGoals = aIsHome ? h2hMatch.homeScore! : h2hMatch.awayScore!
    const bGoals = aIsHome ? h2hMatch.awayScore! : h2hMatch.homeScore!

    if (aGoals > bGoals) return -1 // a wins -> a ranked higher
    if (bGoals > aGoals) return 1  // b wins -> b ranked higher
    return 0
  }

  // Computed: all group standings
  const allStandings = computed(() => {
    const result: Record<string, GroupStanding[]> = {}
    groupNames.forEach(group => {
      result[group] = calculateStandings(group)
    })
    return result
  })

  // Get third-placed teams from all groups
  const thirdPlaceTeams = computed((): ThirdPlaceRanking[] => {
    const thirds: ThirdPlaceRanking[] = []

    groupNames.forEach(group => {
      const standings = allStandings.value[group]
      if (standings.length >= 3) {
        const third = standings[2]
        if (third.played > 0) {
          thirds.push({
            teamCode: third.teamCode,
            group,
            points: third.points,
            goalDifference: third.goalDifference,
            goalsFor: third.goalsFor,
            qualified: false,
          })
        }
      }
    })

    // Sort thirds by: points, goal difference, goals scored
    thirds.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor

      // FIFA ranking as tiebreaker
      const teamA = teams.find(t => t.code === a.teamCode)
      const teamB = teams.find(t => t.code === b.teamCode)
      return (teamA?.fifaRanking ?? 999) - (teamB?.fifaRanking ?? 999)
    })

    // Top 8 qualify
    thirds.forEach((t, i) => {
      t.qualified = i < 8
    })

    return thirds
  })

  // Get group winner (1st place team code)
  function getGroupPosition(group: string, position: number): string | null {
    const standings = allStandings.value[group]
    if (!standings || standings.length < position) return null
    const team = standings[position - 1]
    // Only return if at least 1 game played
    if (team.played === 0) return null
    return team.teamCode
  }

  function allocateThirdPlaces(slots: string[]): Record<string, string> {
    const qualifiedThirds = thirdPlaceTeams.value.filter(t => t.qualified)
    const assignments: Record<string, string> = {}
    const usedTeams = new Set<string>()

    function backtrack(slotIndex: number): boolean {
      if (slotIndex === slots.length) return true

      const slot = slots[slotIndex]
      const optionGroups = slot.replace('3', '').split('/')

      for (const team of qualifiedThirds) {
        if (!usedTeams.has(team.teamCode) && optionGroups.includes(team.group)) {
          usedTeams.add(team.teamCode)
          assignments[slot] = team.teamCode
          if (backtrack(slotIndex + 1)) return true
          usedTeams.delete(team.teamCode)
          delete assignments[slot]
        }
      }
      return false
    }

    function greedyFallback() {
      usedTeams.clear()
      for (const key in assignments) delete assignments[key]
      
      for (const slot of slots) {
        const optionGroups = slot.replace('3', '').split('/')
        for (const team of qualifiedThirds) {
          if (!usedTeams.has(team.teamCode) && optionGroups.includes(team.group)) {
            usedTeams.add(team.teamCode)
            assignments[slot] = team.teamCode
            break
          }
        }
      }
    }

    if (qualifiedThirds.length === 8) {
      if (!backtrack(0)) {
        greedyFallback()
      }
    } else {
      greedyFallback()
    }

    return assignments
  }

  // Check if all group stage matches are completed
  const allGroupMatchesPlayed = computed(() => {
    return matches.value.every(m => m.homeScore !== null && m.awayScore !== null)
  })

  // Check if a specific group is complete
  function isGroupComplete(group: string): boolean {
    return matches.value
      .filter(m => m.group === group)
      .every(m => m.homeScore !== null && m.awayScore !== null)
  }

  return {
    matches,
    updateScore,
    resetAllScores,
    getMatchesByGroup,
    calculateStandings,
    allStandings,
    thirdPlaceTeams,
    getGroupPosition,
    allocateThirdPlaces,
    allGroupMatchesPlayed,
    isGroupComplete,
  }
})
