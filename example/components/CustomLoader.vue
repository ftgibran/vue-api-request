<template>
  <div :style="{color: this.color}">
    <i class="fa fa-refresh fa-spin"></i>
    <strong>Loading...</strong>
  </div>
</template>

<script>
  export default {
    props: ['color']
  }
</script>
