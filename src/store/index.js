import Vue from 'vue'
import Vuex from 'vuex'

// MODULE
import loader from './modules/loader'
import auth from './modules/auth'
import setting from './modules/setting'
import postTeam from './modules/posts-team'
import postKnowledge from './modules/posts-knowledge'
import admin from './modules/admin'
import news from './modules/news'

const modules = {
  loader,
  auth,
  setting,
  postTeam,
  postKnowledge,
  admin,
  news
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
