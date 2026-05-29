<script setup lang="ts">
import { ref, computed } from 'vue'
import { teams } from '../data/teams'

const sortedTeams = computed(() => {
  return [...teams].sort((a, b) => a.name.localeCompare(b.name))
})

const selectedTeam = ref<string | null>(null)

function selectTeam(code: string) {
  selectedTeam.value = code
}
</script>

<template>
  <div class="page-container">
    <h1 class="section-title">
      <span class="emoji">👥</span>
      Jogadores Convocados
    </h1>
    
    <div class="info-banner" style="margin-top: 1rem; margin-bottom: 2rem;" v-if="selectedTeam">
      <span class="icon">ℹ️</span>
      <div class="text">
        <strong>Lista oficial não divulgada.</strong> As convocações finais da seleção selecionada para a Copa do Mundo de 2026 ainda não foram anunciadas.
      </div>
    </div>
    <div class="info-banner" style="margin-top: 1rem; margin-bottom: 2rem; background: transparent; border: 1px dashed var(--border);" v-else>
      <div class="text" style="color: var(--text-secondary); text-align: center; width: 100%;">
        Selecione uma equipe abaixo para ver a convocação.
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
      <button 
        v-for="team in sortedTeams" 
        :key="team.code" 
        @click="selectTeam(team.code)"
        style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 0.2s;"
        :style="selectedTeam === team.code ? 'border-color: var(--primary); box-shadow: 0 0 0 2px var(--primary-light); background: var(--surface-hover);' : ''"
        class="team-card-btn"
      >
        <img :src="`/flags/${team.flagCode}.svg`" :alt="team.name" style="width: 48px; height: 32px; object-fit: cover; border-radius: 4px; margin-bottom: 0.5rem;" />
        <span style="font-weight: 600; text-align: center; color: var(--text-primary);">{{ team.name }}</span>
      </button>
    </div>
    
  </div>
</template>

<style scoped>
.team-card-btn:hover {
  background: var(--surface-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
}
</style>
