<template>
  <input
    :value="modelValue"
    class="input"
    type="text"
    :placeholder="placeholder"
    @input="updateInput"
  />
</template>

<script lang="ts">
  export default {
    name: 'MyInput',
    props: {
      modelValue: [String, Number],
      placeholder: String
    },
    methods: {
      updateInput(event: any) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<style scoped>
  .input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
  }
</style>
