<template>
  <div>
    <h1>Это страница поста с ID = {{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PostIdPage'
  }
</script>

<style scoped></style>
