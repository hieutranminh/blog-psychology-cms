import {
  getStatistic,
  getOverBudget
} from '@/services/dashboard.service'

const initialState = {
  detail: null,
  list: null,
  pagination: null
}
export const state = { ...initialState }

const getters = {}

const mutations = {
  SET_DETAIL (state, payload) {
    state.detail = payload
  },
  SET_LIST (state, payload) {
    state.list = payload
  },
  SET_PAGINATION (state, payload) {
    state.pagination = payload
  }
}

const actions = {
  getUserStatistic ({ commit }, params = {}) {
    return getStatistic(params).then(res => {
      commit('SET_DETAIL', res.data)

      return res
    }).catch(err => {
      return err.response.data
    })
  },

  getListOverBudget ({ commit }, params = {}) {
    return getOverBudget(params).then(res => {
      commit('SET_LIST', res.data)
      commit('SET_PAGINATION', res.pagination)

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
