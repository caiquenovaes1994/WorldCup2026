<script setup lang="ts">
import { mascotInfo, officialBallInfo } from '../data/tournamentInfo'
</script>

<template>
  <div class="page-container">
    <div class="header-section">
      <h1 class="page-title">Sobre o Torneio</h1>
      <p class="page-subtitle">Conheça os símbolos oficiais da Copa do Mundo <img src="/FIFA_Logo_White_Generic.webp" class="inline-fifa-logo" alt="FIFA" /> 2026™</p>
    </div>

    <!-- Mascotes Section -->
    <section class="info-section">
      <div class="info-content">
        <h2 class="section-title">
          <span class="emoji">🐾</span> Mascotes Oficiais: {{ mascotInfo.name }}
        </h2>
        <p class="info-description">{{ mascotInfo.description }}</p>
        
        <div class="details-grid">
          <div v-for="(detail, index) in mascotInfo.details" :key="index" class="detail-card">
            <h3 class="detail-title">{{ detail.title }}</h3>
            <p class="detail-text">{{ detail.content }}</p>
          </div>
        </div>
      </div>
      <div class="info-image-container">
        <img :src="mascotInfo.image" alt="Mascotes da Copa 2026" class="info-image" />
      </div>
    </section>

    <div class="divider"></div>

    <!-- Bola Oficial Section -->
    <section class="info-section reverse">
      <div class="info-content">
        <h2 class="section-title">
          <img src="/ball.png" alt="Ícone da Bola" class="title-icon" /> Bola Oficial: {{ officialBallInfo.name }}
        </h2>
        <p class="info-description">{{ officialBallInfo.description }}</p>
        
        <div class="details-grid">
          <div v-for="(detail, index) in officialBallInfo.details" :key="index" class="detail-card">
            <h3 class="detail-title">{{ detail.title }}</h3>
            <p class="detail-text">{{ detail.content }}</p>
          </div>
        </div>
      </div>
      <div class="info-image-container">
        <img :src="officialBallInfo.image" alt="Bola Oficial da Copa 2026" class="info-image" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
  align-items: center;
}

@media (min-width: 900px) {
  .info-section {
    flex-direction: row;
    align-items: flex-start;
  }
  .info-section.reverse {
    flex-direction: row-reverse;
  }
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 600px) {
  .details-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.detail-card {
  background: var(--surface-light);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  border-color: var(--primary-light);
}

.detail-title {
  color: var(--primary);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.detail-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.info-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.info-image {
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
}

.info-image:hover {
  transform: scale(1.02);
}

.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
  margin: 3rem 0;
}

.title-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
}
</style>
