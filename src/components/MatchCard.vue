<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import TeamBadge from './TeamBadge.vue'
import MatchSummaryModal from './MatchSummaryModal.vue'
import { venuesById } from '../data/venues'
import { useMatchStore } from '../stores/matchStore'
import { useBroadcasters, broadcasterUrls } from '../composables/useBroadcasters'
import { getRefereeFlag, getRefereeCountry } from '../data/referees'
import type { GroupMatch } from '../types'

const props = defineProps<{ match: GroupMatch, isHome?: boolean }>()
const matchStore = useMatchStore()

const homeScore = ref<string>(props.match.homeScore !== null ? String(props.match.homeScore) : '')
const awayScore = ref<string>(props.match.awayScore !== null ? String(props.match.awayScore) : '')
const flashHome = ref(false)
const flashAway = ref(false)
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
  <div class="match-card" :class="{ 'is-finished-card': isFinished }" @click="handleCardClick">
    <div class="match-card-header">
      <span class="match-date">{{ dateFormatted }} · {{ match.time }}</span>
      <span class="match-venue" :title="venue?.name + ', ' + venue?.city">📍 {{ venue?.city }}</span>
    </div>
    <div class="match-body">
      <div class="match-team home">
        <TeamBadge :code="match.homeTeam" size="md" />
      </div>
      <div class="match-score-area">
        <template v-if="!isFinished">
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
        </template>
        <template v-else>
          <span class="score-display">{{ match.homeScore }}</span>
          <span class="score-separator">×</span>
          <span class="score-display">{{ match.awayScore }}</span>
        </template>
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
    
    <!-- Broadcasters or Highlights -->
    <div class="match-broadcasters">
      <template v-if="isHome && isFinished && match.highlightsUrl">
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
</style>
