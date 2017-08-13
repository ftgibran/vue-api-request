<template>
  <div :style="{color: this.color}">
    <strong>Loading...</strong>
  </div>
</template>

<script>
  export default {
    props: ['color']
  }
</script>
