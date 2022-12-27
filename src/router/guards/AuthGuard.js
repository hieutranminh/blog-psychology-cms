import store from '@/store'

export const AuthGuard = async (to, from, next) => {
  if (!store.state.auth.token) {
    return next({ name: 'login' })
  }

  if (!store.state.auth.profile) {
    await store.dispatch('auth/userProfile')
    return PermissionGuard(to, from, next)
  }
  next()
}

const PermissionGuard = (to, from, next) => {
  if ('permissions' in to.meta && !to.meta.permissions.includes(store.state.auth.profile.role)) {
    return next({ name: 'error.403' })
  }
  next()
}
