import { ApiService } from './api.service'

const BaseUrl = 'auth'

export function login (params = {}) {
  return ApiService.post(`${BaseUrl}/login`, params).then((resp) => resp)
}

export function logout (params = {}) {
  return ApiService.delete(`${BaseUrl}/logout`, params).then((resp) => resp.data)
}

export function profile (params = {}) {
  return ApiService.get(`${BaseUrl}/profile`).then((resp) => resp.data)
}

export function checkToken (params = {}) {
  return ApiService.get(`${BaseUrl}/check-token`, params).then((resp) => resp)
}

export function forgotPW (params = {}) {
  return ApiService.post(`${BaseUrl}/forgot-password`, params).then((resp) => resp.data)
}

export function resetPW (params = {}) {
  return ApiService.post(`${BaseUrl}/reset-password`, params).then((resp) => resp.data)
}
