import { ApiService } from './api.service'

const BaseUrl = 'files'

export function uploadImage (params = {}) {
  return ApiService.post(`${BaseUrl}/upload`, params).then(resp => resp.data)
}
