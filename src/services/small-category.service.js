import { ApiService } from './api.service'

const BaseUrl = 'categories'

export function getList (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then(resp => resp.data)
}

export function getAll (params = {}) {
  return ApiService.get(`${BaseUrl}/get-all`, params).then(resp => resp.data)
}

export function create (params = {}) {
  return ApiService.post(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function show (id, params = {}) {
  return ApiService.get(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
}

export function edit (id, params = {}) {
  return ApiService.put(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
}

export function remove (id, params = {}) {
  return ApiService.delete(`${BaseUrl}/${id}`, params).then((resp) => resp)
}

export function sort (ids = []) {
  return ApiService.put(`${BaseUrl}/sort`, { ids }).then((resp) => resp.data)
}
