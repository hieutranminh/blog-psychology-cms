import { ApiService } from './api.service'

const BaseUrl = 'upload-image'

export function uploadImage (params = {}) {
  return ApiService.post(`${BaseUrl}`, params).then(resp => resp.data)
}
