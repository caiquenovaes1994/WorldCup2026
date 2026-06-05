import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/grupos',
      name: 'groups',
      component: () => import('../views/GroupsView.vue'),
    },
    {
      path: '/mata-mata',
      name: 'knockout',
      component: () => import('../views/KnockoutView.vue'),
    },
    {
      path: '/estadios',
      name: 'venues',
      component: () => import('../views/VenuesView.vue'),
    },
    {
      path: '/arbitros',
      name: 'referees',
      component: () => import('../views/RefereesView.vue'),
    },
    {
      path: '/convocados',
      name: 'squads',
      component: () => import('../views/SquadsView.vue'),
    },
    {
      path: '/sobre-torneio',
      name: 'tournament-info',
      component: () => import('../views/TournamentInfoView.vue'),
    },
    {
      path: '/estatisticas',
      name: 'statistics',
      component: () => import('../views/StatisticsView.vue'),
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
