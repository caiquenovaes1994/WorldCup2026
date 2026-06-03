<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { teams } from '../data/teams'
import squadsData from '../data/squads.json'
import coachesData from '../data/coaches.json'

// Cast squadsData for TypeScript
type SquadType = { coach: string; players: Array<{name: string, position: string, club: string, transfermarktUrl?: string, number?: number}> };
const squads = squadsData as unknown as Record<string, SquadType>;

const sortedTeams = computed(() => {
  return [...teams].sort((a, b) => a.name.localeCompare(b.name)).map(team => ({
    ...team,
    hasSquad: !!squads[team.name] && squads[team.name].players.length > 0
  }))
})

const selectedTeamCode = ref<string | null>(null)
const carouselRef = ref<HTMLElement | null>(null)

const selectedTeam = computed(() => {
  if (!selectedTeamCode.value) return null
  return sortedTeams.value.find(t => t.code === selectedTeamCode.value) || null
})

const selectedTeamCoach = computed(() => {
  if (!selectedTeam.value) return null
  const coaches = coachesData as Record<string, string>;
  return coaches[selectedTeam.value.name] || "Desconhecido"
})

const selectedTeamSquad = computed(() => {
  if (!selectedTeam.value || !selectedTeam.value.hasSquad) return null
  const squad = squads[selectedTeam.value.name]?.players || []
  
  const sortPlayers = (a: any, b: any) => {
    if (a.number !== undefined && b.number !== undefined) {
      return a.number - b.number;
    }
    if (a.number !== undefined) return -1;
    if (b.number !== undefined) return 1;
    return a.name.localeCompare(b.name);
  };

  // Group by position and sort
  const grouped = {
    'Goleiros': squad.filter(p => p.position === 'Goleiros').sort(sortPlayers),
    'Defensores': squad.filter(p => p.position === 'Defensores').sort(sortPlayers),
    'Meio-campistas': squad.filter(p => p.position === 'Meio-campistas').sort(sortPlayers),
    'Atacantes': squad.filter(p => p.position === 'Atacantes').sort(sortPlayers)
  }
  return grouped
})

function scrollCarousel(direction: number) {
  if (!carouselRef.value) return
  const scrollAmount = carouselRef.value.clientWidth
  carouselRef.value.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  })
}

function selectTeam(code: string) {
  selectedTeamCode.value = code
  nextTick(() => {
    if (carouselRef.value) {
      const activeBtn = carouselRef.value.querySelector('.active') as HTMLElement
      if (activeBtn) {
        const containerWidth = carouselRef.value.clientWidth
        const btnLeft = activeBtn.offsetLeft
        const btnWidth = activeBtn.clientWidth
        carouselRef.value.scrollTo({
          left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
          behavior: 'smooth'
        })
      }
    }
  })
}
</script>

<template>
  <div class="page-container">
    <h1 class="section-title">
      <span class="emoji">👥</span>
      Jogadores Convocados
    </h1>
    


    <div v-if="!selectedTeamCode" class="teams-grid">
      <button 
        v-for="team in sortedTeams" 
        :key="team.code" 
        @click="selectTeam(team.code)"
        class="team-card-btn"
      >
        <img :src="`/flags/${team.flagCode}.svg`" :alt="team.name" class="team-flag" />
        <span class="team-name">{{ team.name }}</span>
      </button>
    </div>

    <div v-else class="carousel-container">
      <button @click="scrollCarousel(-1)" class="carousel-arrow left">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div class="carousel-items" ref="carouselRef">
        <button 
          v-for="team in sortedTeams" 
          :key="team.code" 
          @click="selectTeam(team.code)"
          class="team-card-btn carousel-mode"
          :class="{ active: selectedTeamCode === team.code }"
        >
          <img :src="`/flags/${team.flagCode}.svg`" :alt="team.name" class="team-flag" />
          <span class="team-name">{{ team.name }}</span>
        </button>
      </div>

      <button @click="scrollCarousel(1)" class="carousel-arrow right">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

    <!-- Squad Display -->
    <div v-if="selectedTeam" class="squad-display">
      <h2 class="squad-title">Elenco: {{ selectedTeam.name }}</h2>

      <div class="coach-banner" style="margin-bottom: 2rem;">
        <span class="coach-label">Técnico:</span>
        <span class="coach-name">{{ selectedTeamCoach }}</span>
      </div>
      
      <div v-if="!selectedTeam.hasSquad" class="info-banner warning">
        <span class="icon">ℹ️</span>
        <div class="text">
          <strong>Lista oficial não divulgada.</strong> As convocações finais desta seleção para a Copa do Mundo de 2026 ainda não foram anunciadas.
        </div>
      </div>
      
      <div v-else class="squad-sections">
        <div v-for="(players, position) in selectedTeamSquad" :key="position" class="squad-position-group">
          <h3 class="position-title">{{ position }}</h3>
          <ul class="player-list">
            <li v-for="player in players" :key="player.name" class="player-item">
              <a :href="player.transfermarktUrl" target="_blank" class="player-name-link">
                <template v-if="player.number">#{{ player.number }} - </template>{{ player.name }}
              </a>
              <span class="player-club" v-if="player.club">{{ player.club }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.teams-grid {
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
}

@media (min-width: 640px) {
  .teams-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .teams-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
}

.carousel-items {
  display: flex;
  gap: 1rem;
  flex: 1;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  padding: 0.5rem 0; /* space for box-shadow */
  position: relative;
}
.carousel-items::-webkit-scrollbar {
  display: none; /* Safari/Chrome */
}

.carousel-arrow {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--accent-blue-light);
  width: 48px;
  height: 48px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.carousel-arrow:hover {
  background: var(--accent-blue);
  color: #fff;
  border-color: var(--accent-blue);
  transform: scale(1.05);
}

.carousel-arrow:active {
  transform: scale(0.95);
}

.team-card-btn {
  background: var(--bg-surface); 
  border: 1px solid var(--border-color); 
  border-radius: var(--radius-md); 
  padding: 1rem; 
  cursor: pointer; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.2s;
}

.team-card-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color-light);
  transform: translateY(-2px);
}

.team-card-btn.active {
  border-color: var(--accent-blue); 
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 2px var(--accent-blue); 
  transform: translateY(-2px);
}

.team-card-btn.active .team-flag {
  box-shadow: var(--shadow-glow-blue);
  transform: scale(1.1);
  transition: all 0.3s ease;
}

.team-card-btn.carousel-mode {
  flex: 0 0 calc(20% - 0.8rem);
  min-width: calc(20% - 0.8rem);
}

.team-flag {
  width: 48px; 
  height: 32px; 
  object-fit: cover; 
  border-radius: 4px; 
  margin-bottom: 0.5rem;
}

.team-name {
  font-weight: 600; 
  text-align: center; 
  color: var(--text-primary);
}

.squad-display {
  background: var(--surface-light);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid var(--border);
}

.squad-title {
  text-align: center;
  font-size: 1.8rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.squad-sections {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.coach-banner {
  background: var(--surface-light);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  grid-column: 1 / -1;
}

.coach-label {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.coach-name {
  font-weight: 700;
  color: var(--accent-blue);
  font-size: 1.1rem;
}

@media (min-width: 768px) {
  .squad-sections {
    grid-template-columns: 1fr 1fr;
  }
}

.squad-position-group {
  background: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border);
}

.position-title {
  font-size: 1.2rem;
  color: var(--text);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--border);
  padding-bottom: 0.5rem;
}

.player-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.player-item {
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
}

.player-name-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.player-name-link:hover {
  text-decoration: underline;
  color: var(--primary-dark);
}

.player-club {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.warning {
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.3);
}
</style>
