<template>
  <div>

    <api-request
      :resource="$api.fakeRequestSuccess"
      v-model="resp"
      effect="blur"
      spinner="MoonLoader"
      :params="{foo: 'foo', bar: 'bar'}"
    >
      <img src="../assets/logo.png">
      <h2>Vue API Request</h2>
      Hello World!
    </api-request>

  </div>
</template>

<script>
  export default {
    name: 'Example',
    data () {
      return {
        resp: null
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
