import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false,
    code: '',
    userInfo: ''
  },
  getters: {
    getLogin: state => state.isLogin,
    getCode: state => state.code
  },
  mutations: {
    setLogin(state, data) {
      state.isLogin = data
    },
    setCode(state, code) {
      state.code = code
    },
    setUserInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {
    getCode() {
      mpvue.login({
        success(res) {
          console.log(res)
        }
      })
    }
  }
})
