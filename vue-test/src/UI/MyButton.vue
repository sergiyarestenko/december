<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script lang="ts">
  export default {
    name: 'MyButton'
  }
</script>

<style scoped>
  .btn {
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
  }
</style>
