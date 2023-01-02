import store from '@/store'

export const AuthGuard = async (to, from, next) => {
  if (!store.state.auth.token) {
    return next({ name: 'login' })
  }

  if (!store.state.auth.profile) {
    await store.dispatch('auth/userProfile')
  }
  next()
}
