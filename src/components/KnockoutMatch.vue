<script setup lang="ts">
import { ref, computed } from 'vue'
import TeamBadge from './TeamBadge.vue'
import MatchSummaryModal from './MatchSummaryModal.vue'
import { venuesById } from '../data/venues'
import { useKnockoutStore } from '../stores/knockoutStore'
import { useBroadcasters, broadcasterUrls } from '../composables/useBroadcasters'
import { getRefereeFlag, getRefereeCountry } from '../data/referees'
import type { KnockoutMatch } from '../types'

const props = defineProps<{ match: KnockoutMatch, isHome?: boolean }>()
const knockoutStore = useKnockoutStore()

const homeScore = ref<string>(props.match.homeScore !== null ? String(props.match.homeScore) : '')
const awayScore = ref<string>(props.match.awayScore !== null ? String(props.match.awayScore) : '')
const homePen = ref<string>(props.match.homePenalties !== null ? String(props.match.homePenalties) : '')
const awayPen = ref<string>(props.match.awayPenalties !== null ? String(props.match.awayPenalties) : '')
const showModal = ref(false)

const isFinished = computed(() => props.match.homeScore !== null && props.match.awayScore !== null)

function handleCardClick() {
  if (isFinished.value) {
    showModal.value = true
  }
}

const venue = venuesById[props.match.venueId]
const dateFormatted = new Date(props.match.date + 'T12:00:00').toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
})

const isDraw = computed(() =>
  props.match.homeScore !== null &&
  props.match.awayScore !== null &&
  props.match.homeScore === props.match.awayScore
)

const broadcasters = useBroadcasters(
  () => props.match.homeTeam,
  () => props.match.awayTeam,
  () => props.match.round,
  () => parseInt(props.match.id.replace(/\D/g, '') || '0')
)

function onScoreChange() {
  const h = homeScore.value === '' ? null : parseInt(homeScore.value)
  const a = awayScore.value === '' ? null : parseInt(awayScore.value)
  if (h !== null && isNaN(h)) return
  if (a !== null && isNaN(a)) return

  const hp = homePen.value === '' ? null : parseInt(homePen.value)
  const ap = awayPen.value === '' ? null : parseInt(awayPen.value)

  knockoutStore.updateKnockoutScore(props.match.id, h, a, hp, ap)
}

function onPenaltyChange() {
  const h = homeScore.value === '' ? null : parseInt(homeScore.value)
  const a = awayScore.value === '' ? null : parseInt(awayScore.value)
  const hp = homePen.value === '' ? null : parseInt(homePen.value)
  const ap = awayPen.value === '' ? null : parseInt(awayPen.value)

  knockoutStore.updateKnockoutScore(props.match.id, h, a, hp, ap)
}

function getWinnerClass(team: 'home' | 'away'): string {
  if (props.match.homeScore === null || props.match.awayScore === null) return ''
  if (!props.match.homeTeam || !props.match.awayTeam) return ''

  const homeWins = props.match.homeScore > props.match.awayScore ||
    (props.match.homeScore === props.match.awayScore &&
     props.match.homePenalties !== null && props.match.awayPenalties !== null &&
     props.match.homePenalties > props.match.awayPenalties)

  const awayWins = props.match.awayScore > props.match.homeScore ||
    (props.match.homeScore === props.match.awayScore &&
     props.match.homePenalties !== null && props.match.awayPenalties !== null &&
     props.match.awayPenalties > props.match.homePenalties)

  if (team === 'home') return homeWins ? 'winner' : awayWins ? 'loser' : ''
  return awayWins ? 'winner' : homeWins ? 'loser' : ''
}

function getSourceLabel(source: string): string {
  if (source.startsWith('W-')) return 'Venc. ' + source.substring(2)
  if (source.startsWith('L-')) return 'Perd. ' + source.substring(2)
  if (source.startsWith('1')) return '1º Grupo ' + source[1]
  if (source.startsWith('2')) return '2º Grupo ' + source[1]
  if (source.startsWith('3')) return '3º ' + source
  return source
}
</script>

<template>
  <div class="match-card" :class="{ 'is-finished-card': isFinished }" @click="handleCardClick">
    <div class="match-card-header">
      <span class="match-date">{{ dateFormatted }} · {{ match.time }}</span>
      <span class="match-venue" :title="venue?.name + ', ' + venue?.city">📍 {{ venue?.city }}</span>
    </div>
    
    <div class="match-body">
      <div class="match-team home" :class="getWinnerClass('home')">
        <template v-if="match.homeTeam">
          <TeamBadge :code="match.homeTeam" size="md" />
        </template>
        <span v-else class="source-label">{{ getSourceLabel(match.homeSource) }}</span>
      </div>
      
      <div class="match-score-area">
        <template v-if="!isFinished">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <input
              v-model="homeScore"
              @input="onScoreChange"
              type="number"
              min="0"
              max="99"
              class="score-input"
              placeholder="–"
              :disabled="!match.homeTeam || !match.awayTeam"
            />
            <input
              v-if="isDraw || (match.homeScore !== null && match.awayScore !== null && match.homeScore === match.awayScore)"
              v-model="homePen"
              @input="onPenaltyChange"
              type="number"
              min="0"
              max="99"
              class="penalty-input"
              placeholder="P"
              title="Pênaltis"
              :disabled="isFinished"
            />
          </div>
          
          <span class="score-separator">×</span>
          
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <input
              v-model="awayScore"
              @input="onScoreChange"
              type="number"
              min="0"
              max="99"
              class="score-input"
              placeholder="–"
              :disabled="!match.homeTeam || !match.awayTeam"
            />
            <input
              v-if="isDraw || (match.homeScore !== null && match.awayScore !== null && match.homeScore === match.awayScore)"
              v-model="awayPen"
              @input="onPenaltyChange"
              type="number"
              min="0"
              max="99"
              class="penalty-input"
              placeholder="P"
              title="Pênaltis"
              :disabled="isFinished"
            />
          </div>
        </template>
        <template v-else>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
            <span class="score-display">{{ match.homeScore }}</span>
            <span v-if="match.homePenalties !== null" style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 700;">({{ match.homePenalties }})</span>
          </div>
          <span class="score-separator">×</span>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
            <span class="score-display">{{ match.awayScore }}</span>
            <span v-if="match.awayPenalties !== null" style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 700;">({{ match.awayPenalties }})</span>
          </div>
        </template>
      </div>

      <div class="match-team away" :class="getWinnerClass('away')">
        <template v-if="match.awayTeam">
          <TeamBadge :code="match.awayTeam" size="md" />
        </template>
        <span v-else class="source-label">{{ getSourceLabel(match.awaySource) }}</span>
      </div>
    </div>

    <div class="match-referee" style="display: flex; align-items: center;">
      <span class="referee-label">🏁 Árbitro:</span>
      <span class="referee-name" style="margin-left: 4px;">{{ match.referee || 'TDB' }}</span>
      <img v-if="getRefereeFlag(match.referee)" :src="getRefereeFlag(match.referee)" :title="getRefereeCountry(match.referee) || ''" :alt="getRefereeCountry(match.referee) || ''" class="referee-flag" style="height: 12px; margin-left: 6px; border-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.3); cursor: help;" />
    </div>

    <!-- Broadcasters or Highlights -->
    <div class="match-broadcasters">
      <template v-if="isFinished && match.highlightsUrl">
        <a :href="match.highlightsUrl" target="_blank" rel="noopener noreferrer" class="broadcaster-link highlights-link" @click.stop>
          <span class="broadcasters-label" title="Melhores Momentos" style="color: #ef4444;">▶ Melhores Momentos</span>
        </a>
      </template>
      <template v-else>
        <span class="broadcasters-label" title="Transmissão">📺</span>
        <div class="broadcasters-list">
          <a v-for="b in broadcasters" :key="b" :href="broadcasterUrls[b]" target="_blank" rel="noopener noreferrer" class="broadcaster-link" @click.stop>
            <img :src="`/broadcasters/${b}.png`" :alt="b" class="broadcaster-logo" :title="b.toUpperCase()" />
          </a>
        </div>
      </template>
    </div>
    <Teleport to="body">
      <MatchSummaryModal v-if="showModal" :match="match" @close="showModal = false" />
    </Teleport>
  </div>
</template>

<style scoped>
.is-finished-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.is-finished-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  border-color: var(--accent-blue);
}
.score-display {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  width: 40px;
  text-align: center;
}

.match-team.home.winner, .match-team.away.winner {
  /* You can add winner styles here if you want to highlight the winner team */
}
.match-team.home.loser, .match-team.away.loser {
  opacity: 0.5;
}

.source-label {
  font-size: var(--font-xs);
  color: var(--text-muted);
  font-style: italic;
}

.match-broadcasters {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.broadcasters-list {
  display: flex;
  gap: 6px;
}

.broadcaster-logo {
  height: 16px;
  border-radius: 2px;
}
</style>
