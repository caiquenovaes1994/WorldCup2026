<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="navbar-brand">
        <img src="/Logo_copa_2026.png" alt="World Cup 2026 Logo" class="brand-logo" />
        <span class="full">Copa do Mundo 2026</span>
        <span class="short">WC 2026</span>
      </RouterLink>
      <div class="navbar-links">
        <RouterLink to="/" class="nav-link">
          🏠 Início
        </RouterLink>
        <RouterLink to="/grupos" class="nav-link">
          📋 Grupos
        </RouterLink>
        <RouterLink to="/mata-mata" class="nav-link">
          ⚔️ Mata-Mata
        </RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />
</template>
