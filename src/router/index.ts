import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/components/LoginView.vue';
import ProfileView from '@/components/ProfileView.vue';
import HomeView from '@/components/HomeView.vue';
import RegisterView from '@/components/RegisterView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/register',
    component: RegisterView,
  },
  {
    path: '/profile',
    name: 'Profile',
    // lazy-loaded
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
