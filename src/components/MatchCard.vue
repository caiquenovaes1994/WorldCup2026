<script setup lang="ts">
import { ref, watch } from 'vue'
import TeamBadge from './TeamBadge.vue'
import { venuesById } from '../data/venues'
import { useMatchStore } from '../stores/matchStore'
import { useBroadcasters, broadcasterUrls } from '../composables/useBroadcasters'
import { getRefereeFlag, getRefereeCountry } from '../data/referees'
import type { GroupMatch } from '../types'

const props = defineProps<{ match: GroupMatch }>()
const matchStore = useMatchStore()

const homeScore = ref<string>(props.match.homeScore !== null ? String(props.match.homeScore) : '')
const awayScore = ref<string>(props.match.awayScore !== null ? String(props.match.awayScore) : '')
const flashHome = ref(false)
const flashAway = ref(false)

const venue = venuesById[props.match.venueId]

const dateFormatted = new Date(props.match.date + 'T12:00:00').toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
})

const broadcasters = useBroadcasters(
  () => props.match.homeTeam,
  () => props.match.awayTeam,
  () => 'GROUP',
  () => props.match.id
)

function onScoreChange() {
  const h = homeScore.value === '' ? null : parseInt(homeScore.value)
  const a = awayScore.value === '' ? null : parseInt(awayScore.value)

  if (h !== null && isNaN(h)) return
  if (a !== null && isNaN(a)) return

  matchStore.updateScore(props.match.id, h, a)
}

watch(() => props.match.homeScore, (newVal, oldVal) => {
  if (newVal !== null && oldVal !== null && newVal > oldVal) {
    flashHome.value = true
    setTimeout(() => flashHome.value = false, 600)
  }
  homeScore.value = newVal !== null ? String(newVal) : ''
})

watch(() => props.match.awayScore, (newVal, oldVal) => {
  if (newVal !== null && oldVal !== null && newVal > oldVal) {
    flashAway.value = true
    setTimeout(() => flashAway.value = false, 600)
  }
  awayScore.value = newVal !== null ? String(newVal) : ''
})
</script>

<template>
  <div class="match-card">
    <div class="match-card-header">
      <span class="match-date">{{ dateFormatted }} · {{ match.time }}</span>
      <span class="match-venue" :title="venue?.name + ', ' + venue?.city">📍 {{ venue?.city }}</span>
    </div>
    <div class="match-body">
      <div class="match-team home">
        <TeamBadge :code="match.homeTeam" size="md" />
      </div>
      <div class="match-score-area">
        <input
          v-model="homeScore"
          @input="onScoreChange"
          type="number"
          min="0"
          max="99"
          class="score-input"
          :class="{ 'score-flash': flashHome }"
          placeholder="–"
        />
        <span class="score-separator">×</span>
        <input
          v-model="awayScore"
          @input="onScoreChange"
          type="number"
          min="0"
          max="99"
          class="score-input"
          :class="{ 'score-flash': flashAway }"
          placeholder="–"
        />
      </div>
      <div class="match-team away">
        <TeamBadge :code="match.awayTeam" size="md" />
      </div>
    </div>
    <div class="match-referee" style="display: flex; align-items: center;">
      <span class="referee-label">🏁 Árbitro:</span>
      <span class="referee-name" style="margin-left: 4px;">{{ match.referee || 'TDB' }}</span>
      <img v-if="getRefereeFlag(match.referee)" :src="getRefereeFlag(match.referee)" :title="getRefereeCountry(match.referee) || ''" :alt="getRefereeCountry(match.referee) || ''" class="referee-flag" style="height: 12px; margin-left: 6px; border-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.3); cursor: help;" />
    </div>
    
    <!-- Broadcasters -->
    <div class="match-broadcasters">
      <span class="broadcasters-label">📺 Transmissão:</span>
      <div class="broadcasters-list">
        <a v-for="b in broadcasters" :key="b" :href="broadcasterUrls[b]" target="_blank" rel="noopener noreferrer" class="broadcaster-link">
          <img :src="`/broadcasters/${b}.png`" :alt="b" class="broadcaster-logo" :title="b.toUpperCase()" />
        </a>
      </div>
    </div>
  </div>
</template>
