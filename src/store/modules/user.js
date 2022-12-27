import {
  getList,
  show,
  updatePoint,
  remove,
  cancelRemove,
  updateStatus,
  download
} from '@/services/user.service'

const initialState = {
  list: null,
  pagination: null,
  detail: null,
  userIds: null
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
  },
  SET_IDS (state, payload) {
    state.userIds = payload
  }
}

const actions = {
  getList ({ commit }, params = {}) {
    return getList(params).then(res => {
      commit('SET_LIST', res.data)
      commit('SET_PAGINATION', res.pagination)
      commit('SET_IDS', res.data.map(x => x.id))

      return res
    }).catch(err => {
      return err.response.data
    })
  },

  getUserByID ({ commit }, [id, params = {}]) {
    return show(id, params).then(res => {
      commit('SET_DETAIL', res.data)

      return res
    }).catch(_ => {
      return false
    })
  },

  updatePointUser ({ commit }, [id, params]) {
    return updatePoint(id, params).then(_ => {
      return true
    }).catch(_ => {
      return false
    })
  },

  removeUser ({ commit }, id) {
    return remove(id).then(_ => {
      return true
    }).catch(_ => {
      return false
    })
  },

  cancelRemoveUser ({ commit }, id) {
    return cancelRemove(id).then(_ => {
      return true
    }).catch(_ => {
      return false
    })
  },

  uploadStatusUser ({ commit }, [id, params]) {
    return updateStatus(id, params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  downloadCSV ({ commit }, params = {}) {
    return download(params).then(res => {
      return res
    }).catch(err => {
      return err
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
