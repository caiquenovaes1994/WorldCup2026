<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMatchStore } from '../stores/matchStore'
import { useKnockoutStore } from '../stores/knockoutStore'
import { roundNames } from '../data/knockoutRules'
import { countryToCode } from '../data/referees'
import { matchEvents } from '../data/summaries'
import TeamBadge from './TeamBadge.vue'
import type { Referee } from '../types'

const isOpen = ref(false)
const referee = ref<Referee | null>(null)
const transfermarktUrl = ref('')

const matchStore = useMatchStore()
const knockoutStore = useKnockoutStore()

const refereeMatches = computed(() => {
  if (!referee.value) return []
  
  const getCards = (id: number | string) => {
    const events = matchEvents[id] || []
    return {
      yellow: events.filter(e => e.type === 'yellow').length,
      red: events.filter(e => e.type === 'red').length
    }
  }

  const groups = matchStore.matches
    .filter(m => m.referee === referee.value?.name)
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
      stage: `Grupo ${m.group}`,
      cards: getCards(m.id)
    }))
  
  const knockouts = knockoutStore.knockoutMatches
    .filter(m => m.referee === referee.value?.name)
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
      stage: roundNames[m.round] || m.round,
      cards: getCards(m.id)
    }))
  
  return [...groups, ...knockouts].sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
})

const open = (refData: Referee) => {
  referee.value = refData
  transfermarktUrl.value = `https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${encodeURIComponent(refData.name)}`
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
  setTimeout(() => {
    referee.value = null
  }, 300)
}

defineExpose({ open, close })
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 v-if="referee" style="display: flex; align-items: center; gap: 0.75rem;">
          <img v-if="countryToCode[referee.country]" :src="`/flags/${countryToCode[referee.country]}.svg`" :alt="referee.country" :title="referee.country" style="width: 32px; height: 21px; object-fit: cover; border-radius: 2px;" />
          {{ referee.name }}
        </h2>
        <button class="close-button" @click="close">&times;</button>
      </div>
      
      <div class="modal-body" v-if="referee">
        <div class="info-row">
          <strong>Transfermarkt:</strong>
          <a :href="transfermarktUrl" target="_blank" rel="noopener noreferrer">Acessar Perfil</a>
        </div>
        
        <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Jogos Atribuídos ({{ refereeMatches.length }})</h3>
        <div v-if="refereeMatches.length === 0" class="no-matches">
          Nenhum jogo atribuído ainda.
        </div>
        <div v-else class="matches-list">
          <div v-for="match in refereeMatches" :key="match.id" class="match-item">
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
            <div class="match-cards" v-if="match.cards.yellow > 0 || match.cards.red > 0">
              <span v-if="match.cards.yellow > 0" class="card-count" title="Cartões Amarelos">
                <span class="card-icon yellow"></span> {{ match.cards.yellow }}
              </span>
              <span v-if="match.cards.red > 0" class="card-count" title="Cartões Vermelhos">
                <span class="card-icon red"></span> {{ match.cards.red }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--primary);
}
.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s;
}
.close-button:hover {
  background: var(--bg-surface);
  color: var(--text);
}
.info-row {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
.info-row a {
  color: var(--primary);
  text-decoration: none;
}
.info-row a:hover {
  text-decoration: underline;
}
.no-matches {
  color: var(--text-muted);
  font-style: italic;
  text-align: center;
  padding: 1rem;
  background: var(--background);
  border-radius: var(--radius-md);
}
.matches-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.match-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: var(--background);
  transition: transform 0.2s;
}
.match-item:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
}
.match-datetime {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}
.match-stage {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--text);
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
  color: var(--text-muted);
  font-weight: bold;
}
.score-display {
  font-size: 1rem;
  color: var(--text);
  white-space: nowrap;
}
.penalties {
  color: var(--text-muted);
  margin: 0 0.25rem;
}

.match-cards {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

.card-count {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--text-muted);
}

.card-icon {
  display: inline-block;
  width: 10px;
  height: 14px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.4);
}

.card-icon.yellow {
  background-color: #facc15;
}

.card-icon.red {
  background-color: #ef4444;
}

.referee-stats {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-val {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--text);
  line-height: 1;
}

.stat-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}
</style>
