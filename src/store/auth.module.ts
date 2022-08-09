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
};

export default auth;
