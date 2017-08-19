<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Aldrich');

  #app {
    /*overflow-x: hidden;*/
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    margin: 0;
  }

  .v-api-logo {
    font-size: 32px;
    font-family: "Aldrich", sans-serif;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
</style>
