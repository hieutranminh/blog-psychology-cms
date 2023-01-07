import {
  getList,
  show,
  create,
  edit,
  remove
} from '@/services/posts.service'

const initialState = {
  list: [],
  pagination: {},
  detail: {}
}
export const state = { ...initialState }

const getters = {}

const mutations = {
  SET_LIST (state, payload) {
    state.list = payload
  },
  SET_PAGINATION (state, payload) {
    state.pagination = payload
  },
  SET_DETAIL (state, payload) {
    state.detail = payload
  }
}

const actions = {
  getList ({ commit }, params = {}) {
    return getList(params).then(res => {
      commit('SET_LIST', res.data)
      commit('SET_PAGINATION', res.pagination)

      return res
    }).catch(err => {
      return err.response.data
    })
  },

  getTeamByID ({ commit }, id) {
    return show(id).then(res => {
      commit('SET_DETAIL', res.data)

      return true
    }).catch(_ => {
      return false
    })
  },

  createTeam ({ commit }, body = {}) {
    return create(body).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  updateTeam ({ commit }, params) {
    const { id, body } = params

    return edit(id, body).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  removeTeam ({ commit }, id) {
    return remove(id).then(_ => {
      return true
    }).catch(_ => {
      return false
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
