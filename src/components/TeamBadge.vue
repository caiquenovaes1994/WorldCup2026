<script setup lang="ts">
import { teamsByCode } from '../data/teams'

const props = withDefaults(defineProps<{
  code: string
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
}>(), {
  size: 'md',
  showName: true
})

const team = teamsByCode[props.code]
const flagSrc = team ? `/flags/${team.flagCode}.svg` : ''
</script>

<template>
  <span class="team-badge" v-if="team">
    <span :class="['team-flag', size]">
      <img :src="flagSrc" :alt="team.name" loading="lazy" />
    </span>
    <span v-if="showName" :class="['team-name', size]">{{ team.name }}</span>
  </span>
  <span v-else class="team-badge">
    <span :class="['team-flag', size]" style="background: var(--bg-surface);"></span>
    <span v-if="showName" :class="['team-name', size]" style="color: var(--text-muted); font-style: italic;">TBD</span>
  </span>
</template>
