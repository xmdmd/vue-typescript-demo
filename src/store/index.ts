import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'aaa',
  },
  mutations: {
    setTitle(state, title: string) {
      state.title = title;
    },
  },
  actions: {
  },
  modules: {
  },
});
