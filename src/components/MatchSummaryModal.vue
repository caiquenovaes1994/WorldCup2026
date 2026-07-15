<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import type { GroupMatch, KnockoutMatch } from '../types'
import TeamBadge from './TeamBadge.vue'
import { matchEvents } from '../data/summaries'

const props = defineProps<{
  match: GroupMatch | KnockoutMatch
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

// Close on escape
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})

const processedEvents = computed(() => {
  const events = matchEvents[props.match.id]
  if (!events || events.length === 0) return []
  
  const result: any[] = []
  let htInserted = false
  let ftInserted = false
  
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    
    if (!ftInserted && parseInt(event.time) <= 90) {
      if (i > 0 && parseInt(events[i-1].time) > 90) {
        result.push({ isDivider: true, team: 'none', label: 'FT' })
        ftInserted = true
      }
    }
    
    if (!htInserted && parseInt(event.time) <= 45) {
      if (i > 0 && parseInt(events[i-1].time) > 45) {
        result.push({ isDivider: true, team: 'none', label: 'HT' })
        htInserted = true
      }
    }
    
    result.push(event)
  }
  
  if (!ftInserted && events.some(e => parseInt(e.time) > 90)) {
    result.push({ isDivider: true, team: 'none', label: 'FT' })
  }
  if (!htInserted && events.some(e => parseInt(e.time) > 45)) {
    result.push({ isDivider: true, team: 'none', label: 'HT' })
  }
  
  return result
})
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">&times;</button>
      
      <div class="modal-header">
        <h2>Resumo da Partida</h2>
        <div class="match-info">
          {{ match.date }} - {{ match.time }}
        </div>
      </div>

      <div class="match-score-display">
        <div class="team">
          <TeamBadge v-if="match.homeTeam" :code="match.homeTeam" size="lg" />
        </div>
        <div class="score">
          <span class="score-number">{{ match.homeScore !== null ? match.homeScore : '-' }}</span>
          <span class="score-divider">x</span>
          <span class="score-number">{{ match.awayScore !== null ? match.awayScore : '-' }}</span>
        </div>
        <div class="team">
          <TeamBadge v-if="match.awayTeam" :code="match.awayTeam" size="lg" />
        </div>
      </div>

      <div class="timeline-container" v-if="processedEvents.length > 0">
        <div class="timeline">
          <div v-for="(event, idx) in processedEvents" :key="idx" class="timeline-row" :class="event.team">
            
            <template v-if="event.isDivider">
              <div class="ht-divider">
                <span>{{ event.label }}</span>
              </div>
            </template>

            <template v-else-if="event.team === 'home'">
              <div class="time">{{ event.time }}</div>
              <div class="icon">
                <span v-if="event.type === 'goal'" title="Gol"><img src="/ball.png" style="width: 1em; height: 1em; vertical-align: middle;" alt="⚽" /></span>
                <span v-else-if="event.type === 'yellow'" class="card-icon yellow" title="Cartão Amarelo"></span>
                <span v-else-if="event.type === 'red'" class="card-icon red" title="Cartão Vermelho"></span>
                <span v-else-if="event.type === 'yellowred'" class="card-icon yellowred" title="Segundo Cartão Amarelo (Vermelho)"></span>
                <span v-else-if="event.type === 'sub'" title="Substituição">🔄</span>
                <span v-else-if="event.type === 'var'" title="VAR">🖥️</span>
              </div>
              <div class="details home">
                <span v-if="event.type === 'goal' && event.description" class="score-badge">{{ event.description }}</span>
                <span class="main-player">{{ event.player }}</span>
                <span v-if="event.secondaryPlayer" class="secondary-player">{{ event.secondaryPlayer }}</span>
                <span v-if="event.type !== 'goal' && event.description" class="description">{{ event.description }}</span>
              </div>
            </template>
            
            <template v-else-if="event.team === 'away'">
              <div class="details away">
                <span v-if="event.type !== 'goal' && event.description" class="description">{{ event.description }}</span>
                <span v-if="event.secondaryPlayer" class="secondary-player">{{ event.secondaryPlayer }}</span>
                <span class="main-player">{{ event.player }}</span>
                <span v-if="event.type === 'goal' && event.description" class="score-badge">{{ event.description }}</span>
              </div>
              <div class="icon">
                <span v-if="event.type === 'goal'" title="Gol"><img src="/ball.png" style="width: 1em; height: 1em; vertical-align: middle;" alt="⚽" /></span>
                <span v-else-if="event.type === 'yellow'" class="card-icon yellow" title="Cartão Amarelo"></span>
                <span v-else-if="event.type === 'red'" class="card-icon red" title="Cartão Vermelho"></span>
                <span v-else-if="event.type === 'yellowred'" class="card-icon yellowred" title="Segundo Cartão Amarelo (Vermelho)"></span>
                <span v-else-if="event.type === 'sub'" title="Substituição">🔄</span>
                <span v-else-if="event.type === 'var'" title="VAR">🖥️</span>
              </div>
              <div class="time">{{ event.time }}</div>
            </template>
            
            <template v-else>
              <div class="info-badge">{{ event.player }}</div>
            </template>

          </div>
        </div>
      </div>
      <div class="summary-placeholder" v-else>
        <p>As informações oficiais desta partida serão inseridas em breve.</p>
        <p style="font-size: 2rem; margin-top: 1rem;"><img src="/ball.png" style="width: 1em; height: 1em; vertical-align: middle;" alt="⚽" /></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--surface-light, #1e293b);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--text-secondary, #94a3b8);
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--text-primary, #f8fafc);
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary, #f8fafc);
}

.match-info {
  color: var(--text-secondary, #94a3b8);
  font-size: 0.9rem;
}

.match-score-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
}

.team {
  flex: 1;
  display: flex;
  justify-content: center;
}

.score {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary, #f8fafc);
}

.score-divider {
  color: var(--text-secondary, #94a3b8);
  font-size: 1.5rem;
}

.summary-placeholder {
  text-align: center;
  color: var(--text-secondary, #94a3b8);
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.timeline-container {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.timeline-container::-webkit-scrollbar {
  width: 6px;
}
.timeline-container::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 3px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.timeline-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-row.home { justify-content: flex-start; }
.timeline-row.away { justify-content: flex-end; }
.timeline-row.none { justify-content: center; margin: 0.5rem 0; }

.time {
  font-weight: 700;
  width: 45px;
  color: var(--text-primary);
}
.home .time { text-align: left; }
.away .time { text-align: right; }

.icon {
  width: 24px;
  text-align: center;
  font-size: 1.1rem;
}

.details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.details.home { justify-content: flex-start; }
.details.away { justify-content: flex-end; }

.main-player {
  font-weight: 600;
  color: var(--text-primary);
}

.secondary-player {
  color: var(--text-secondary);
}

.description {
  color: var(--text-secondary);
  font-size: 0.9em;
}

.score-badge {
  background: rgba(59, 130, 246, 0.2);
  color: var(--primary-light, #93c5fd);
  border: 1px solid var(--primary-color, #3b82f6);
  padding: 0.1rem 0.5rem;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.85em;
}

.info-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 1rem;
  border-radius: 16px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.ht-divider {
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--text-secondary, #94a3b8);
  font-size: 0.85rem;
  font-weight: 600;
}

.ht-divider::before,
.ht-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ht-divider::before {
  margin-right: 1rem;
}

.ht-divider::after {
  margin-left: 1rem;
}

.card-icon {
  display: inline-block;
  width: 12px;
  height: 18px;
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

.card-icon.yellowred {
  background-color: #facc15;
  position: relative;
  margin-right: 4px;
}

.card-icon.yellowred::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 4px;
  width: 12px;
  height: 18px;
  background-color: #ef4444;
  border-radius: 2px;
  box-shadow: -1px 1px 2px rgba(0,0,0,0.3);
  z-index: 1;
}
</style>
