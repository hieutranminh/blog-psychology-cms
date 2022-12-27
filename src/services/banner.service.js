import { ApiService } from './api.service'

const baseUrl = '/banners'

export function getList (params = {}) {
  return ApiService.get(`${baseUrl}`, params).then((resp) => resp.data)
}

export function createBanner (params = {}) {
  return ApiService.post(`${baseUrl}`, params).then((resp) => resp.data)
}

export function updateBanner (id, params = {}) {
  return ApiService.post(`${baseUrl}/${id}`, params).then((resp) => resp.data)
}

export function getBannerById (id) {
  return ApiService.get(`${baseUrl}/${id}`).then((resp) => resp.data)
}

export function deleteBanner (id) {
  return ApiService.delete(`${baseUrl}/${id}`).then((resp) => resp.data)
}

export function sortBanner (ids = []) {
  return ApiService.put(`${baseUrl}/sort`, { ids }).then((resp) => resp.data)
}
