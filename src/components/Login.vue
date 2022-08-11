<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" alt=""
           id="profile-img"/>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control"/>
          <ErrorMessage name="username" class="error-feedback"/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="text" class="form-control"/>
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

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import yup from 'yup';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface LoginUser {
  username?: string;
  password?: string;
}

export default defineComponent({
  name: 'LoginComp',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    // vuex store
    const store = useStore();
    const router = useRouter();

    const loading = ref<boolean>(false);
    const message = ref<string>('');

    // yup 을 통한 validation schema
    const schema = yup.object()
      .shape({
        name: yup.string()
          .required('Username is required!'),
        password: yup.string()
          .required('Password is required!')
      });

    const loggedIn = computed(() => store.state.auth.status.loggedIn);

    // 로그인된 유저라면 route to 'profile'
    onMounted(
      () => {
        if (loggedIn.value) {
          router.push('/profile');
        }
      },
    );

    const handleLogin = async (user: LoginUser) => {
      loading.value = true;
      try {
        await store.dispatch('auth/login', user);
        await router.push('/profile');
      } catch (error: any) {
        loading.value = false;
        message.value = (error?.response?.data?.message) || error.message || error.toString();
      }
    };

    // expose to template and other options API hooks
    return {
      loading,
      message,
      schema,
      handleLogin,
    };
  },
});

</script>
