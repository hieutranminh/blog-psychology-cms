import { ApiService } from '@/services/api.service'

const Baseurl = '/advertise-ranking'

export function clear (categoryId, rank) {
  return ApiService.delete(`${Baseurl}/${categoryId}/${rank}`).then(resp => resp.data)
}

export function detail (categoryId, rank, params = {}) {
  return ApiService.get(`${Baseurl}/${categoryId}/${rank}`, params).then(resp => resp.data)
}

export function update (categoryId, rank, params = {}) {
  return ApiService.post(`${Baseurl}/${categoryId}/${rank}`, params).then(resp => resp.data)
}
