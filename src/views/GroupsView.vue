<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GroupTable from '../components/GroupTable.vue'
import ThirdPlaceTable from '../components/ThirdPlaceTable.vue'
import { useMatchStore } from '../stores/matchStore'
import { groupNames } from '../data/teams'
import ConfirmModal from '../components/ConfirmModal.vue'

const matchStore = useMatchStore()
const route = useRoute()

const selectedGroups = ref<string[]>([...groupNames])
const showResetModal = ref(false)

function toggleGroup(group: string) {
  if (selectedGroups.value.length === 1 && selectedGroups.value[0] === group) {
    selectedGroups.value = [...groupNames]
    return
  }
  if (selectedGroups.value.length === groupNames.length) {
    selectedGroups.value = [group]
  } else if (selectedGroups.value.includes(group)) {
    selectedGroups.value = selectedGroups.value.filter(g => g !== group)
    if (selectedGroups.value.length === 0) selectedGroups.value = [...groupNames]
  } else {
    selectedGroups.value.push(group)
  }
}

function showAllGroups() {
  selectedGroups.value = [...groupNames]
}

function resetScores() {
  showResetModal.value = true
}

function executeReset() {
  matchStore.resetAllScores()
  showResetModal.value = false
}

onMounted(() => {
  if (route.query.group) {
    const g = String(route.query.group).toUpperCase()
    if (groupNames.includes(g)) {
      selectedGroups.value = [g]
    }
  }
})
</script>

<template>
  <div class="page-container">
    <h1 class="section-title">
      <span class="emoji">📋</span>
      Fase de Grupos
    </h1>

    <div class="info-banner">
      <span class="icon">ℹ️</span>
      <div class="text">
        Insira os placares nos campos de cada jogo. A classificação será atualizada automaticamente seguindo os critérios oficiais da <img src="/FIFA_Logo_White_Generic.webp" class="inline-fifa-logo" alt="FIFA" />.
      </div>
    </div>

    <!-- Filters -->
    <div class="actions-bar">
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: selectedGroups.length === groupNames.length }"
          @click="showAllGroups"
        >
          Todos
        </button>
        <button
          v-for="group in groupNames"
          :key="group"
          class="tab"
          :class="{ active: selectedGroups.includes(group) && selectedGroups.length < groupNames.length }"
          @click="toggleGroup(group)"
        >
          {{ group }}
        </button>
      </div>
      <button class="btn btn-danger" @click="resetScores">
        🗑️ Limpar Placares
      </button>
    </div>

    <!-- Legend -->
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color" style="background: var(--qualified-first);"></div>
        1º — Classificado
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: var(--qualified-second);"></div>
        2º — Classificado
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: var(--qualified-third);"></div>
        3º — Possível classificação
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: var(--eliminated);"></div>
        4º — Eliminado
      </div>
    </div>

    <!-- Groups Grid -->
    <div class="groups-grid">
      <GroupTable
        v-for="group in selectedGroups"
        :key="group"
        :group="group"
      />
    </div>

    <!-- Third Place Table -->
    <div class="third-place-section">
      <ThirdPlaceTable />
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal 
      :show="showResetModal" 
      title="Limpar Placares" 
      message="Tem certeza que deseja limpar todos os placares? Esta ação não pode ser desfeita."
      @confirm="executeReset"
      @cancel="showResetModal = false"
    />
  </div>
</template>
