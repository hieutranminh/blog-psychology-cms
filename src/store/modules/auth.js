import {
  login,
  logout,
  profile,
  forgotPW,
  resetPW,
  checkToken
} from '@/services/auth.service'
import Cookie from 'js-cookie'

const initialState = {
  token: Cookie.get('dmk_cms_token'),
  profile: null
}

export const state = { ...initialState }

const getters = {
  roleName: state => (state.profile && state.profile.role) || ''
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
    Cookie.set('dmk_cms_token', payload)
  },
  SET_LOGOUT (state) {
    state.token = null
    state.profile = null
    Cookie.remove('dmk_cms_token')
  },
  SET_USER (state, payload) {
    state.profile = payload
  }
}

const actions = {
  userLogin ({ commit, dispatch }, params = {}) {
    return login(params).then((res) => {
      commit('SET_TOKEN', res.data.access_token)

      return res
    }).catch(err => {
      return err.response.data
    })
  },
  userLogout ({ commit }) {
    return logout().then(_ => {
      commit('SET_LOGOUT')

      return true
    }).catch(_ => {
      return false
    })
  },
  userProfile ({ commit }) {
    return profile().then((res) => {
      commit('SET_USER', res.data)

      return true
    }).catch(_ => {
      return false
    })
  },
  checkTokenExpired ({ commit }, params = {}) {
    return checkToken(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },
  forgotPassword ({ commit }, params = {}) {
    return forgotPW(params).then((res) => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },
  resetPassword ({ commit }, params = {}) {
    return resetPW(params).then(res => {
      commit('SET_TOKEN', res.data.access_token)
      return res
    }).catch(err => {
      return err.response.data
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
