<template>
  <div class="api-request" :class="[animate]">

    <div class="spinner"
         v-if="state=='loading' && !hasLoadingSlot"
         :style="{padding: spinnerPadding, zoom: spinnerScale}"
    >
      <component v-if="spinner !== 'none'" :is="spinner" :color="spinnerColor"></component>
    </div>

    <slot name="loading" v-if="state=='loading'"></slot>

    <slot name="waiting" v-if="state=='waiting'"></slot>

    <slot name="success" v-if="state=='success'"></slot>

    <slot name="error" v-if="state=='error'"></slot>

    <slot name="loaded" v-if="state=='success' || state=='error'"></slot>

    <slot v-if="state=='success' && !hasWaitingSlot && !hasSuccessSlot"></slot>

  </div>
</template>

<style>
  .api-request .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .api-request .spinner .v-moon1 {
    width: auto !important;
    height: auto !important;
  }
</style>

<script>
  import 'animate.css'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import GridLoader from 'vue-spinner/src/GridLoader.vue'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
  import RiseLoader from 'vue-spinner/src/RiseLoader.vue'
  import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
  import RotateLoader from 'vue-spinner/src/RotateLoader.vue'
  import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
  import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
  import SquareLoader from 'vue-spinner/src/SquareLoader.vue'
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
  import SkewLoader from 'vue-spinner/src/SkewLoader.vue'
  import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
  import RingLoader from 'vue-spinner/src/RingLoader.vue'
  import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
  import DotLoader from 'vue-spinner/src/DotLoader.vue'

  export default {
    components: {
      PulseLoader,
      GridLoader,
      ClipLoader,
      RiseLoader,
      BeatLoader,
      SyncLoader,
      RotateLoader,
      FadeLoader,
      PacmanLoader,
      SquareLoader,
      ScaleLoader,
      SkewLoader,
      MoonLoader,
      RingLoader,
      BounceLoader,
      DotLoader
    },

    data () {
      return {
        animate: null,
        state: null, // waiting, loading, success, error
        response: {}
      }
    },

    props: {
      // Function type should return a promise and Object type must have these functions as values
      resource: {
        type: [Function, Object],
        required: true
      },
      params: null, // params to be add
      value: null, // v-model: response
      sync: null, // sync values that fetch request when it changes
      trigger: Boolean, // if true then it fetch
      onlyIf: { // condition to fetch
        type: Boolean,
        'default': true
      },
      effect: { // effect after load
        type: String,
        'default': 'fadeIn'
      },
      resp: { // default path response
        type: String,
        'default': '.'
      },
      spinner: { // type of spinner
        type: String,
        'default': 'ClipLoader'
      },
      spinnerColor: { // spinner color
        type: String,
        'default': '#42b983'
      },
      spinnerPadding: { // spinner padding
        type: [String, Number],
        'default': '1em'
      },
      spinnerScale: { // spinner scale
        type: Number,
        'default': 1
      }
    },

    computed: {
      hasLoadingSlot () {
        return this.$slots.hasOwnProperty('loading')
      },
      hasWaitingSlot () {
        return this.$slots.hasOwnProperty('waiting')
      },
      hasSuccessSlot () {
        return this.$slots.hasOwnProperty('success')
      },
      hasErrorSlot () {
        return this.$slots.hasOwnProperty('error')
      },
      hasLoadedSlot () {
        return this.$slots.hasOwnProperty('loaded')
      }
    },

    watch: {
      sync () {
        this.fetch()
      },

      trigger (val) {
        if (val) {
          this.fetch()
          this.$emit('update:trigger', false)
        }
      }
    },

    mounted () {
      if (this.trigger) this.$emit('update:trigger', false)
      if (this.hasWaitingSlot) this.waitingEvent()
      else this.fetch()
    },

    methods: {

      fetch (key = null) {
        if (!this.onlyIf) return

        // Go to loading state
        this.loadingEvent()

        let resources = []
        let keys = []
        let path = this.resp

        // if request is a single request then
        if (typeof this.resource === 'function') resources = [this.resource(this.params)]
        else if (key) {
          // if request has multiple requests and a specific key then
          keys.push(key)
          resources.push(this.resource[key](this.params))
        } else {
          // if request has multiple requests then
          for (let key in this.resource) {
            keys.push(key)
            resources.push(this.resource[key](this.params))
          }
        }

        Promise.all(resources).then(responses => {
          // if request has multiple requests then
          if (keys.length !== 0) responses.forEach((resp, i) => { this.response[keys[i]] = index(resp, path) })
          // if request is a single request then
          else responses.forEach(resp => { this.response = index(resp, path) })
          // Go to success state
          this.successEvent()
        }).catch(e => {
          // Go to error state
          this.errorEvent(e)
        })

        // Get Object by string dot notation
        function index (obj, is, value) {
          if (!is || is === '.') return obj
          if (typeof is === 'string') return index(obj, is.split('.'), value)
          if (is.length === 1 && value !== undefined) {
            obj[is[0]] = value
            return value
          }
          if (is.length === 0) return obj
          return index(obj[is[0]], is.slice(1), value)
        }
      },

      waitingEvent () {
        this.state = 'waiting'
        this.$emit(this.state)
      },

      loadingEvent () {
        this.state = 'loading'
        this.$emit(this.state)
        this.animate = null
      },

      successEvent () {
        this.state = 'success'
        this.runEffect()
        this.$emit('input', this.response)
        this.$emit('loaded', this.response)
        this.$emit(this.state, this.response)
        this.successCallback(this.response)

        if (this.hasWaitingSlot && !this.hasSuccessSlot) this.waitingEvent()
      },

      errorEvent (e) {
        this.state = 'error'
        this.runEffect()
        this.$emit('loaded', e)
        this.$emit(this.state, e)
        this.errorCallback(e)

        if (this.hasWaitingSlot && !this.hasErrorSlot) this.waitingEvent()
      },

      runEffect () {
        let customEffect = this.customEffect(this.effect, this.$el)
        if (!customEffect) {
          this.animate = `animated ${this.effect}`
        }
      },

      successCallback (resp) {},
      errorCallback (resp) {},
      customEffect () { return null }

    }

  }
</script>
