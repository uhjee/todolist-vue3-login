import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './auth.module';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ['auth'],
    }),
  ],
});
