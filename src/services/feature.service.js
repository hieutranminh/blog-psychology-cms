import { ApiService } from '@/services/api.service'

const baseUrl = '/features'

export function list (params = {}) {
  return ApiService.get(`${baseUrl}`, params).then((resp) => resp.data)
}

export function create (params = {}) {
  return ApiService.post(`${baseUrl}`, params).then((resp) => resp.data)
}

export function update (id, params = {}) {
  return ApiService.post(`${baseUrl}/${id}`, params).then((resp) => resp.data)
}

export function detail (id) {
  return ApiService.get(`${baseUrl}/${id}`).then((resp) => resp.data)
}

export function remove (id) {
  return ApiService.delete(`${baseUrl}/${id}`).then((resp) => resp.data)
}

export function sort (ids = []) {
  return ApiService.put(`${baseUrl}/sort`, { ids }).then((resp) => resp.data)
}
