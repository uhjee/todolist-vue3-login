import AuthService from '@/services/auth.service';
import { Module } from 'vuex';
import { LoggedUser, LoginUser, User } from '@/types/User';
import { ResponseEntity } from '@/types/ResponseEntity';

const userInfo = (() => localStorage.getItem('user'))();

interface InitialState {
  status: { loggedIn: boolean };
  user: string | null;
  // user: User | null;
}

const initialState: InitialState = userInfo
  ? {
    status: { loggedIn: true },
    user: userInfo,
  }
  : {
    status: { loggedIn: false },
    user: null,
  };

const auth: Module<InitialState, any> = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user: LoginUser) {
      try {
        // service 사용해 api 요청
        const loggedUser: LoggedUser = await AuthService.login(user);
        commit('loginSuccess', loggedUser);
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
    register({ commit }, user: User): Promise<ResponseEntity> {
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
