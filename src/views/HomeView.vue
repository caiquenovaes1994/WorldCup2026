<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { groupNames, teams } from '../data/teams'
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

const lastRegisteredMatchIndex = computed(() => {
  for (let i = allMatches.value.length - 1; i >= 0; i--) {
    if (allMatches.value[i].match.homeScore !== null) {
      return i;
    }
  }
  return 0;
})

const carouselRef = ref<HTMLElement | null>(null)

onMounted(() => {
  scrollToLastRegistered()
})

const scrollToLastRegistered = () => {
  nextTick(() => {
    if (carouselRef.value) {
      const matchElements = carouselRef.value.children
      const index = lastRegisteredMatchIndex.value
      if (matchElements[index]) {
        const el = matchElements[index] as HTMLElement
        const container = carouselRef.value
        const scrollPos = el.offsetLeft - (container.clientWidth / 2) + (el.clientWidth / 2)
        container.scrollTo({ left: scrollPos, behavior: 'smooth' })
      }
    }
  })
}

const showArrows = ref(false)

const scrollCarousel = (direction: number) => {
  if (carouselRef.value && carouselRef.value.children[0]) {
    const scrollAmount = (carouselRef.value.children[0] as HTMLElement).offsetWidth + 16
    carouselRef.value.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }
}

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
        <span class="emoji">🗓️</span> Calendário de Jogos
      </h2>
      <div 
        class="carousel-wrapper" 
        style="position: relative;" 
        @mouseenter="showArrows = true" 
        @mouseleave="showArrows = false"
      >
        <button 
          v-show="showArrows" 
          @click="scrollCarousel(-1)" 
          style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: background 0.2s;"
        >
          &#10094;
        </button>

        <div 
          ref="carouselRef"
          class="matches-carousel" 
          style="display: flex; gap: 1rem; padding-bottom: 1rem; overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory;"
        >
          <template v-for="(item, index) in allMatches" :key="item.type + item.match.id">
            <div style="scroll-snap-align: center; flex: 0 0 auto; width: 380px; max-width: 90vw;" :class="{ 'active-match': index === lastRegisteredMatchIndex }">
              <MatchCard v-if="item.type === 'group'" :match="(item.match as any)" :is-home="true" style="width: 100%;" />
              <KnockoutMatch v-else :match="(item.match as any)" :is-home="true" style="width: 100%;" />
            </div>
          </template>
          <div v-if="allMatches.length === 0" style="color: var(--text-secondary);">Nenhum jogo encontrado.</div>
        </div>

        <button 
          v-show="showArrows" 
          @click="scrollCarousel(1)" 
          style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: background 0.2s;"
        >
          &#10095;
        </button>
      </div>

      <div class="info-banner" style="margin-top: 2rem;">
        <span class="icon"><img src="/ball.png" style="width: 1em; height: 1em; vertical-align: middle;" alt="⚽" /></span>
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
          <div class="teams-list" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
            <div v-for="teamStanding in matchStore.allStandings[group]" :key="teamStanding.teamCode" class="team-row" style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <img :src="`/flags/${teams.find(t => t.code === teamStanding.teamCode)?.flagCode}.svg`" :alt="teamStanding.teamCode" style="width: 24px; border-radius: 2px;" />
                <span>{{ teams.find(t => t.code === teamStanding.teamCode)?.name }}</span>
              </div>
              <span style="font-weight: 700; color: var(--primary-light);">{{ teamStanding.points }} pts</span>
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
