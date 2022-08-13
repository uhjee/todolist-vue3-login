<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { LoginUser } from '@/types/User';

// vuex store
const store = useStore();
const router = useRouter();

const loading = ref<boolean>(false);
const message = ref<string>('');

const loggedIn = computed<boolean>(() => store.state.auth.status.loggedIn);

// 로그인된 유저라면 route to 'profile'
onMounted(() => {
  if (loggedIn.value) {
    router.push('/profile');
  }
});

const handleLogin = async (user: LoginUser) => {
  loading.value = true;
  try {
    await store.dispatch('auth/login', user);
    await router.push('/profile');
  } catch (error: any) {
    loading.value = false;
    message.value = error?.response?.data?.message || error.message || error.toString();
  }
};

// yup 을 통한 validation schema
const schema = yup.object()
  .shape({
    email: yup.string()
      .email()
      .required('Email is required!'),
    password: yup.string()
      .required('Password is required!')
      .min(6),
  });

// expose to template and other options API hooks
// return {
//   loading,
//   message,
//   schema,
//   handleLogin,
// };
</script>

<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
        alt=""
        id="profile-img"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="text" class="form-control"/>
          <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control"/>
          <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-top: 10px;

}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;

}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;

}

.error-feedback {
  color: red;

}
</style>
