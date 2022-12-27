import { ApiService } from './api.service'

const BaseUrl = 'advertises'

export function getList (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function show (id, params = {}) {
  return ApiService.get(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
}

export function create (params = {}) {
  return ApiService.post(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function edit (id, body = {}) {
  return ApiService.post(`${BaseUrl}/${id}`, body).then((resp) => resp.data)
}

export function remove (id) {
  return ApiService.delete(`${BaseUrl}/${id}`, {}).then((resp) => resp)
}
