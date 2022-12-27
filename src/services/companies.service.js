import { ApiService } from './api.service'

const BaseUrl = 'companies'

export function getList (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then(resp => resp.data)
}

export function show (id) {
  return ApiService.get(`${BaseUrl}/${id}`, {}).then(resp => resp.data)
}

export function create (params = {}) {
  return ApiService.post(`${BaseUrl}`, params).then(resp => resp.data)
}

export function edit (id, body = {}) {
  return ApiService.put(`${BaseUrl}/${id}`, body).then(resp => resp.data)
}

export function remove (id) {
  return ApiService.delete(`${BaseUrl}/${id}`, {}).then(resp => resp)
}
