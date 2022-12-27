import {
  getLists,
  getAdminByID,
  createAdmin,
  editAdmin,
  deleteAdmin
} from '@/services/admin.service'

const initialState = {
  list: [],
  detail: {},
  pagination: {}
}
export const state = { ...initialState }
const getters = {}

const mutations = {
  SET_ADMIN_ACCOUNT (state, payload) {
    state.list = payload
  },
  SET_PAGINATION (state, payload) {
    state.pagination = payload
  },
  SET_ADMIN (state, payload) {
    state.detail = payload
  },
  ADD_ADMIN (state, payload) {
    state.list.push(payload)
  },
  EDIT_ADMIN (state, payload) {
    const index = state.list.findIndex((p) => p.id === payload.id)
    if (index > -1) {
      state.list[index] = payload
    }
  },
  DELETE_ADMIN (state, adminID) {
    const index = state.list.findIndex((p) => p.id === adminID)
    if (index > -1) {
      state.list.splice(index, 1)
    }
  }
}

const actions = {
  getLists ({ commit }, params = {}) {
    return getLists(params).then((res) => {
      commit('SET_ADMIN_ACCOUNT', res.data)
      commit('SET_PAGINATION', res.pagination)

      return true
    }).catch(_ => {
      return false
    })
  },

  getAdminByID ({ commit }, id) {
    return getAdminByID(id).then((res) => {
      commit('SET_ADMIN', res.data)

      return true
    }).catch(_ => {
      return false
    })
  },

  createAdmin ({ commit }, body = {}) {
    return createAdmin(body).then((res) => {
      commit('ADD_ADMIN', res.data)
      return res
    }).catch(_ => {
      return _.response
    })
  },

  editAdmin ({ commit }, [id, body = {}]) {
    return editAdmin(id, body).then((res) => {
      commit('EDIT_ADMIN', res.data)

      return true
    }).catch(_ => {
      return _.response
    })
  },

  deleteAdmin ({ commit }, id) {
    return deleteAdmin(id).then((res) => {
      commit('DELETE_ADMIN', id)

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
