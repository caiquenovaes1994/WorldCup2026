<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { groupNames, getTeamsByGroup } from '../data/teams'
import { useMatchStore } from '../stores/matchStore'
import { useKnockoutStore } from '../stores/knockoutStore'
import MatchCard from '../components/MatchCard.vue'
import KnockoutMatch from '../components/KnockoutMatch.vue'

const matchStore = useMatchStore()
const knockoutStore = useKnockoutStore()

const allMatches = computed(() => {
  const groups = matchStore.matches
  const knockouts = knockoutStore.knockoutMatches
  
  const combined = [
    ...groups.map(m => ({ match: m, type: 'group', dateObj: new Date(`${m.date}T${m.time}:00-03:00`) })),
    ...knockouts.map(m => ({ match: m, type: 'knockout', dateObj: new Date(`${m.date}T${m.time}:00-03:00`) }))
  ]
  return combined.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
})

const last4Matches = computed(() => {
  const now = new Date()
  const pastMatches = allMatches.value.filter(m => m.dateObj <= now)
  return pastMatches.slice(-4).reverse()
})

const next4Matches = computed(() => {
  const now = new Date()
  const futureMatches = allMatches.value.filter(m => m.dateObj > now)
  return futureMatches.slice(0, 4)
})

const hostFlags = [
  { code: 'us', name: 'EUA' },
  { code: 'mx', name: 'México' },
  { code: 'ca', name: 'Canadá' },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-flags">
        <div v-for="flag in hostFlags" :key="flag.code" class="hero-flag" :title="flag.name">
          <img :src="`/flags/${flag.code}.svg`" :alt="flag.name" />
        </div>
      </div>
      <h1 class="hero-title">Copa do Mundo <img src="/FIFA_Logo_White_Generic.webp" class="inline-fifa-logo" alt="FIFA" /> 2026™</h1>
      <p class="hero-subtitle">Estados Unidos · México · Canadá — 11 de junho a 19 de julho</p>
    </section>

    <!-- Content -->
    <div class="page-container">
      <h2 class="section-title" style="justify-content: center; text-align: center; margin-bottom: 1rem;">
        <span class="emoji">⏪</span> Últimos 4 Jogos
      </h2>
      <div class="matches-row" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding-bottom: 1rem; justify-content: center; overflow-x: auto;">
        <template v-for="item in last4Matches" :key="item.type + item.match.id">
          <MatchCard v-if="item.type === 'group'" :match="(item.match as any)" style="min-width: 200px; width: 100%;" />
          <KnockoutMatch v-else :match="(item.match as any)" style="min-width: 200px; width: 100%;" />
        </template>
        <div v-if="last4Matches.length === 0" style="color: var(--text-secondary);">Nenhum jogo ocorreu ainda.</div>
      </div>

      <h2 class="section-title" style="justify-content: center; text-align: center; margin-top: 2rem; margin-bottom: 1rem;">
        <span class="emoji">⏩</span> Próximos 4 Jogos
      </h2>
      <div class="matches-row" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding-bottom: 1rem; justify-content: center; overflow-x: auto;">
        <template v-for="item in next4Matches" :key="item.type + item.match.id">
          <MatchCard v-if="item.type === 'group'" :match="(item.match as any)" style="min-width: 200px; width: 100%;" />
          <KnockoutMatch v-else :match="(item.match as any)" style="min-width: 200px; width: 100%;" />
        </template>
        <div v-if="next4Matches.length === 0" style="color: var(--text-secondary);">Não há próximos jogos previstos.</div>
      </div>

      <div class="info-banner" style="margin-top: 2rem;">
        <span class="icon">⚽</span>
        <div class="text">
          <strong>48 seleções</strong> divididas em <strong>12 grupos</strong>. Os 2 primeiros de cada grupo + os 8 melhores 3º colocados avançam para o
          <strong>Round of 32</strong>.
        </div>
      </div>

      <h2 class="section-title" style="justify-content: center; text-align: center;">
        <span class="emoji">🏟️</span>
        Grupos
      </h2>

      <div class="overview-grid">
        <RouterLink
          v-for="group in groupNames"
          :key="group"
          :to="{ name: 'groups', query: { group } }"
          class="overview-card"
        >
          <div class="group-label">Grupo {{ group }}</div>
          <div class="teams-list">
            <div v-for="team in getTeamsByGroup(group)" :key="team.code" class="team-row">
              <img :src="`/flags/${team.flagCode}.svg`" :alt="team.name" />
              <span>{{ team.name }}</span>
            </div>
          </div>
        </RouterLink>
      </div>

      <h2 class="section-title" style="margin-top: 2rem; justify-content: center; text-align: center;">
        <span class="emoji">🔍</span>
        Explorar
      </h2>

      <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <RouterLink :to="{ name: 'venues' }" class="overview-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; width: 250px;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🏟️</div>
          <div class="group-label">Estádios</div>
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Conheça os 16 palcos</div>
        </RouterLink>
        
        <RouterLink :to="{ name: 'referees' }" class="overview-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; width: 250px;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🏁</div>
          <div class="group-label">Árbitros</div>
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Quadro oficial</div>
        </RouterLink>
        
        <RouterLink :to="{ name: 'squads' }" class="overview-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; width: 250px;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
          <div class="group-label">Convocados</div>
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Elencos das seleções</div>
        </RouterLink>
        
        <RouterLink :to="{ name: 'tournament-info' }" class="overview-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; width: 250px;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
          <div class="group-label">Sobre o Torneio</div>
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Mascotes e Bola Oficial</div>
        </RouterLink>

        <RouterLink :to="{ name: 'statistics' }" class="overview-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; width: 250px;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
          <div class="group-label">Estatísticas</div>
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Treinadores, clubes e mais</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
