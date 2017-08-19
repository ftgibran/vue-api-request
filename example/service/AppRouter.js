import Vue from 'vue'
import Router from 'vue-router'
import Example from '../components/Example.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'example',
      component: Example
    }
  ]
})
