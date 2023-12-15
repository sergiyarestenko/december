<template>
  <select
    :value="modelValue"
    @change="changeOption"
  >
    <option
      disabled
      value=""
    >
      Выберите из списка
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
  type IOptions = {
    name: string
    value: string | number
  }

  export default {
    name: 'MySelect',
    props: {
      modelValue: {
        type: String
      },
      options: {
        type: Array as () => IOptions[],
        default: () => []
      }
    },
    methods: {
      changeOption(event: any) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<style scoped></style>
