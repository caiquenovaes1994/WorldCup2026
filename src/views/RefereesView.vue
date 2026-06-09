<script setup lang="ts">
import { computed, ref } from 'vue'
import { referees, countryToCode } from '../data/referees'
import RefereeModal from '../components/RefereeModal.vue'
import type { Referee } from '../types'

const refereesByConfederation = computed(() => {
  const grouped: Record<string, typeof referees> = {}
  
  // Create a sorted copy of referees
  const sortedReferees = [...referees].sort((a, b) => a.name.localeCompare(b.name))

  for (const ref of sortedReferees) {
    if (!grouped[ref.confederation]) {
      grouped[ref.confederation] = []
    }
    grouped[ref.confederation].push(ref)
  }
  return grouped
})

const confederations = ['AFC', 'CAF', 'CONCACAF', 'CONMEBOL', 'OFC', 'UEFA']

const getLogoExt = (conf: string) => {
  return (conf === 'AFC' || conf === 'CAF') ? 'svg' : 'png'
}

const openConf = ref<string | null>(null)
const toggle = (conf: string) => {
  openConf.value = openConf.value === conf ? null : conf
}

const refereeModal = ref<InstanceType<typeof RefereeModal> | null>(null)

const openRefereeModal = (refData: Referee) => {
  refereeModal.value?.open(refData)
}
</script>

<template>
  <div class="page-container">
    <h1 class="section-title" style="justify-content: center; text-align: center;">
      <img src="/apito.png" alt="Apito" style="height: 32px; object-fit: contain; margin-right: 0.5rem; filter: invert(1);" />
      Árbitros
    </h1>
    
    <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <div v-for="conf in confederations" :key="conf" style="border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--surface);">
        <div @click="toggle(conf)" style="padding: 1rem 1.5rem; cursor: pointer; font-weight: bold; font-size: 1.2rem; user-select: none; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;">
          <span></span>
          <div style="display: flex; align-items: center; gap: 1rem; justify-content: center;">
            <img :src="`/confederations/${conf.toLowerCase()}.${getLogoExt(conf)}`" :alt="conf" :style="{ height: conf === 'AFC' ? '20px' : '32px', objectFit: 'contain' }" />
            {{ conf }}
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; font-size: 0.8em; color: var(--text-secondary);" :style="{ transform: openConf === conf ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.8s ease' }">▼</span>
          </div>
        </div>
        <div class="accordion-wrapper" :class="{ open: openConf === conf }">
          <div class="accordion-content">
            <div style="padding: 1rem; border-top: 1px solid var(--border); display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; opacity: 0; transform: translateY(-10px); transition: all 0.8s ease-out;" :style="openConf === conf ? 'opacity: 1; transform: translateY(0); transition-delay: 0.1s;' : ''">
              <div v-for="ref in refereesByConfederation[conf]" :key="ref.name" style="background: var(--background); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; text-align: center;">
                <img :src="`/flags/${countryToCode[ref.country]}.svg`" :alt="ref.country" :title="ref.country" style="width: 32px; height: 21px; object-fit: cover; border-radius: 2px;" v-if="countryToCode[ref.country]" />
                <span @click="openRefereeModal(ref)" class="referee-link" style="cursor: pointer;">{{ ref.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RefereeModal ref="refereeModal" />
  </div>
</template>

<style scoped>
.accordion-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
.accordion-wrapper.open {
  grid-template-rows: 1fr;
}
.accordion-content {
  overflow: hidden;
}
.referee-link {
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s;
}
.referee-link:hover {
  text-decoration: underline;
  color: var(--primary);
}
</style>
