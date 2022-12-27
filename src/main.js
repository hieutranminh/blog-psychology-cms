import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* ============
 * CSS Default
 * ============
 */
// Styling
import './assets/scss/main.scss'

/* ============
 * Plugins
 * ============
 */
import i18n from './plugins/i18n'
import './plugins/validation'
import './plugins/ant-design'

/* ============
 * Utils
 * ============
 */
import './utils/filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
