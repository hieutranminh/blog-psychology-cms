import store from '@/store'

export const LoginGuard = (to, from, next) => {
  if (store.state.auth.token || store.state.auth.profile) {
    return next({ name: 'home' })
  }
  next()
}
