import { ApiService } from './api.service'

const BaseUrl = 'admins'

export function getLists (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function getAdminByID (id) {
  return ApiService.get(`${BaseUrl}/${id}`, {}).then((resp) => resp.data)
}

export function createAdmin (params = {}) {
  return ApiService.post(`${BaseUrl}`, params).then((resp) => resp.data)
}

export function editAdmin (id, body = {}) {
  return ApiService.put(`${BaseUrl}/${id}`, body).then((resp) => resp.data)
}

export function deleteAdmin (id) {
  return ApiService.delete(`${BaseUrl}/${id}`, {}).then((resp) => resp)
}
