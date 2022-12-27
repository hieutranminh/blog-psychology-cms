import Vue from 'vue'
import Vuex from 'vuex'

// MODULE
import loader from './modules/loader'
import auth from './modules/auth'
import admin from './modules/admin'
import dashboard from './modules/dashboard'
import news from './modules/news'
import user from './modules/user'

const modules = {
  loader,
  auth,
  admin,
  dashboard,
  news,
  user
}

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
  strict: debug
})
