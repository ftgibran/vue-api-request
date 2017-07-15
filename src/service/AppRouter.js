import Vue from 'vue'
import Router from 'vue-router'
import Doc from '@/components/Doc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Doc',
      component: Doc
    }
  ]
})
