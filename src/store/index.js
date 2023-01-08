import Vue from 'vue'
import Vuex from 'vuex'

// MODULE
import loader from './modules/loader'
import auth from './modules/auth'
import setting from './modules/setting'
import posts from './modules/posts'
import postTeam from './modules/posts-team'
import postKnowledge from './modules/posts-knowledge'
import contact from './modules/contact'
import admin from './modules/admin'

const modules = {
  loader,
  auth,
  setting,
  posts,
  postTeam,
  postKnowledge,
  contact,
  admin
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
