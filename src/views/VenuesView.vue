<script setup lang="ts">
import { venues } from '../data/venues'
</script>

<template>
  <div class="page-container">
    <h1 class="section-title">
      <span class="emoji">🏟️</span>
      Estádios Oficiais
    </h1>
    <div class="venues-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2rem;">
      <div v-for="venue in venues" :key="venue.id" class="venue-card" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; transition: transform 0.2s;">
        <img :src="venue.imageUrl" :alt="venue.name" style="width: 100%; height: 200px; object-fit: cover;" v-if="venue.imageUrl" />
        <div style="width: 100%; height: 200px; background: #333; display: flex; align-items: center; justify-content: center; color: #fff;" v-else>Imagem não disponível</div>
        <div style="padding: 1rem;">
          <h3 style="margin: 0; font-size: 1.2rem;">{{ venue.name }}</h3>
          <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">📍 {{ venue.city }}, {{ venue.state }} - {{ venue.country }}</p>
          <p style="margin: 0.25rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">👥 Capacidade: {{ venue.capacity.toLocaleString('pt-BR') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
