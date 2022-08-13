<script setup lang="ts">
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { User } from '@/types/User';
import { ResponseEntity, ResponseStatus } from '@/types/ResponseEntity';

const router = useRouter();
const store = useStore();

const successful = ref<boolean>(false);
const loading = ref<boolean>(false);
const message = ref<string>('');

const loggedIn = computed(() => store.state.auth.status.loggedIn);

onMounted(() => {
  if (loggedIn.value) {
    router.push('/profile');
  }
});

const handleRegister = async (user: User) => {
  message.value = '';
  successful.value = false;
  loading.value = true;
  try {
    const { _statusCode } = await store.dispatch('auth/register', user);
    if (_statusCode === ResponseStatus.OK) {
      message.value = `${user.name}님, 회원가입에 성공하였습니다.`;
      successful.value = true;
      loading.value = false;
    }
  } catch (error: any) {
    loading.value = false;
    successful.value = false;
    message.value = error?.response?.data?.message || error.message || error.toString();
  }
};

const schema = yup.object()
  .shape({
    name: yup.string()
      .required('Name is required!')
      .min(3, 'Must be at least 3 characters!')
      .max(20, 'Must be maximum 20 characters!'),
    email: yup.string()
      .required('Email is required!')
      .email('Email is invalid!')
      .max(50, 'Must be maximum 50 characters!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Must be at least 6 characters!')
      .max(40, 'Must be maximum 40 characters!'),
    role: yup.string()
      .required('Role is required!'),
  });

</script>

<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt=""
           class="profile-img-card"/>
      <Form @submit="handleRegister" :validation-schema="schema" ref="registerForm">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Username</label>
            <Field name="name" type="text" class="form-control"/>
            <ErrorMessage name="name" class="error-feedback"/>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control"/>
            <ErrorMessage name="email" class="error-feedback"/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control"/>
            <ErrorMessage name="password" class="error-feedback"/>
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <Field name="role" type="text" class="form-control"/>
            <ErrorMessage name="role" class="error-feedback"/>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Sign up
            </button>
          </div>
        </div>
      </Form>
      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
        <div v-if="successful" >
          <router-link to="/login">
            <font-awesome-icon icon="sign-in-alt"/>
            Login
          </router-link>
        </div>
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
