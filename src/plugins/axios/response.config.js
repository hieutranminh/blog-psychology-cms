import router from '@/router'
import store from '@/store'

// Config Response Interceptor
export const axiosInterceptorResponseConfig = (response) => {
  store.dispatch('loader/done')
  return response
}

// Config Response Error Interceptor
export const axiosInterceptorResponseError = (error) => {
  const { status } = error.response

  // Redirect to Error Page
  if (status === 401) {
    store.commit('auth/SET_LOGOUT')
    router.push({ name: 'login' }).catch(_ => {})
  }
  if (status === 404) router.push({ name: 'error.404' })
  if (status === 500) router.push({ name: 'error.500' })
  store.dispatch('loader/done')
  return Promise.reject(error)
}
