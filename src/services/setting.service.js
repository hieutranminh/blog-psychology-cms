import { ApiService } from './api.service'

const BaseUrl = 'setting'

export function getSetting (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function updateSetting (body = {}) {
  return ApiService.post(`${BaseUrl}`, body).then((resp) => resp.data)
}
