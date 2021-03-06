import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
