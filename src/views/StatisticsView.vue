<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import coachesData from '../data/coaches.json'
import squadsData from '../data/squads.json'
import appearancesData from '../data/appearances.json'
import { teams } from '../data/teams'
import TeamBadge from '../components/TeamBadge.vue'
import { topScorers, topAssists, cards } from '../data/stats2026'
import PlayerStatsModal from '../components/PlayerStatsModal.vue'
import baseHistoricalScorers from '../data/historical_scorers.json'

const router = useRouter()
const activeTab = ref<'general' | '2026'>('general')
const activeCardTab = ref<'yellow' | 'red'>('yellow')

const sortedScorers = computed(() => [...topScorers].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)))
const sortedAssists = computed(() => [...topAssists].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)))
const sortedYellowCards = computed(() => cards.filter(c => c.yellow > 0).sort((a, b) => b.yellow - a.yellow || a.name.localeCompare(b.name)))
const sortedRedCards = computed(() => cards.filter(c => c.red > 0).sort((a, b) => b.red - a.red || a.name.localeCompare(b.name)))

const ITEMS_PER_PAGE = 10

const pageScorers = ref(1)
const paginatedScorers = computed(() => sortedScorers.value.slice((pageScorers.value - 1) * ITEMS_PER_PAGE, pageScorers.value * ITEMS_PER_PAGE))
const totalPagesScorers = computed(() => Math.ceil(sortedScorers.value.length / ITEMS_PER_PAGE))

const pageAssists = ref(1)
const paginatedAssists = computed(() => sortedAssists.value.slice((pageAssists.value - 1) * ITEMS_PER_PAGE, pageAssists.value * ITEMS_PER_PAGE))
const totalPagesAssists = computed(() => Math.ceil(sortedAssists.value.length / ITEMS_PER_PAGE))

const pageYellow = ref(1)
const paginatedYellow = computed(() => sortedYellowCards.value.slice((pageYellow.value - 1) * ITEMS_PER_PAGE, pageYellow.value * ITEMS_PER_PAGE))
const totalPagesYellow = computed(() => Math.ceil(sortedYellowCards.value.length / ITEMS_PER_PAGE))

const pageRed = ref(1)
const paginatedRed = computed(() => sortedRedCards.value.slice((pageRed.value - 1) * ITEMS_PER_PAGE, pageRed.value * ITEMS_PER_PAGE))
const totalPagesRed = computed(() => Math.ceil(sortedRedCards.value.length / ITEMS_PER_PAGE))

const selectedPlayerForModal = ref<{ name: string, teamCode: string, type: 'goal' | 'assist' | 'yellow' | 'red' } | null>(null)
const openPlayerModal = (name: string, teamCode: string, type: 'goal' | 'assist' | 'yellow' | 'red') => {
  selectedPlayerForModal.value = { name, teamCode, type }
}

const goToTeam = (teamCode: string) => {
  if (teamCode) {
    router.push({ name: 'squads', query: { team: teamCode } })
  }
}

// 1. Coaches by Nationality
const coachesByNationality = computed(() => {
  const counts: Record<string, { name: string; count: number; flagCode: string; items: { coachName: string, teamName: string, teamFlagCode: string, teamCode: string }[] }> = {}
  
  for (const team in coachesData) {
    const coach = (coachesData as Record<string, any>)[team]
    const nationality = coach.nationality
    if (!counts[nationality]) {
      counts[nationality] = { name: nationality, count: 0, flagCode: coach.flagCode, items: [] }
    }
    counts[nationality].count++
    
    const teamObj = teams.find(t => t.name === team)
    counts[nationality].items.push({ 
      coachName: coach.name, 
      teamName: team, 
      teamFlagCode: teamObj ? teamObj.flagCode : '',
      teamCode: teamObj ? teamObj.code : ''
    })
  }
  
  return Object.values(counts).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})

// 2. Players by Club Country
const extraCountryFlags: Record<string, string> = {
  'Itália': 'it',
  'Grécia': 'gr',
  'Emirados Árabes Unidos': 'ae',
  'Emirados ?rabes Unidos': 'ae',
  'Romênia': 'ro',
  'Polônia': 'pl',
  'Sérvia': 'rs',
  'SǸrvia': 'rs',
  'China': 'cn',
  'Rússia': 'ru',
  'Chipre': 'cy',
  'Ucrânia': 'ua',
  'Dinamarca': 'dk',
  'País de Gales': 'gb-wls',
  'Israel': 'il',
  'Hungria': 'hu',
  'Malásia': 'my',
  'Armênia': 'am',
  'Bulgária': 'bg',
  'Chile': 'cl',
  'Costa Rica': 'cr',
  'Eslováquia': 'sk',
  'Eslovênia': 'si',
  'Irlanda': 'ie',
  'Venezuela': 've',
  'Azerbaijão': 'az',
  'Bósnia e Herzegovina': 'ba',
  'Cazaquistão': 'kz',
  'Finlândia': 'fi',
  'Honduras': 'hn',
  'Indonésia': 'id',
  'Tailândia': 'th',
  'Japǜo': 'jp',
  'Frana': 'fr',
  'Esccia': 'gb-sct',
  'ustria': 'at'
}

const getCountryFlag = (countryName: string) => {
  const teamObj = teams.find(t => t.name === countryName || t.nameEn === countryName)
  if (teamObj) return teamObj.flagCode
  return extraCountryFlags[countryName] || ''
}

const selectedPlayerTeamFilter = ref<string>('')
const sortedTeamsFilter = computed(() => [...teams].sort((a, b) => a.name.localeCompare(b.name)))
const isFilterOpen = ref(false)
const selectedTeamObj = computed(() => teams.find(t => t.name === selectedPlayerTeamFilter.value) || null)

const closeFilter = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.custom-filter-container')) {
    isFilterOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeFilter)
})

onUnmounted(() => {
  document.removeEventListener('click', closeFilter)
})

const playersByClubCountry = computed(() => {
  const counts: Record<string, { count: number; items: { playerName: string; clubName: string; teamName: string; teamFlagCode: string }[] }> = {}
  
  for (const team in squadsData) {
    const squad = (squadsData as Record<string, any>)[team]
    
    // Normalize team names that might have typos or variations in JSON keys
    let normalizedTeam = team
    if (team.includes('Congo')) normalizedTeam = 'RD Congo'
    else if (team.includes('Cor') && team.includes('Sul')) normalizedTeam = 'Coreia do Sul'
    
    if (selectedPlayerTeamFilter.value && normalizedTeam !== selectedPlayerTeamFilter.value) {
      continue
    }
    
    const teamObj = teams.find(t => t.name === normalizedTeam)
    const teamFlagCode = teamObj ? teamObj.flagCode : ''
    
    if (squad && squad.players) {
      squad.players.forEach((player: any) => {
        if (player.club) {
          const matchParen = player.club.match(/\((.*?)\)$/)
          let country = 'Desconhecido'
          if (matchParen && matchParen[1]) {
            country = matchParen[1].trim()
          } else if (player.club.includes(' - ')) {
            const parts = player.club.split(' - ')
            country = parts[parts.length - 1].trim()
          } else {
            const parts = player.club.split(',')
            if (parts.length > 1) {
              country = parts[parts.length - 1].trim()
            }
          }
          if (!counts[country]) counts[country] = { count: 0, items: [] }
          counts[country].count++
          counts[country].items.push({ playerName: player.name, clubName: player.club, teamName: normalizedTeam, teamFlagCode })
        }
      })
    }
  }
  
  return Object.entries(counts)
    .map(([country, data]) => ({ country, count: data.count, items: data.items, flagCode: getCountryFlag(country) }))
    .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country))
})

// 3. World Cup Appearances
const performances: Record<number, { first: string; second: string; third: string }> = {
  1930: { first: 'URU', second: 'ARG', third: 'USA' },
  1934: { first: 'ITA', second: 'CZE', third: 'GER' },
  1938: { first: 'ITA', second: 'HUN', third: 'BRA' },
  1950: { first: 'URU', second: 'BRA', third: 'SWE' },
  1954: { first: 'GER', second: 'HUN', third: 'AUT' },
  1958: { first: 'BRA', second: 'SWE', third: 'FRA' },
  1962: { first: 'BRA', second: 'CZE', third: 'CHI' },
  1966: { first: 'ENG', second: 'GER', third: 'POR' },
  1970: { first: 'BRA', second: 'ITA', third: 'GER' },
  1974: { first: 'GER', second: 'NED', third: 'POL' },
  1978: { first: 'ARG', second: 'NED', third: 'BRA' },
  1982: { first: 'ITA', second: 'GER', third: 'POL' },
  1986: { first: 'ARG', second: 'GER', third: 'FRA' },
  1990: { first: 'GER', second: 'ARG', third: 'ITA' },
  1994: { first: 'BRA', second: 'ITA', third: 'SWE' },
  1998: { first: 'FRA', second: 'BRA', third: 'CRO' },
  2002: { first: 'BRA', second: 'GER', third: 'TUR' },
  2006: { first: 'ITA', second: 'FRA', third: 'GER' },
  2010: { first: 'ESP', second: 'NED', third: 'GER' },
  2014: { first: 'GER', second: 'ARG', third: 'NED' },
  2018: { first: 'FRA', second: 'CRO', third: 'BEL' },
  2022: { first: 'ARG', second: 'FRA', third: 'CRO' }
}

const getMedal = (year: number, teamCode: string) => {
  const perf = performances[year]
  if (!perf) return null
  if (perf.first === teamCode) return 'gold'
  if (perf.second === teamCode) return 'silver'
  if (perf.third === teamCode) return 'bronze'
  return null
}

const appearances = computed(() => {
  return teams.map(team => {
    const yearsData = (appearancesData as Record<string, number[]>)[team.code] || []
    const yearsWithMedals = yearsData.map(year => ({
      year,
      medal: getMedal(year, team.code)
    })).sort((a, b) => b.year - a.year)

    return {
      team,
      count: yearsData.length,
      years: yearsWithMedals
    }
  }).sort((a, b) => b.count - a.count || a.team.name.localeCompare(b.team.name))
})

// State for expand/collapse
const expandedCoaches = ref<Record<string, boolean>>({})
const toggleCoach = (name: string) => {
  expandedCoaches.value[name] = !expandedCoaches.value[name]
}

const expandedPlayers = ref<Record<string, boolean>>({})
const togglePlayer = (country: string) => {
  expandedPlayers.value[country] = !expandedPlayers.value[country]
}

const expandedAppearances = ref<Record<string, boolean>>({})
const toggleAppearance = (code: string) => {
  expandedAppearances.value[code] = !expandedAppearances.value[code]
}

const dynamicAllTimeTopScorers = computed(() => {
  const merged = new Map<string, { name: string, flagCode: string, baseGoals: number, currentGoals: number }>()
  
  baseHistoricalScorers.forEach(p => {
    merged.set(p.name, {
      name: p.name,
      flagCode: p.flagCode,
      baseGoals: p.goals,
      currentGoals: 0
    })
  })

  topScorers.forEach(p => {
    const existing = merged.get(p.name)
    if (existing) {
      existing.currentGoals += p.count
    } else {
      const teamObj = teams.find(t => t.code === p.teamCode)
      merged.set(p.name, {
        name: p.name,
        flagCode: teamObj ? teamObj.flagCode : '',
        baseGoals: 0,
        currentGoals: p.count
      })
    }
  })

  return Array.from(merged.values())
    .map(p => ({
      ...p,
      totalGoals: p.baseGoals + p.currentGoals
    }))
    .filter(p => p.totalGoals >= 10)
    .sort((a, b) => b.totalGoals - a.totalGoals || a.name.localeCompare(b.name))
    .slice(0, 10)
})
</script>

<template>
  <div class="page-container">
    <div class="stats-header-with-action">
      <h1 class="section-title" style="margin-bottom: 0;">
        <span class="emoji">📊</span>
        Estatísticas
      </h1>
      <a v-if="activeTab === 'general'" href="https://inside.fifa.com/fifa-world-ranking/men?dateId=LiveRanking" target="_blank" rel="noopener noreferrer" class="action-btn fifa-btn" title="Ranking FIFA">
        <span class="fifa-font" style="font-size: 1.2rem;">RANKING</span>
        <img src="/FIFA_Logo_White_Generic.webp" alt="FIFA" class="fifa-btn-logo" />
      </a>
    </div>

    <div class="tabs-container" style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
      <button :class="['tab-btn', { active: activeTab === 'general' }]" @click="activeTab = 'general'">Estatísticas Gerais</button>
      <button :class="['tab-btn', { active: activeTab === '2026' }]" @click="activeTab = '2026'">Estatísticas 2026</button>
    </div>

    <div v-if="activeTab === 'general'">
      <div class="stats-top-row">
      <!-- Coaches -->
      <section class="stats-section">
        <h2 class="section-title">
          <span class="emoji">👔</span> Treinadores por Nacionalidade
        </h2>
        <div class="stats-card">
          <div class="stats-list">
            <div v-for="item in coachesByNationality" :key="item.name" class="stats-item">
              <div class="stats-row clickable" @click="toggleCoach(item.name)">
                <div class="stats-info">
                  <img v-if="item.flagCode" :src="`/flags/${item.flagCode}.svg`" :alt="item.name" class="mini-flag" @error="e => (e.target as HTMLImageElement).style.display = 'none'" />
                  <span class="stats-name">{{ item.name }}</span>
                </div>
                <div class="stats-right">
                  <div class="stats-value">{{ item.count }}</div>
                  <span class="expand-icon">{{ expandedCoaches[item.name] ? '▼' : '▶' }}</span>
                </div>
              </div>
              <div v-if="expandedCoaches[item.name]" class="stats-details">
                <div v-for="(coach, idx) in item.items" :key="idx" class="detail-row flex-row clickable" @click="goToTeam(coach.teamCode)">
                  <img v-if="coach.teamFlagCode" :src="`/flags/${coach.teamFlagCode}.svg`" :alt="coach.teamName" class="micro-flag" />
                  <div class="detail-col">
                    <span class="detail-primary">{{ coach.coachName }}</span>
                    <span class="detail-secondary">{{ coach.teamName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Appearances -->
      <section class="stats-section">
        <h2 class="section-title">
          <span class="emoji">🏆</span> Participações em Copas (inc. 2026)
        </h2>
        <div class="stats-card">
          <div class="stats-list">
            <div v-for="item in appearances" :key="item.team.code" class="stats-item">
              <div class="stats-row clickable" @click="toggleAppearance(item.team.code)">
                <div class="stats-info">
                  <img :src="`/flags/${item.team.flagCode}.svg`" :alt="item.team.name" class="mini-flag" />
                  <span class="stats-name">{{ item.team.name }}</span>
                </div>
                <div class="stats-right">
                  <div class="stats-value">{{ item.count }}</div>
                  <span class="expand-icon">{{ expandedAppearances[item.team.code] ? '▼' : '▶' }}</span>
                </div>
              </div>
              <div v-if="expandedAppearances[item.team.code]" class="stats-details">
                <div class="detail-row editions-list">
                  <span v-for="y in item.years" :key="y.year" class="year-badge" :class="y.medal ? 'medal-' + y.medal : ''">
                    {{ y.year }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Players by country -->
    <div class="stats-bottom-row">
      <section class="stats-section">
        <div class="section-header-with-filter">
          <h2 class="section-title">
            <span class="emoji">🌍</span> Jogadores por País (Clubes)
          </h2>
          <div class="filter-wrapper custom-filter-container">
            <div class="stats-filter custom-select" @click="isFilterOpen = !isFilterOpen">
              <div class="selected-display">
                <img v-if="selectedTeamObj" :src="`/flags/${selectedTeamObj.flagCode}.svg`" class="micro-flag" />
                <span class="emoji" v-else>🌍</span>
                <span>{{ selectedPlayerTeamFilter || 'Todas as Seleções' }}</span>
                <span class="dropdown-arrow">▼</span>
              </div>
            </div>
            <div v-show="isFilterOpen" class="custom-options">
              <div class="custom-option" @click="selectedPlayerTeamFilter = ''; isFilterOpen = false">
                <span class="emoji">🌍</span>
                <span>Todas as Seleções</span>
              </div>
              <div v-for="team in sortedTeamsFilter" :key="team.code" class="custom-option" @click="selectedPlayerTeamFilter = team.name; isFilterOpen = false">
                <img :src="`/flags/${team.flagCode}.svg`" class="micro-flag" />
                <span>{{ team.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="stats-card">
          <div class="stats-list">
            <div v-for="item in playersByClubCountry" :key="item.country" class="stats-item">
              <div class="stats-row clickable" @click="togglePlayer(item.country)">
                <div class="stats-info">
                  <img v-if="item.flagCode" :src="`/flags/${item.flagCode}.svg`" :alt="item.country" class="mini-flag" @error="e => (e.target as HTMLImageElement).style.display = 'none'" />
                  <span class="stats-name">{{ item.country }}</span>
                </div>
                <div class="stats-right">
                  <div class="stats-value">{{ item.count }}</div>
                  <span class="expand-icon">{{ expandedPlayers[item.country] ? '▼' : '▶' }}</span>
                </div>
              </div>
              <div v-if="expandedPlayers[item.country]" class="stats-details player-details">
                <div v-for="(player, idx) in item.items" :key="idx" class="detail-row flex-row">
                  <img v-if="player.teamFlagCode" :src="`/flags/${player.teamFlagCode}.svg`" :alt="player.teamName" class="micro-flag" />
                  <div class="detail-col">
                    <span class="detail-primary">{{ player.playerName }}</span>
                    <span class="detail-secondary">{{ player.clubName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Maiores Artilheiros da História -->
      <section class="stats-section">
        <h2 class="section-title">
          <span class="emoji"><img src="/ball.png" style="width: 1em; height: 1em; vertical-align: middle;" alt="⚽" /></span> Maiores Artilheiros (História)
        </h2>
        <div class="stats-card">
          <div class="stats-list">
            <div v-for="(player, idx) in dynamicAllTimeTopScorers" :key="idx" class="stats-item">
              <div class="stats-row">
                <div class="stats-info">
                  <span style="font-weight: bold; width: 20px; color: var(--text-secondary);">{{ idx + 1 }}º</span>
                  <span class="stats-name">{{ player.name }}</span>
                  <img :src="`/flags/${player.flagCode}.svg`" :alt="player.flagCode" class="micro-flag" style="margin-left: -4px;" />
                </div>
                <div class="stats-right">
                  <div class="stats-value all-time-value">
                    <span>{{ player.totalGoals }}</span>
                    <span v-if="player.currentGoals > 0" class="current-cup-goals" title="Gols em 2026">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                      {{ player.currentGoals }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div> <!-- end v-if general -->

    <div v-if="activeTab === '2026'">
      <div class="stats-row-3">
        <!-- Artilheiros -->
        <section class="stats-section">
          <h2 class="section-title">
            <span class="emoji"><img src="/ball.png" style="width: 1em; height: 1em; vertical-align: middle;" alt="⚽" /></span> Artilheiros
          </h2>
          <div class="stats-card paginated-card">
            <div v-if="topScorers.length === 0" style="text-align: center; color: var(--text-secondary); padding: 2rem 0;">Ainda não há gols na competição.</div>
            <div class="stats-list" v-else>
              <div v-for="(player, idx) in paginatedScorers" :key="idx" class="stats-item clickable" @click="openPlayerModal(player.name, player.teamCode, 'goal')">
                <div class="stats-row">
                  <div class="stats-info">
                    <span style="font-weight: bold; width: 20px; color: var(--text-secondary);">{{ (pageScorers - 1) * ITEMS_PER_PAGE + idx + 1 }}º</span>
                    <span class="stats-name">{{ player.name }}</span>
                    <TeamBadge :code="player.teamCode" size="sm" :showName="false" style="transform: scale(0.7); margin-left: -8px;" />
                  </div>
                  <div class="stats-right">
                    <div class="stats-value">{{ player.count }}</div>
                  </div>
                </div>
              </div>
              <div v-if="totalPagesScorers > 1" class="pagination-controls">
                <button :disabled="pageScorers === 1" @click="pageScorers--">Anterior</button>
                <span>{{ pageScorers }} de {{ totalPagesScorers }}</span>
                <button :disabled="pageScorers === totalPagesScorers" @click="pageScorers++">Próximo</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Assistências -->
        <section class="stats-section">
          <h2 class="section-title">
            <span class="emoji">👟</span> Assistências
          </h2>
          <div class="stats-card paginated-card">
            <div v-if="topAssists.length === 0" style="text-align: center; color: var(--text-secondary); padding: 2rem 0;">Ainda não há assistências na competição.</div>
            <div class="stats-list" v-else>
              <div v-for="(player, idx) in paginatedAssists" :key="idx" class="stats-item clickable" @click="openPlayerModal(player.name, player.teamCode, 'assist')">
                <div class="stats-row">
                  <div class="stats-info">
                    <span style="font-weight: bold; width: 20px; color: var(--text-secondary);">{{ (pageAssists - 1) * ITEMS_PER_PAGE + idx + 1 }}º</span>
                    <span class="stats-name">{{ player.name }}</span>
                    <TeamBadge :code="player.teamCode" size="sm" :showName="false" style="transform: scale(0.7); margin-left: -8px;" />
                  </div>
                  <div class="stats-right">
                    <div class="stats-value" style="color: #4ade80;">{{ player.count }}</div>
                  </div>
                </div>
              </div>
              <div v-if="totalPagesAssists > 1" class="pagination-controls">
                <button :disabled="pageAssists === 1" @click="pageAssists--">Anterior</button>
                <span>{{ pageAssists }} de {{ totalPagesAssists }}</span>
                <button :disabled="pageAssists === totalPagesAssists" @click="pageAssists++">Próximo</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Cartões -->
        <section class="stats-section">
          <h2 class="section-title">
            <span style="display: flex; gap: -4px; align-items: center; margin-right: 4px;">
              <span class="card-icon yellow" style="transform: rotate(-10deg);"></span>
              <span class="card-icon red" style="transform: rotate(10deg); margin-left: -8px; z-index: 1;"></span>
            </span>
            Cartões
          </h2>
          <div class="tabs-container" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <button :class="['tab-btn', { active: activeCardTab === 'yellow' }]" @click="activeCardTab = 'yellow'" style="font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="card-icon yellow"></span> Amarelos
            </button>
            <button :class="['tab-btn', { active: activeCardTab === 'red' }]" @click="activeCardTab = 'red'" style="font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="card-icon red"></span> Vermelhos
            </button>
          </div>
          <div class="stats-card paginated-card">
            <!-- Amarelos -->
            <div v-if="activeCardTab === 'yellow'">
              <div v-if="sortedYellowCards.length === 0" style="text-align: center; color: var(--text-secondary); padding: 2rem 0;">Ainda não há cartões amarelos.</div>
              <div class="stats-list" v-else>
                <div v-for="(player, idx) in paginatedYellow" :key="idx" class="stats-item clickable" @click="openPlayerModal(player.name, player.teamCode, 'yellow')">
                  <div class="stats-row">
                    <div class="stats-info">
                      <span style="font-weight: bold; width: 20px; color: var(--text-secondary);">{{ (pageYellow - 1) * ITEMS_PER_PAGE + idx + 1 }}º</span>
                      <span class="stats-name">{{ player.name }}</span>
                      <TeamBadge :code="player.teamCode" size="sm" :showName="false" style="transform: scale(0.7); margin-left: -8px;" />
                    </div>
                    <div class="stats-right" style="gap: 0.5rem;">
                      <div class="stats-value" style="background: rgba(250, 204, 21, 0.2); color: #facc15;">{{ player.yellow }}</div>
                    </div>
                  </div>
                </div>
                <div v-if="totalPagesYellow > 1" class="pagination-controls">
                  <button :disabled="pageYellow === 1" @click="pageYellow--">Anterior</button>
                  <span>{{ pageYellow }} de {{ totalPagesYellow }}</span>
                  <button :disabled="pageYellow === totalPagesYellow" @click="pageYellow++">Próximo</button>
                </div>
              </div>
            </div>
            
            <!-- Vermelhos -->
            <div v-if="activeCardTab === 'red'">
              <div v-if="sortedRedCards.length === 0" style="text-align: center; color: var(--text-secondary); padding: 2rem 0;">Ainda não há cartões vermelhos.</div>
              <div class="stats-list" v-else>
                <div v-for="(player, idx) in paginatedRed" :key="idx" class="stats-item clickable" @click="openPlayerModal(player.name, player.teamCode, 'red')">
                  <div class="stats-row">
                    <div class="stats-info">
                      <span style="font-weight: bold; width: 20px; color: var(--text-secondary);">{{ (pageRed - 1) * ITEMS_PER_PAGE + idx + 1 }}º</span>
                      <span class="stats-name">{{ player.name }}</span>
                      <TeamBadge :code="player.teamCode" size="sm" :showName="false" style="transform: scale(0.7); margin-left: -8px;" />
                    </div>
                    <div class="stats-right" style="gap: 0.5rem;">
                      <div class="stats-value" style="background: rgba(248, 113, 113, 0.2); color: #f87171;">{{ player.red }}</div>
                    </div>
                  </div>
                </div>
                <div v-if="totalPagesRed > 1" class="pagination-controls">
                  <button :disabled="pageRed === 1" @click="pageRed--">Anterior</button>
                  <span>{{ pageRed }} de {{ totalPagesRed }}</span>
                  <button :disabled="pageRed === totalPagesRed" @click="pageRed++">Próximo</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Teleport to="body">
      <PlayerStatsModal v-if="selectedPlayerForModal" :player="selectedPlayerForModal" @close="selectedPlayerForModal = null" />
    </Teleport>
  </div>
</template>

<style scoped>
.tab-btn {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.tab-btn.active {
  background: var(--accent-blue);
  color: white;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.stats-top-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.stats-row-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .stats-row-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-top-row,
  .stats-bottom-row,
  .stats-row-3 {
    grid-template-columns: 1fr;
  }
}

.stats-bottom-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.stats-section {
  display: flex;
  flex-direction: column;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.section-header-with-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header-with-filter .section-title {
  margin-bottom: 0;
}

.custom-filter-container {
  position: relative;
  min-width: 250px;
}

.custom-select {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-primary);
  font-size: 0.95rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
}

.custom-select:hover {
  border-color: var(--accent-blue);
}

.selected-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-arrow {
  margin-left: auto;
  font-size: 0.8em;
  color: var(--text-secondary);
}

.custom-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
}

.custom-option {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.custom-option:hover {
  background: var(--bg-card-hover);
}

.custom-option .micro-flag {
  width: 20px;
  height: 14px;
}

.stats-header-with-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--accent-blue);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.fifa-btn {
  padding: 0.5rem 1.5rem;
}

.fifa-btn-logo {
  height: 28px;
  object-fit: contain;
}

.action-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

@media (max-width: 640px) {
  .section-header-with-filter {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

.stats-card {
  background: var(--surface-light);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  flex-grow: 1;
  max-height: 600px;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.paginated-card {
  max-height: none;
  overflow-y: visible;
}

.stats-card::-webkit-scrollbar {
  width: 8px;
}
.stats-card::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}
.stats-card::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.stats-card::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stats-item {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, background 0.2s;
}

.stats-item:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.08);
}

.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
}

.clickable {
  cursor: pointer;
  user-select: none;
}

.clickable:hover {
  background: rgba(255, 255, 255, 0.05);
}

.stats-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mini-flag {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.stats-name {
  font-weight: 500;
  color: var(--text-primary);
}

.stats-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stats-value {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary-color, #4facfe);
  background: rgba(0, 0, 0, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  min-width: 3rem;
  text-align: center;
}

.expand-icon {
  font-size: 0.8rem;
  color: var(--text-secondary);
  width: 16px;
  text-align: center;
}

.stats-details {
  padding: 0.5rem 1rem 1rem 3rem;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.player-details {
  padding-left: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.detail-row {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.player-details .detail-row {
  flex-direction: row;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.detail-col {
  display: flex;
  flex-direction: column;
}

.micro-flag {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.detail-primary {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.detail-secondary {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.editions-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: transparent;
  padding: 0;
}

.year-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.medal-gold {
  background: linear-gradient(135deg, #FFD700 0%, #FDB931 100%);
  color: #5C4000;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(255, 215, 0, 0.4);
}

.medal-silver {
  background: linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%);
  color: #333333;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(189, 189, 189, 0.4);
}

.medal-bronze {
  background: linear-gradient(135deg, #CD7F32 0%, #A0522D 100%);
  color: #4A2511;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(205, 127, 50, 0.4);
}

.card-icon {
  display: inline-block;
  width: 14px;
  height: 20px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.4);
  vertical-align: middle;
}

.card-icon.yellow {
  background-color: #facc15;
}

.card-icon.red {
  background-color: #ef4444;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 0.5rem 0;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.pagination-controls button {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-controls button:not(:disabled):hover {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
}

.pagination-controls span {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.all-time-value {
  display: flex;
  align-items: center;
  gap: 6px;
}
.current-cup-goals {
  color: #4ade80;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  gap: 2px;
}
</style>
