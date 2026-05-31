<script setup lang="ts">
import { ref, computed } from 'vue'
import { teams } from '../data/teams'
import squadsData from '../data/squads.json'

// Cast squadsData for TypeScript
const squads = squadsData as Record<string, Array<{name: string, position: string, club: string, transfermarktUrl: string}>>

const sortedTeams = computed(() => {
  return [...teams].sort((a, b) => a.name.localeCompare(b.name)).map(team => ({
    ...team,
    hasSquad: !!squads[team.name]
  }))
})

const selectedTeamCode = ref<string | null>(null)

const selectedTeam = computed(() => {
  if (!selectedTeamCode.value) return null
  return sortedTeams.value.find(t => t.code === selectedTeamCode.value)
})

const selectedTeamSquad = computed(() => {
  if (!selectedTeam.value || !selectedTeam.value.hasSquad) return null
  const squad = squads[selectedTeam.value.name]
  
  // Group by position
  const grouped = {
    'Goleiros': squad.filter(p => p.position === 'Goleiros'),
    'Defensores': squad.filter(p => p.position === 'Defensores'),
    'Meio-campistas': squad.filter(p => p.position === 'Meio-campistas'),
    'Atacantes': squad.filter(p => p.position === 'Atacantes')
  }
  return grouped
})

function selectTeam(code: string) {
  selectedTeamCode.value = code
}
</script>

<template>
  <div class="page-container">
    <h1 class="section-title">
      <span class="emoji">👥</span>
      Jogadores Convocados
    </h1>
    
    <div class="info-banner" style="margin-top: 1rem; margin-bottom: 2rem;">
      <span class="icon">📅</span>
      <div class="text">
        <strong>Aviso Oficial:</strong> Estas listas foram divulgadas pelas Confederações das Seleções. Seleções marcadas com <strong>(*)</strong> não possuem lista oficial até o momento. A lista final da FIFA será divulgada em <strong>2 de junho</strong>.
      </div>
    </div>

    <div class="teams-grid">
      <button 
        v-for="team in sortedTeams" 
        :key="team.code" 
        @click="selectTeam(team.code)"
        class="team-card-btn"
        :class="{ active: selectedTeamCode === team.code }"
      >
        <img :src="`/flags/${team.flagCode}.svg`" :alt="team.name" class="team-flag" />
        <span class="team-name">{{ team.name }}{{ team.hasSquad ? '' : '*' }}</span>
      </button>
    </div>

    <!-- Squad Display -->
    <div v-if="selectedTeam" class="squad-display">
      <h2 class="squad-title">Elenco: {{ selectedTeam.name }}</h2>
      
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
              <a :href="player.transfermarktUrl" target="_blank" class="player-name-link">{{ player.name }}</a>
              <span class="player-club" v-if="player.club">({{ player.club }})</span>
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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
  gap: 1rem;
  margin-bottom: 2rem;
}

.team-card-btn {
  background: var(--surface); 
  border: 1px solid var(--border); 
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
  background: var(--surface-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.team-card-btn.active {
  border-color: var(--primary); 
  box-shadow: 0 0 0 2px var(--primary-light); 
  background: var(--surface-hover);
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
