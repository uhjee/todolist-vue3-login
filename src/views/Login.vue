<template>
  <div class="login-container">
    <form class="login-box">
      <label for="userId">
        <input id="userId" type="text"/>
      </label>
      <label for="userPassword">
        <input id="userPassword" type="text"/>
      </label>
      <button @click="onLogin">로그인</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginComp',
  components: {},
  setup() {
    const onLogin = () => {
      console.log('login했더라고');
    };
    return { onLogin };
  },
});
</script>

<style lang="scss">
.login-container {
  height: calc(100vh - 230px);

  .login-box {

    input {
      border: 1px solid darkgray;
      border-radius: 4px;
    }

    button {
      border: 1px solid #42b983;
      background-color: #3abb84;
      color: #fff;
      border-radius: 4px;
      width: 80px;
    }
  }
}
</style>
