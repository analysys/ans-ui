import Vue from 'vue'
import App from './app.vue'
import router from './router'
import '../lib/ans-ui.min.css'
import ans from '../lib/ans-ui.min.js'

Vue.use(ans)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted () {
    console.log('success')
  }
})
