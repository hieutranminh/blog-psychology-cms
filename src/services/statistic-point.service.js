import { ApiService } from './api.service'

const BaseUrl = 'statistic-point'

export function getList (params = {}) {
  return ApiService.get(`${BaseUrl}`, params).then(resp => resp.data)
}
