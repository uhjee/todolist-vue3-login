<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { LoggedUser } from '@/types/User';

const store = useStore();
const router = useRouter();

const currentUser = computed<LoggedUser>(
  () => store.state.auth.user,
);

const accessTokenForView = computed<string>(() => {
  if (!currentUser.value) return '';
  const { accessToken } = currentUser.value;
  const frontTokenText = accessToken.substring(0, 20);
  const backTokenText = accessToken.substring(accessToken.length - 20);
  return `${frontTokenText} ... ${backTokenText}`;
});

// vuex에 user 정보가 없다면 로그인 화면으로 라우팅
onMounted(() => {
  if (!currentUser.value) {
    router.push('/login');
  }
});
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.name }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token: </strong>
      <span>
      {{
          accessTokenForView
        }}
      </span>
    </p>
    <p>
      <strong>Email: </strong>
      <span>{{ currentUser.email }}</span>
    </p>
    <p>
      <strong>Role: </strong>
      <span>{{ currentUser.role }}</span>
    </p>
  </div>
</template>
