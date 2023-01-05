import {
  getSetting,
  updateSetting
} from '@/services/setting.service'

const initialState = {
  setting: {}
}
export const state = { ...initialState }

const getters = {}

const mutations = {
  SET_SETTING (state, payload) {
    state.setting = payload
  }
}

const actions = {
  getSetting ({ commit }, params = {}) {
    return getSetting(params).then((res) => {
      commit('SET_SETTING', res.data)
      return res
    }).catch(err => {
      return err
    })
  },

  updateSetting ({ commit }, body = {}) {
    return updateSetting(body).then(_ => {
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
