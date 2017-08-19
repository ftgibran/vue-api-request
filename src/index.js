import ApiRequest from './components/ApiRequest.vue'

var api = {}

var module = {
  effects: [],
  loader: {},

  addEffect: function (name, func) {
    module.effects.push({name: name, func: func})
  },

  addLoader: function (name, component) {
    var obj = {}
    obj[name] = component
    Object.assign(module.loader, obj)
  },

  setAPI: function (obj) {
    api = obj
  },

  install: function (Vue, options) {
    var opt = options || {}

    Vue.api = api
    Vue.prototype.$api = api

    if (opt.effect) ApiRequest.props.effect.default = opt.effect
    if (opt.resp) ApiRequest.props.resp.default = opt.resp
    if (opt.spinner) ApiRequest.props.spinner.default = opt.spinner
    if (opt.spinnerColor) ApiRequest.props.spinnerColor.default = opt.spinnerColor
    if (opt.spinnerScale) ApiRequest.props.spinnerScale.default = opt.spinnerScale
    if (opt.spinnerPadding) ApiRequest.props.spinnerPadding.default = opt.spinnerPadding

    if (opt.onSuccess) ApiRequest.methods.successCallback = opt.onSuccess
    if (opt.onError) ApiRequest.methods.errorCallback = opt.onError

    ApiRequest.methods.customEffect = function (name, el) {
      var effect = module.effects.find(function (item) { return item.name === name })
      if (effect && typeof effect.func === 'function') {
        effect.func(el)
        return true
      }
      return false
    }

    Vue.component('ApiRequest', ApiRequest)
    Vue.options.components['ApiRequest'].mixin({components: module.loader})
  }
}

export default module
