// import { store } from 'quasar/wrappers'
// import { createStore } from 'vuex'
// import moduleexample from './moduleexample'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
// const userfile = {
//   actions: {},

//   mutations: {
//     loadinfile(data){
//       state.userlist = data
//     }
//   },

//   state: {
//     userlist:[]
//   },

//   getters: {}
// }
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      userfiledata: []
    };
  },
  mutations: {
    ADDing(state, status) {
      state.userfiledata = status;
    },
    // SETLoading(state, isLoading) {
    //   state.isLoading = isLoading;
    // }
  },
  actions: {
    add(context, status) {
      context.commit("ADDing", status);
    },
  },
  getters: {
    userdata(state) {
      return state.userfiledata;
    },
  },
});

// export default store(function (/* { ssrContext } */) {
//   const Store = createStore({
//     modules: {
//       moduleexample,// example
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode and --debug builds only
//     strict: process.env.DEBUGGING
//   })

//   return Store
// })
