<script setup lang="ts">
import { computed, ref } from 'vue'
import TeamBadge from './TeamBadge.vue'
import MatchCard from './MatchCard.vue'
import { useMatchStore } from '../stores/matchStore'

const props = defineProps<{ group: string }>()
const matchStore = useMatchStore()

const standings = computed(() => matchStore.allStandings[props.group] || [])
const groupMatches = computed(() => matchStore.getMatchesByGroup(props.group))

const isComplete = computed(() => matchStore.isGroupComplete(props.group))

const activeRound = ref(1)

const matchesForActiveRound = computed(() => {
  const matches = groupMatches.value
  const start = (activeRound.value - 1) * 2
  return matches.slice(start, start + 2)
})

function getRowClass(position: number): string {
  if (position === 1) return 'qualified-first'
  if (position === 2) return 'qualified-second'
  if (position === 3) return 'qualified-third'
  if (position === 4) return 'eliminated'
  return ''
}
</script>

<template>
  <div class="group-card animate-fade-in">
    <div class="group-header">
      <span class="group-letter">Grupo {{ group }}</span>
      <span v-if="isComplete" class="badge badge-green">✓ Completo</span>
      <span v-else class="group-status">Em andamento</span>
    </div>

    <!-- Standings Table -->
    <table class="standings-table">
      <thead>
        <tr>
          <th style="min-width: 160px;">Seleção</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="standing in standings"
          :key="standing.teamCode"
          :class="getRowClass(standing.position)"
        >
          <td>
            <div class="team-cell">
              <span :class="['position-badge', `position-${standing.position}`]">
                {{ standing.position }}
              </span>
              <TeamBadge :code="standing.teamCode" size="sm" />
            </div>
          </td>
          <td>{{ standing.played }}</td>
          <td>{{ standing.won }}</td>
          <td>{{ standing.drawn }}</td>
          <td>{{ standing.lost }}</td>
          <td>{{ standing.goalsFor }}</td>
          <td>{{ standing.goalsAgainst }}</td>
          <td>{{ standing.goalDifference > 0 ? '+' : '' }}{{ standing.goalDifference }}</td>
          <td class="points-cell">{{ standing.points }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Round Selector -->
    <div class="round-selector">
      <button 
        class="round-nav-btn" 
        @click="activeRound = Math.max(1, activeRound - 1)" 
        :disabled="activeRound === 1"
        title="Rodada anterior"
      >
        ❮
      </button>
      <span class="round-label">{{ activeRound }}ª RODADA</span>
      <button 
        class="round-nav-btn" 
        @click="activeRound = Math.min(3, activeRound + 1)" 
        :disabled="activeRound === 3"
        title="Próxima rodada"
      >
        ❯
      </button>
    </div>

    <!-- Group Matches -->
    <div class="matches-grid">
      <MatchCard v-for="match in matchesForActiveRound" :key="match.id" :match="match" />
    </div>
  </div>
</template>
