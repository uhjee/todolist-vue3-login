import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import TodolistView from '@/views/TodolistView.vue';
import TodolistWithoutLoginView from '@/views/TodolistWithoutLoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'todolist',
    component: TodolistWithoutLoginView,
  },
  {
    path: '/todos',
    component: TodolistWithoutLoginView,
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
