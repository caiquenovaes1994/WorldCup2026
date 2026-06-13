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
  <div class="knockout-match" :class="{ 'is-finished-card': isFinished }" @click="handleCardClick">
    <div class="knockout-match-info">
      {{ dateFormatted }} · {{ match.time }} · {{ venue?.city }}
    </div>

    <!-- Home team -->
    <div :class="['knockout-team-row', getWinnerClass('home')]">
      <div class="team-info">
        <template v-if="match.homeTeam">
          <TeamBadge :code="match.homeTeam" size="sm" />
        </template>
        <span v-else class="source-label">{{ getSourceLabel(match.homeSource) }}</span>
      </div>
      <template v-if="!isFinished">
        <input
          v-model="homeScore"
          @input="onScoreChange"
          type="number"
          min="0"
          max="99"
          class="knockout-score-input"
          placeholder="–"
          :disabled="!match.homeTeam || !match.awayTeam"
        />
      </template>
      <template v-else>
        <span class="score-display">{{ match.homeScore }}</span>
      </template>
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

    <!-- Away team -->
    <div :class="['knockout-team-row', getWinnerClass('away')]">
      <div class="team-info">
        <template v-if="match.awayTeam">
          <TeamBadge :code="match.awayTeam" size="sm" />
        </template>
        <span v-else class="source-label">{{ getSourceLabel(match.awaySource) }}</span>
      </div>
      <template v-if="!isFinished">
        <input
          v-model="awayScore"
          @input="onScoreChange"
          type="number"
          min="0"
          max="99"
          class="knockout-score-input"
          placeholder="–"
          :disabled="!match.homeTeam || !match.awayTeam"
        />
      </template>
      <template v-else>
        <span class="score-display">{{ match.awayScore }}</span>
      </template>
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

    <!-- Referee -->
    <div class="match-referee" style="font-size: 10px; margin-top: 6px; padding-top: 6px; display: flex; align-items: center; justify-content: center;">
      <span class="referee-label">🏁</span>
      <span class="referee-name" style="font-size: 10px; margin-left: 4px; color: var(--text-primary);">{{ match.referee || 'TDB' }}</span>
      <img v-if="getRefereeFlag(match.referee)" :src="getRefereeFlag(match.referee)" :title="getRefereeCountry(match.referee) || ''" :alt="getRefereeCountry(match.referee) || ''" class="referee-flag" style="height: 10px; margin-left: 4px; border-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.3); cursor: help;" />
    </div>

    <!-- Broadcasters or Highlights -->
    <div class="match-broadcasters" style="margin-top: 6px; padding-top: 6px;">
      <div class="broadcasters-list" style="justify-content: center; align-items: center; gap: 12px;">
        <template v-if="isFinished && match.highlightsUrl">
          <a :href="match.highlightsUrl" target="_blank" rel="noopener noreferrer" class="broadcaster-link highlights-link" style="text-decoration: none;" @click.stop>
            <span class="broadcasters-icon" style="font-size: 10px; color: #ef4444;" title="Melhores Momentos">▶ Melhores Momentos</span>
          </a>
        </template>
        <template v-else>
          <span class="broadcasters-icon" style="font-size: 10px;" title="Transmissão">📺</span>
          <a v-for="b in broadcasters" :key="b" :href="broadcasterUrls[b]" target="_blank" rel="noopener noreferrer" class="broadcaster-link" @click.stop>
            <img :src="`/broadcasters/${b}.png`" :alt="b" class="broadcaster-logo" :title="b.toUpperCase()" style="height: 12px;" />
          </a>
        </template>
      </div>
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
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  width: 30px;
  text-align: center;
}
</style>
