import Vue from 'vue'
import VueResource from 'vue-resource'
import axios from 'axios'

Vue.use(VueResource)

export default {
  foo: (param1, param2) => () => Vue.$http.get('//api.dev/foo', {param1, param2}),
  bar: (params) => Vue.$http.get('//api.dev/bar', params),
  foobar: () => Vue.$http.post('//api.dev/foobar').then(resp => { /* Some middle action */ }),
  foofoo: () => axios.get('//api.dev/foobar').then(resp => { /* Some middle action */ }),
  testSuccess: (params) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(`Param1: ${params.foo}, Param2: ${params.bar}`), 2000)
    })
  },
  testFail: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject({message: 'Something went wrong'}), 4000)
    })
  }
}
