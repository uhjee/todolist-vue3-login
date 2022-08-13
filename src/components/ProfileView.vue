<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { LoggedUser } from '@/types/User';
import gravatar from 'gravatar';

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
      <div class="header-inner-box">
        <img class="profile-img" :src="gravatar.url(currentUser.email, {s: '28px', d: 'retro'})"
             alt=""/>
        <h3>
          <strong>{{ currentUser.name }}</strong> Profile
        </h3>
      </div>
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

<style lang="scss" scoped>
.header-inner-box {
  display: flex;

  & > * {
    margin-right: 6px;
  }

  .profile-img {
    width: 30px;
    height: 30px;
  }
}
</style>
