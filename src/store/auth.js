export const auth = {
  namespaced: true,

  state: {
    authModalShow: false,
  },
  mutations: {
    toggleAuthModalShow: (state) => {
      state.authModalShow = !state.authModalShow;
    },
  },

  actions: {
    toggleAuthModalShow: (ctx) => {
      ctx.commit("toggleAuthModalShow");
    },
  },

  getters: {
    getAuthModalShow: (state) => {
      return state.authModalShow;
    },
  },
};
