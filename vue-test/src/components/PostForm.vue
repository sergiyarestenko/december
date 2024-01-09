<template>
  <div>
    <h2>create post</h2>
    <form @submit.prevent>
      <my-input
        v-model="post.title"
        v-focus
        type="text"
        placeholder="title"
      />
      <hr />
      <my-input
        v-model="post.body"
        type="text"
        placeholder="body"
      />
      <hr />

      <my-button @click="createPost">Create</my-button>
    </form>
  </div>
</template>

<script lang="ts">
  import type { IPost } from './types'

  const post: IPost = {
    title: '',
    body: '',
    id: ''
  }

  export default {
    data() {
      return {
        post
      }
    },
    methods: {
      createPost() {
        this.post.id = Date.now().toString()
        this.$emit('create', this.post)
        this.post = {
          title: '',
          body: '',
          id: ''
        }
      }
    }
  }
</script>
