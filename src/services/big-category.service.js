import { ApiService } from './api.service'

const BaseUrl = 'big_categories'

export function getList (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function getListSort (params = {}) {
  return ApiService.get(`${BaseUrl}/show_sort`, params).then((resp) => resp.data)
}

export function create (params = {}) {
  return ApiService.post(`${BaseUrl}`, {}).then((resp) => resp.data)
}

export function show (id, params = {}) {
  return ApiService.get(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
}

export function edit (id, params = {}) {
  return ApiService.put(`${BaseUrl}/${id}`, params).then((resp) => resp)
}

export function editSort (params = {}) {
  return ApiService.post(`${BaseUrl}/update_sort`, params).then((resp) => resp)
}

export function remove (id, params = {}) {
  return ApiService.delete(`${BaseUrl}/${id}`, params).then((resp) => resp)
}
