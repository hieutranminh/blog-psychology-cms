import { ApiService } from './api.service'

const BaseUrl = 'users'

export function getList (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then(resp => resp.data)
}

export function show (id, params = {}) {
  return ApiService.get(`${BaseUrl}/${id}`, params).then(resp => resp.data)
}

export function create (params = {}) {
  return ApiService.post(`${BaseUrl}`, params).then(resp => resp.data)
}

export function updatePoint (id, body = {}) {
  return ApiService.put(`${BaseUrl}/edit-point/${id}`, body).then(resp => resp.data)
}

export function remove (id) {
  return ApiService.delete(`${BaseUrl}/${id}`).then(resp => resp)
}

export function updateStatus (id, params = {}) {
  return ApiService.put(`${BaseUrl}/update-status/${id}`, params).then(resp => resp.data)
}

export function cancelRemove (id) {
  return ApiService.put(`${BaseUrl}/cancel-delete/${id}`).then(resp => resp)
}

export function download (params = {}) {
  return ApiService.post(`${BaseUrl}/export`, params).then(resp => resp.data)
}
