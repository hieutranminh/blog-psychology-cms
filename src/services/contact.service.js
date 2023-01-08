import { ApiService } from './api.service'

const BaseUrl = 'contacts'

export function getList (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function show (id, params = {}) {
  return ApiService.get(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
}

export function edit (id, body = {}) {
  return ApiService.put(`${BaseUrl}/${id}`, body).then((resp) => resp)
}

export function remove (id) {
  return ApiService.delete(`${BaseUrl}/${id}`, {}).then((resp) => resp)
}
