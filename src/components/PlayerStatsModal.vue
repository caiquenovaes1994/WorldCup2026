<script setup lang="ts">
import { computed } from 'vue'
import { matchEvents } from '../data/summaries'
import { groupMatches } from '../data/matches'
import { useKnockoutStore } from '../stores/knockoutStore'
import TeamBadge from './TeamBadge.vue'

const props = defineProps<{
  player: {
    name: string
    teamCode: string
    type: 'goal' | 'assist' | 'yellow' | 'red'
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const knockoutStore = useKnockoutStore()

const matchDetails = computed(() => {
  const result: { matchStr: string, date: string, count: number, details: string[] }[] = []
  
  for (const matchIdStr in matchEvents) {
    const events = matchEvents[matchIdStr]
    if (!events) continue
    
    const relevantEvents = events.filter(e => {
      // In events, name might include "(GC)" for own goals, or we might match exactly.
      // Usually, player names match exactly. If it's an own goal, it's not counted in topScorers anyway.
      if (props.player.type === 'goal') {
        return e.type === 'goal' && e.player.includes(props.player.name)
      }
      if (props.player.type === 'assist') {
        return e.type === 'goal' && e.secondaryPlayer && e.secondaryPlayer.includes(props.player.name)
      }
      if (props.player.type === 'yellow') {
        return e.type === 'yellow' && e.player.includes(props.player.name)
      }
      if (props.player.type === 'red') {
        return e.type === 'red' && e.player.includes(props.player.name)
      }
      return false
    })
    
    if (relevantEvents.length > 0) {
      // Find match info
      const matchId = isNaN(Number(matchIdStr)) ? matchIdStr : Number(matchIdStr)
      let mDate = ''
      let home = ''
      let away = ''
      
      const groupMatch = groupMatches.find(m => m.id === matchId)
      if (groupMatch) {
        mDate = groupMatch.date
        home = groupMatch.homeTeam
        away = groupMatch.awayTeam
      } else {
        const koMatch = knockoutStore.knockoutMatches.find(m => m.id === String(matchId))
        if (koMatch) {
          mDate = koMatch.date
          home = koMatch.homeTeam || '?'
          away = koMatch.awayTeam || '?'
        }
      }
      
      const formattedDate = mDate ? new Date(mDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '?'
      
      result.push({
        matchStr: `${home} x ${away}`,
        date: formattedDate,
        count: relevantEvents.length,
        details: relevantEvents.map(e => e.time)
      })
    }
  }
  
  return result.reverse()
})

const getTitle = () => {
  switch (props.player.type) {
    case 'goal': return 'Gols'
    case 'assist': return 'Assistências'
    case 'yellow': return 'Cartões Amarelos'
    case 'red': return 'Cartões Vermelhos'
  }
}

const getUnit = (count: number) => {
  switch (props.player.type) {
    case 'goal': return count === 1 ? 'gol' : 'gols'
    case 'assist': return count === 1 ? 'assistência' : 'assistências'
    case 'yellow': return count === 1 ? 'cartão' : 'cartões'
    case 'red': return count === 1 ? 'cartão' : 'cartões'
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <div class="player-title">
          <TeamBadge :code="props.player.teamCode" size="md" :showName="false" />
          <h2>{{ props.player.name }}</h2>
        </div>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <h3 class="stat-subtitle">{{ getTitle() }} por Partida</h3>
        
        <div v-if="matchDetails.length === 0" class="no-data">
          Nenhum registro detalhado encontrado.
        </div>
        
        <div v-else class="match-list">
          <div v-for="(item, idx) in matchDetails" :key="idx" class="match-item">
            <div class="match-info">
              <span class="match-date">{{ item.date }}</span>
              <span class="match-teams">{{ item.matchStr }}</span>
            </div>
            <div class="match-stat">
              <span class="stat-count">{{ item.count }} {{ getUnit(item.count) }}</span>
              <span class="stat-times">({{ item.details.join(', ') }})</span>
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
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.02);
}

.player-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.player-title h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.stat-subtitle {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.no-data {
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem 0;
  font-style: italic;
}

.match-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.match-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.match-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.match-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.match-teams {
  font-weight: 600;
  color: var(--text-primary);
}

.match-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.stat-count {
  font-weight: bold;
  color: var(--accent-blue);
}

.stat-times {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
</style>
