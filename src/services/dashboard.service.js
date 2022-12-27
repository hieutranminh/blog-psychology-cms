import { ApiService } from './api.service'

const BaseUrl = 'dashboard'

export function getStatistic (params = {}) {
  return ApiService.get(`${BaseUrl}/user-statistic`, params).then(resp => resp.data)
}

export function getOverBudget (params = {}) {
  return ApiService.get(`${BaseUrl}/over-budget`, params).then(resp => resp.data)
}
