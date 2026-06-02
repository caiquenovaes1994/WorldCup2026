import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { knockoutTemplate } from '../data/knockoutRules'
import { useMatchStore } from './matchStore'
import type { KnockoutMatch } from '../types'

export const useKnockoutStore = defineStore('knockout', () => {
  const knockoutMatches = ref<KnockoutMatch[]>(loadKnockout())

  function loadKnockout(): KnockoutMatch[] {
    const saved = localStorage.getItem('wc2026-knockout')
    if (saved) {
      try { return JSON.parse(saved) } catch { /* fallthrough */ }
    }
    return JSON.parse(JSON.stringify(knockoutTemplate))
  }

  function saveKnockout() {
    localStorage.setItem('wc2026-knockout', JSON.stringify(knockoutMatches.value))
  }

  function updateKnockoutScore(
    matchId: string,
    homeScore: number | null,
    awayScore: number | null,
    homePenalties: number | null = null,
    awayPenalties: number | null = null
  ) {
    const match = knockoutMatches.value.find(m => m.id === matchId)
    if (match) {
      match.homeScore = homeScore
      match.awayScore = awayScore
      match.homePenalties = homePenalties
      match.awayPenalties = awayPenalties
      propagateWinner(matchId)
      saveKnockout()
    }
  }

  function getWinner(match: KnockoutMatch): string | null {
    if (match.homeScore === null || match.awayScore === null || !match.homeTeam || !match.awayTeam) return null
    if (match.homeScore > match.awayScore) return match.homeTeam
    if (match.awayScore > match.homeScore) return match.awayTeam
    // Draw -> penalties
    if (match.homePenalties !== null && match.awayPenalties !== null) {
      if (match.homePenalties > match.awayPenalties) return match.homeTeam
      if (match.awayPenalties > match.homePenalties) return match.awayTeam
    }
    return null
  }

  function getLoser(match: KnockoutMatch): string | null {
    if (match.homeScore === null || match.awayScore === null || !match.homeTeam || !match.awayTeam) return null
    if (match.homeScore > match.awayScore) return match.awayTeam
    if (match.awayScore > match.homeScore) return match.homeTeam
    if (match.homePenalties !== null && match.awayPenalties !== null) {
      if (match.homePenalties > match.awayPenalties) return match.awayTeam
      if (match.awayPenalties > match.homePenalties) return match.homeTeam
    }
    return null
  }

  function propagateWinner(matchId: string) {
    const match = knockoutMatches.value.find(m => m.id === matchId)
    if (!match) return

    const winner = getWinner(match)
    const loser = getLoser(match)
    const winnerSource = `W-${matchId}`
    const loserSource = `L-${matchId}`

    // Find the next match that references this match's winner
    knockoutMatches.value.forEach(m => {
      if (m.homeSource === winnerSource) {
        m.homeTeam = winner
      }
      if (m.awaySource === winnerSource) {
        m.awayTeam = winner
      }
      if (m.homeSource === loserSource) {
        m.homeTeam = loser
      }
      if (m.awaySource === loserSource) {
        m.awayTeam = loser
      }
    })
  }

  // Populate R32 teams from group results
  function populateFromGroups() {
    const matchStore = useMatchStore()

    // Find all third place slots in the current bracket
    const thirdPlaceSlots: string[] = []
    knockoutMatches.value.forEach(m => {
      if (m.round === 'R32') {
        if (m.homeSource.startsWith('3')) thirdPlaceSlots.push(m.homeSource)
        if (m.awaySource.startsWith('3')) thirdPlaceSlots.push(m.awaySource)
      }
    })

    const thirdPlaceAssignments = matchStore.allocateThirdPlaces(thirdPlaceSlots)

    knockoutMatches.value.forEach(match => {
      if (match.round !== 'R32') return

      // Home team source
      if (match.homeSource.startsWith('1')) {
        const group = match.homeSource[1]
        match.homeTeam = matchStore.getGroupPosition(group, 1)
      } else if (match.homeSource.startsWith('2')) {
        const group = match.homeSource[1]
        match.homeTeam = matchStore.getGroupPosition(group, 2)
      } else if (match.homeSource.startsWith('3')) {
        match.homeTeam = thirdPlaceAssignments[match.homeSource] || null
      }

      // Away team source
      if (match.awaySource.startsWith('1')) {
        const group = match.awaySource[1]
        match.awayTeam = matchStore.getGroupPosition(group, 1)
      } else if (match.awaySource.startsWith('2')) {
        const group = match.awaySource[1]
        match.awayTeam = matchStore.getGroupPosition(group, 2)
      } else if (match.awaySource.startsWith('3')) {
        match.awayTeam = thirdPlaceAssignments[match.awaySource] || null
      }
    })

    saveKnockout()
  }

  function resetKnockout() {
    knockoutMatches.value = JSON.parse(JSON.stringify(knockoutTemplate))
    localStorage.removeItem('wc2026-knockout')
  }

  function getMatchesByRound(round: string): KnockoutMatch[] {
    return knockoutMatches.value
      .filter(m => m.round === round)
      .sort((a, b) => a.position - b.position)
  }

  // Watch group stage changes and auto-populate knockout
  function setupWatcher() {
    const matchStore = useMatchStore()
    watch(
      () => matchStore.allStandings,
      () => {
        populateFromGroups()
      },
      { deep: true }
    )
  }

  return {
    knockoutMatches,
    updateKnockoutScore,
    populateFromGroups,
    resetKnockout,
    getMatchesByRound,
    setupWatcher,
  }
})
