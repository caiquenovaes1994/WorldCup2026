<script setup lang="ts">
import { allTeams } from '../data/teams'
import TeamBadge from './TeamBadge.vue'

const props = defineProps<{
  year: number
  performance: { first: string; second: string; third: string; hosts: string[] } | undefined
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const getTeamName = (code: string) => {
  const team = allTeams.find(t => t.code === code)
  return team ? team.name : code
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <div class="year-title">
          <span class="emoji">🏆</span>
          <h2>Copa do Mundo de {{ year }}</h2>
        </div>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>
      
      <div class="modal-body">
        <div class="hosts-section" v-if="performance?.hosts && performance.hosts.length > 0">
          <h3 class="stat-subtitle hosts-title">Sede</h3>
          <div class="hosts-list">
            <div v-for="host in performance.hosts" :key="host" class="host-item">
              <TeamBadge :code="host" size="sm" :showName="false" style="transform: scale(0.8); margin: -4px;" />
              <span>{{ getTeamName(host) }}</span>
            </div>
          </div>
        </div>

        <div class="podium-section">
          
          <div v-if="!performance || !performance.first" class="no-data">
            O torneio ainda não foi concluído ou os dados não estão disponíveis.
          </div>
          
          <div v-else class="podium-list">
            <div class="podium-item gold">
              <div class="medal-icon">🥇</div>
              <TeamBadge :code="performance.first" size="md" :showName="false" />
              <div class="team-info">
                <span class="team-name">{{ getTeamName(performance.first) }}</span>
              </div>
            </div>
            
            <div class="podium-item silver">
              <div class="medal-icon">🥈</div>
              <TeamBadge :code="performance.second" size="md" :showName="false" />
              <div class="team-info">
                <span class="team-name">{{ getTeamName(performance.second) }}</span>
              </div>
            </div>
            
            <div class="podium-item bronze" v-if="performance.third">
              <div class="medal-icon">🥉</div>
              <TeamBadge :code="performance.third" size="md" :showName="false" />
              <div class="team-info">
                <span class="team-name">{{ getTeamName(performance.third) }}</span>
              </div>
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

.year-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.year-title h2 {
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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-subtitle {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 0.5rem;
}

.hosts-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 1rem;
}

.hosts-title {
  margin: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.hosts-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
}

.host-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
}

.podium-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.podium-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.medal-icon {
  font-size: 1.5rem;
}

.team-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.team-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.no-data {
  text-align: center;
  color: var(--text-secondary);
  padding: 1rem 0;
  font-style: italic;
}
</style>
