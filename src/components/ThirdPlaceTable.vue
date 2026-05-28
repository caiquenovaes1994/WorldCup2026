<script setup lang="ts">
import { computed } from 'vue'
import TeamBadge from './TeamBadge.vue'
import { useMatchStore } from '../stores/matchStore'

const matchStore = useMatchStore()
const thirdPlaceTeams = computed(() => matchStore.thirdPlaceTeams)
</script>

<template>
  <div class="third-place-card">
    <div class="group-header">
      <span class="group-letter">🏅 Melhores 3º Colocados</span>
      <span class="badge badge-gold">8 classificam</span>
    </div>
    <table class="standings-table">
      <thead>
        <tr>
          <th>#</th>
          <th style="min-width: 140px;">Seleção</th>
          <th>Grupo</th>
          <th>Pts</th>
          <th>SG</th>
          <th>GP</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(team, index) in thirdPlaceTeams"
          :key="team.teamCode"
          :class="team.qualified ? 'qualified-third' : 'eliminated'"
        >
          <td>
            <span :class="['position-badge', index < 8 ? 'position-3' : 'position-4']">
              {{ index + 1 }}
            </span>
          </td>
          <td>
            <div class="team-cell">
              <TeamBadge :code="team.teamCode" size="sm" />
            </div>
          </td>
          <td style="font-weight: 600; color: var(--accent-blue-light);">{{ team.group }}</td>
          <td class="points-cell">{{ team.points }}</td>
          <td>{{ team.goalDifference > 0 ? '+' : '' }}{{ team.goalDifference }}</td>
          <td>{{ team.goalsFor }}</td>
          <td>
            <span v-if="team.qualified" class="badge badge-green">Classificado</span>
            <span v-else class="badge badge-red">Eliminado</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
