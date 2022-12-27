import { ApiService } from './api.service'

const BaseUrl = '/pickups'

export function List (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function detail (id, params = {}) {
  return ApiService.get(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
}

export function create (params = {}) {
  return ApiService.post(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function update (id, params = {}) {
  return ApiService.put(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
}

export function remove (id) {
  return ApiService.delete(`${BaseUrl}/${id}`).then((resp) => resp.data)
}

export function sort (ids = []) {
  return ApiService.put(`${BaseUrl}/sort`, { ids }).then((resp) => resp.data)
}
