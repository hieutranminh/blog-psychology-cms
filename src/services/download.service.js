import { ApiService } from './api.service'

const BaseUrl = 'export'

export function dataContact (params = {}, header = {}, responseType = 'blob') {
  return ApiService.get(`${BaseUrl}/contacts`, params, header, responseType).then(resp => resp)
}
