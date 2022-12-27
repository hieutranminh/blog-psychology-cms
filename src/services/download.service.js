import { ApiService } from './api.service'

const BaseUrl = 'download'

export function dataGetPoint (params = {}, header = {}, responseType = 'blob') {
  return ApiService.get(`${BaseUrl}/get-point`, params, header, responseType).then(resp => resp)
}

export function dataExchangePoint (params = {}, header = {}, responseType = 'blob') {
  return ApiService.get(`${BaseUrl}/exchange-point`, params, header, responseType).then(resp => resp)
}

export function dataAdvertises (params = {}, header = {}, responseType = 'blob') {
  return ApiService.get(`${BaseUrl}/advertises`, params, header, responseType).then(resp => resp)
}
