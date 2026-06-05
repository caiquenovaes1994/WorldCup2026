<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { groupNames, getTeamsByGroup } from '../data/teams'

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer: number | null = null

function updateCountdown() {
  const target = new Date('2026-06-11T19:00:00Z') // 16:00 BRT
  const now = new Date()
  const diff = Math.max(0, target.getTime() - now.getTime())

  countdown.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

onMounted(() => {
  updateCountdown()
  timer = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
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

      <div class="countdown">
        <div class="countdown-item">
          <div class="countdown-value">{{ String(countdown.days).padStart(2, '0') }}</div>
          <div class="countdown-label">Dias</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value">{{ String(countdown.hours).padStart(2, '0') }}</div>
          <div class="countdown-label">Horas</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value">{{ String(countdown.minutes).padStart(2, '0') }}</div>
          <div class="countdown-label">Minutos</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value">{{ String(countdown.seconds).padStart(2, '0') }}</div>
          <div class="countdown-label">Segundos</div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <div class="page-container">
      <div class="info-banner">
        <span class="icon">⚽</span>
        <div class="text">
          <strong>48 seleções</strong> divididas em <strong>12 grupos</strong>. Os 2 primeiros de cada grupo + os 8 melhores 3º colocados avançam para o
          <strong>Round of 32</strong>. Insira os placares e veja a classificação atualizar em tempo real!
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
