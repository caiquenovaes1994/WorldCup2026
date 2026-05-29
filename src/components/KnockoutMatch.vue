<script setup lang="ts">
import { ref, computed } from 'vue'
import TeamBadge from './TeamBadge.vue'
import { venuesById } from '../data/venues'
import { useKnockoutStore } from '../stores/knockoutStore'
import type { KnockoutMatch } from '../types'

const props = defineProps<{ match: KnockoutMatch }>()
const knockoutStore = useKnockoutStore()

const homeScore = ref<string>(props.match.homeScore !== null ? String(props.match.homeScore) : '')
const awayScore = ref<string>(props.match.awayScore !== null ? String(props.match.awayScore) : '')
const homePen = ref<string>(props.match.homePenalties !== null ? String(props.match.homePenalties) : '')
const awayPen = ref<string>(props.match.awayPenalties !== null ? String(props.match.awayPenalties) : '')

const venue = venuesById[props.match.venueId]
const dateFormatted = new Date(props.match.date + 'T12:00:00').toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
})

const isDraw = ref(false)

const broadcasters = computed(() => {
  const list = ['cazetv']
  
  // Brazil games get all broadcasters
  const isBrazil = props.match.homeTeam === 'BRA' || props.match.awayTeam === 'BRA'
  
  // Late stages (SF, FINAL) or Brazil get all
  const isLateStage = props.match.round === 'SF' || props.match.round === 'FINAL' || props.match.round === '3RD'
  
  if (isBrazil || isLateStage || parseInt(props.match.id.replace(/\D/g, '') || '0') % 2 === 0) {
    list.push('tvglobo', 'sportv', 'globoplay')
  }
  
  if (isBrazil || isLateStage || parseInt(props.match.id.replace(/\D/g, '') || '0') % 3 === 0) {
    list.push('sbt', 'nsports')
  }
  
  return list
})

function onScoreChange() {
  const h = homeScore.value === '' ? null : parseInt(homeScore.value)
  const a = awayScore.value === '' ? null : parseInt(awayScore.value)
  if (h !== null && isNaN(h)) return
  if (a !== null && isNaN(a)) return

  isDraw.value = h !== null && a !== null && h === a

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

// Removed onRefereeChange as referees are no longer selectable

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
  <div class="knockout-match">
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
      />
    </div>

    <!-- Referee -->
    <div class="match-referee" style="font-size: 10px; margin-top: 6px; padding-top: 6px;">
      <span class="referee-label">🏁</span>
      <span class="referee-name" style="font-size: 10px; margin-left: 4px; color: var(--text-primary);">{{ match.referee || 'TDB' }}</span>
    </div>

    <!-- Broadcasters -->
    <div class="match-broadcasters" style="margin-top: 6px; padding-top: 6px;">
      <div class="broadcasters-list" style="justify-content: center; align-items: center; gap: 4px;">
        <span class="broadcasters-icon" style="font-size: 10px;">📺</span>
        <img v-for="b in broadcasters" :key="b" :src="`/broadcasters/${b}.png`" :alt="b" class="broadcaster-logo" :title="b.toUpperCase()" style="height: 12px;" />
      </div>
    </div>
  </div>
</template>
