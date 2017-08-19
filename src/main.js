import Vue from 'vue'
import App from './App.vue'
import AppRouter from './service/AppRouter'
import AppResource from './service/AppResource'
import VueApiRequest from './index'
import { TweenLite, Power2 } from 'gsap'
import CustomLoader from './components/CustomLoader.vue'
import 'font-awesome/css/font-awesome.css'

VueApiRequest.setAPI(AppResource)

VueApiRequest.addLoader('CustomLoader', CustomLoader)

VueApiRequest.addEffect('blur', (el) => {
  el.style.filter = 'blur(20px)'
  TweenLite.to(el, 1, {
    filter: 'blur(0)',
    ease: Power2.easeOut
  })
})

let options = {
  effect: 'zoomIn',
  spinner: 'moonLoader',
  spinnerColor: '#FC6094',
  onSuccess: resp => {
    console.log('Success', resp)
  },
  onError: resp => {
    console.log('Error', resp)
    alert(`Error: ${resp.message}`)
  }
}

Vue.use(VueApiRequest, options)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: AppRouter,
  template: '<App/>',
  components: {App}
})
