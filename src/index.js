import ApiRequest from './components/ApiRequest.vue'

var api = {}

var module = {
  effects: [],

  addEffect: function (name, func) {
    module.effects.push({name: name, func: func})
  },

  setAPI: function (obj) {
    api = obj
  },

  install: function (Vue, options) {
    Vue.$api = api
    Vue.prototype.$api = api

    if (options.effect) ApiRequest.props.effect.default = options.effect
    if (options.resp) ApiRequest.props.resp.default = options.resp
    if (options.spinner) ApiRequest.props.spinner.default = options.spinner
    if (options.spinnerColor) ApiRequest.props.spinnerColor.default = options.spinnerColor
    if (options.spinnerScale) ApiRequest.props.spinnerScale.default = options.spinnerScale
    if (options.spinnerPadding) ApiRequest.props.spinnerPadding.default = options.spinnerPadding

    if (options.onSuccess) ApiRequest.methods.successCallback = options.onSuccess
    if (options.onError) ApiRequest.methods.errorCallback = options.onError

    ApiRequest.methods.customEffect = function (name, el) {
      var effect = module.effects.find(function (item) { return item.name === name })
      if (effect && typeof effect.func === 'function') {
        effect.func(el)
        return true
      }
      return false
    }

    Vue.component('ApiRequest', ApiRequest)
  }
}

export default module
