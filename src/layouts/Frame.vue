<template>
  <div class="frame">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <HeaderComp v-if="!currentComponentName === 'loginComp'"/>
    <component :is="currentComponent"></component>
    <FooterComp v-if="!currentComponentName === 'loginComp'"/>
  </div>
</template>

<script lang="ts">
import {
  computed, defineAsyncComponent, defineComponent, reactive, ref,
} from 'vue';
import HeaderComp from '@/components/Header.vue';
import FooterComp from '@/components/Footer.vue';
import LoginComp from '@/views/Login.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderComp,
    FooterComp,
    LoginComp,
  },
  setup() {
    const currentComponentName = ref('loginComp');

    const currentComponent = computed(() => {
      if (currentComponentName.value === 'loginComp') {
        return defineAsyncComponent(() => import('@/views/Login.vue'));
      }
      return defineAsyncComponent(() => import('@/views/Login.vue'));
    });
    return {
      currentComponentName,
      currentComponent,
    };
  },
});
</script>
