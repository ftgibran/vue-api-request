import Vue from 'vue'
import App from './App.vue'
import AppRouter from './service/AppRouter'
import AppResource from './service/AppResource'
import VueApiRequest from './index'
import { TweenLite, Power2 } from 'gsap'

VueApiRequest.setAPI(AppResource)
VueApiRequest.addEffect('blur', (el) => {
  el.style.filter = 'blur(10px)'
  TweenLite.to(el, 0.5, {
    filter: 'blur(0)',
    ease: Power2.easeOut
  })
})

let options = {
  effect: 'lightSpeedIn',
  resp: '.',
  spinner: 'DotLoader',
  spinnerColor: '#364A5F',
  spinnerScale: 1.4,
  spinnerPadding: '2em',
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
