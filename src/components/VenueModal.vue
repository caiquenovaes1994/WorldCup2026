<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMatchStore } from '../stores/matchStore'
import { useKnockoutStore } from '../stores/knockoutStore'
import { roundNames } from '../data/knockoutRules'
import TeamBadge from './TeamBadge.vue'
import MatchSummaryModal from './MatchSummaryModal.vue'
import type { Venue, GroupMatch, KnockoutMatch } from '../types'

const isOpen = ref(false)
const venue = ref<Venue | null>(null)
const selectedMatchForSummary = ref<GroupMatch | KnockoutMatch | null>(null)

const matchStore = useMatchStore()
const knockoutStore = useKnockoutStore()

const venueMatches = computed(() => {
  if (!venue.value) return []
  
  const groups = matchStore.matches
    .filter(m => m.venueId === venue.value?.id)
    .map(m => ({
      id: `G-${m.id}`,
      date: m.date,
      time: m.time,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      homePen: undefined as number | null | undefined,
      awayPen: undefined as number | null | undefined,
      stage: `Grupo ${m.group}`
    }))
  
  const knockouts = knockoutStore.knockoutMatches
    .filter(m => m.venueId === venue.value?.id)
    .map(m => ({
      id: `K-${m.id}`,
      date: m.date,
      time: m.time,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      homePen: m.homePenalties,
      awayPen: m.awayPenalties,
      stage: roundNames[m.round] || m.round
    }))
  
  return [...groups, ...knockouts].sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
})

const openMatchSummary = (mappedMatch: any) => {
  if (mappedMatch.homeScore === null || mappedMatch.awayScore === null) return;
  if (mappedMatch.id.startsWith('G-')) {
    const realId = parseInt(mappedMatch.id.replace('G-', ''))
    selectedMatchForSummary.value = matchStore.matches.find(m => m.id === realId) || null
  } else if (mappedMatch.id.startsWith('K-')) {
    const realId = mappedMatch.id.replace('K-', '')
    selectedMatchForSummary.value = knockoutStore.knockoutMatches.find(m => m.id === realId) || null
  }
}

const open = (vData: Venue) => {
  venue.value = vData
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
  setTimeout(() => {
    venue.value = null
  }, 300)
}

defineExpose({ open, close })
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 v-if="venue">{{ venue.name }}</h2>
        <button class="close-button" @click="close">&times;</button>
      </div>
      
      <div class="modal-body" v-if="venue">
        <div class="info-row">
          <strong>Localização:</strong> {{ venue.city }}, {{ venue.state }} - {{ venue.country }}
        </div>
        <div class="info-row">
          <strong>Capacidade:</strong> {{ venue.capacity.toLocaleString('pt-BR') }} espectadores
        </div>
        
        <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Jogos ({{ venueMatches.length }})</h3>
        <div v-if="venueMatches.length === 0" class="no-matches">
          Nenhum jogo no local.
        </div>
        <div v-else class="matches-list">
          <div 
            v-for="match in venueMatches" 
            :key="match.id" 
            class="match-item"
            :class="{ 'clickable': match.homeScore !== null && match.awayScore !== null }"
            @click="openMatchSummary(match)"
          >
            <div class="match-datetime">{{ match.date.split('-').reverse().join('/') }} às {{ match.time }}</div>
            <div class="match-stage">{{ match.stage }}</div>
            <div class="match-teams">
              <TeamBadge :code="match.homeTeam || ''" size="sm" :showName="true" />
              <div v-if="match.homeScore !== null && match.awayScore !== null" class="vs score-display">
                <span v-if="match.homePen !== undefined && match.homePen !== null" class="penalties">({{ match.homePen }})</span>
                {{ match.homeScore }} x {{ match.awayScore }}
                <span v-if="match.awayPen !== undefined && match.awayPen !== null" class="penalties">({{ match.awayPen }})</span>
              </div>
              <span v-else class="vs">vs</span>
              <TeamBadge :code="match.awayTeam || ''" size="sm" :showName="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MatchSummaryModal 
      v-if="selectedMatchForSummary" 
      :match="selectedMatchForSummary" 
      @close="selectedMatchForSummary = null" 
      style="z-index: 1050;"
    />
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}
.modal-content {
  background: var(--bg-surface, #1e1e1e);
  border: 1px solid var(--border-color, #333);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color, #333);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--primary, #3b82f6);
}
.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--text-muted, #6b7280);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s;
}
.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.info-row {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
.no-matches {
  color: var(--text-muted, #6b7280);
  font-style: italic;
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
}
.matches-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.match-item {
  border: 1px solid var(--border-color, #333);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.match-item.clickable {
  cursor: pointer;
}
.match-item.clickable:hover {
  transform: translateY(-2px);
  border-color: var(--primary, #3b82f6);
}
.match-datetime {
  font-size: 0.85rem;
  color: var(--text-muted, #6b7280);
  margin-bottom: 0.25rem;
}
.match-stage {
  font-size: 0.95rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.75rem;
}
.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.vs {
  font-size: 0.85rem;
  color: var(--text-muted, #6b7280);
  font-weight: bold;
}
.score-display {
  font-size: 1rem;
  color: var(--text-primary, #fff);
  white-space: nowrap;
}
.penalties {
  font-size: 0.75rem;
  color: var(--text-muted, #6b7280);
  margin: 0 0.25rem;
}
</style>
