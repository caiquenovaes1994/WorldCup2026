<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import KnockoutMatchComp from '../components/KnockoutMatch.vue'
import { useKnockoutStore } from '../stores/knockoutStore'
import { roundNames } from '../data/knockoutRules'
import ConfirmModal from '../components/ConfirmModal.vue'

const knockoutStore = useKnockoutStore()

const activeRound = ref<string>('all')
const showResetModal = ref(false)

const rounds = ['R32', 'R16', 'QF', 'SF', '3RD', 'FINAL']

const r32Matches = computed(() => knockoutStore.getMatchesByRound('R32'))
const r16Matches = computed(() => knockoutStore.getMatchesByRound('R16'))
const qfMatches = computed(() => knockoutStore.getMatchesByRound('QF'))
const sfMatches = computed(() => knockoutStore.getMatchesByRound('SF'))
const thirdPlace = computed(() => knockoutStore.getMatchesByRound('3RD'))
const final = computed(() => knockoutStore.getMatchesByRound('FINAL'))

function populateKnockout() {
  knockoutStore.populateFromGroups()
}

function resetKnockout() {
  showResetModal.value = true
}

function executeReset() {
  knockoutStore.resetKnockout()
  knockoutStore.populateFromGroups()
  showResetModal.value = false
}

onMounted(() => {
  knockoutStore.setupWatcher()
  knockoutStore.populateFromGroups()
})

function shouldShowRound(round: string): boolean {
  return activeRound.value === 'all' || activeRound.value === round
}
</script>

<template>
  <div class="page-container">
    <h1 class="section-title">
      <span class="emoji">🏆</span>
      Fase Eliminatória
    </h1>

    <div class="info-banner">
      <span class="icon">⚡</span>
      <div class="text">
        Os times classificados da fase de grupos são automaticamente inseridos no chaveamento.
        Em caso de <strong>empate</strong>, campos de <strong>pênaltis</strong> aparecerão para definir o vencedor.
        O vencedor avança automaticamente para a próxima fase.
      </div>
    </div>

    <div class="actions-bar">
      <div class="tabs">
        <button class="tab" :class="{ active: activeRound === 'all' }" @click="activeRound = 'all'">
          Todas as fases
        </button>
        <button
          v-for="round in rounds"
          :key="round"
          class="tab"
          :class="{ active: activeRound === round }"
          @click="activeRound = round"
        >
          {{ roundNames[round] || round }}
        </button>
      </div>
      <div style="display: flex; gap: var(--space-sm);">
        <button class="btn btn-primary" @click="populateKnockout">
          🔄 Atualizar do Grupos
        </button>
        <button class="btn btn-danger" @click="resetKnockout">
          🗑️ Resetar
        </button>
      </div>
    </div>

    <!-- Bracket Layout -->
    <div class="knockout-rounds-container">
      <!-- Round of 32 -->
      <div v-if="shouldShowRound('R32')" class="knockout-round-column">
        <div class="knockout-round-title">{{ roundNames['R32'] }}</div>
        <KnockoutMatchComp v-for="match in r32Matches" :key="match.id" :match="match" />
      </div>

      <!-- Round of 16 -->
      <div v-if="shouldShowRound('R16')" class="knockout-round-column">
        <div class="knockout-round-title">{{ roundNames['R16'] }}</div>
        <KnockoutMatchComp v-for="match in r16Matches" :key="match.id" :match="match" />
      </div>

      <!-- Quarterfinals -->
      <div v-if="shouldShowRound('QF')" class="knockout-round-column">
        <div class="knockout-round-title">{{ roundNames['QF'] }}</div>
        <KnockoutMatchComp v-for="match in qfMatches" :key="match.id" :match="match" />
      </div>

      <!-- Semifinals -->
      <div v-if="shouldShowRound('SF')" class="knockout-round-column">
        <div class="knockout-round-title">{{ roundNames['SF'] }}</div>
        <KnockoutMatchComp v-for="match in sfMatches" :key="match.id" :match="match" />
      </div>

      <!-- 3rd Place + Final -->
      <div v-if="shouldShowRound('3RD') || shouldShowRound('FINAL')" class="knockout-round-column">
        <template v-if="shouldShowRound('3RD')">
          <div class="knockout-round-title">{{ roundNames['3RD'] }}</div>
          <KnockoutMatchComp v-for="match in thirdPlace" :key="match.id" :match="match" />
        </template>
        <template v-if="shouldShowRound('FINAL')">
          <div class="knockout-round-title" style="color: var(--accent-gold); border-color: var(--accent-gold);">
            {{ roundNames['FINAL'] }} 🏆
          </div>
          <KnockoutMatchComp v-for="match in final" :key="match.id" :match="match" />
        </template>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal 
      :show="showResetModal" 
      title="Resetar Mata-Mata" 
      message="Tem certeza que deseja resetar toda a fase eliminatória?"
      @confirm="executeReset"
      @cancel="showResetModal = false"
    />
  </div>
</template>
