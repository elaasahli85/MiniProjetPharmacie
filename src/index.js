import { createRouter, createWebHistory } from 'vue-router';
import MedicamentList from './components/MedicamentList.vue';
import MedicamentAdd from './components/MedicamentAdd.vue';

const routes = [
  { path: '/', name: 'Home', component: MedicamentList },
  { path: '/add', name: 'AddMedicament', component: MedicamentAdd },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
