<script setup lang="ts">

import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import gravatar from 'gravatar';
import { LoggedUser } from '@/types/User';

const router = useRouter();
const store = useStore();

const currentUser = computed<LoggedUser>(() => store.state.auth.user);
const isAdminRole = computed<boolean>(() => currentUser.value?.role === 'ADMIN');

const logOut = () => {
  store.dispatch('auth/logout');
  router.push('/login');
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">TodoList</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home"/>
            Home
          </router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus"/>
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt"/>
            Login
          </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <img class="profile-img" :src="gravatar.url(currentUser.email, {s: '28px', d: 'retro'})"
                 alt=""/>
            {{ currentUser.name }}
          </router-link>
        </li>
        <li class="nav-item">
          <a @click.prevent="logOut" @keydown.prevent="logOut" class="nav-link logout-item">
            <font-awesome-icon icon="sign-out-alt"/>
            LogOut
          </a>
        </li>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.logout-item {
  cursor: pointer;
}

.profile-img {
  width: 28px;
  height: 28px;
  margin-right: 6px;
}
</style>
