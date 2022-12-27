import { ApiService } from '@/services/api.service'

const Baseurl = '/category-ranking'

export function list (params = {}) {
  return ApiService.get(`${Baseurl}`, params).then(resp => resp.data)
}

export function remove (id) {
  return ApiService.delete(`${Baseurl}/${id}`).then(resp => resp)
}

export function detail (id, params) {
  return ApiService.get(`${Baseurl}/${id}`, params).then(resp => resp.data)
}

export function edit (id, params = {}) {
  return ApiService.post(`${Baseurl}/${id}`, params).then(resp => resp.data)
}
