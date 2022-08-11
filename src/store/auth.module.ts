import AuthService from '@/services/auth.service';
import { Module } from 'vuex';

const userInfo = (() => localStorage.getItem('user'))();

const initialState = userInfo
  ? {
    status: { loggedIn: true },
    user: userInfo,
  }
  : {
    status: { loggedIn: false },
    user: null,
  };

const auth: Module<any, any> = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user: any) {
      try {
        // service 사용해 api 요청
        const { user: loggedUser } = await AuthService.login(user);
        commit('loginSuccess', user);
        return loggedUser;
      } catch (e) {
        commit('loginFailure');
        return e;
      }
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user)
        .then(
          (response) => {
            commit('registerSuccess');
            return Promise.resolve(response.data);
          },
          (error) => {
            commit('registerFailure');
            return Promise.reject(error);
          },
        );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};

export default auth;
