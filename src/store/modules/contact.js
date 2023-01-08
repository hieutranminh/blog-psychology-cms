import {
  getList,
  show,
  edit,
  remove
} from '@/services/contact.service'

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

  getContactByID ({ commit }, { id, params }) {
    return show(id, params).then(res => {
      commit('SET_DETAIL', res.data)

      return true
    }).catch(_ => {
      return false
    })
  },

  updateContact ({ commit }, params) {
    const { id, body } = params

    return edit(id, body).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  removeContact ({ commit }, id) {
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
