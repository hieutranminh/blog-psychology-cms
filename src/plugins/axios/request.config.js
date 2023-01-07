import Cookie from 'js-cookie'
import store from '@/store'

// Config Axios
export const axiosConfig = {
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'App-Locale': 'vi'
  },
  timeout: 30000 // request timeout
}

// Config Request Interceptor
export const axiosInterceptorRequestConfig = (config) => {
  if (Cookie.get('bearer_cms_token')) {
    config.headers.Authorization = `Bearer ${Cookie.get('bearer_cms_token')}`
  }

  // eslint-disable-next-line no-prototype-builtins
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }

  store.dispatch('loader/pending')
  return config
}

// Config Request Error Interceptor
export const axiosInterceptorRequestError = (error) => {
  store.dispatch('loader/done')
  return Promise.reject(error)
}
