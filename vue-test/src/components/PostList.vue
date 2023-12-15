<template>
  <div v-if="posts.length > 0">
    <h5>user list</h5>
    <transition-group name="user-list">
      <post-item
        v-for="post in posts"
        :key="post.id as string"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <div v-if="posts.length <= 0">
    <h3>no users</h3>
  </div>
</template>
<script lang="ts">
  import PostItem from '@/components/PostItem.vue'
  import type { IPost } from './types'

  export default {
    components: {
      PostItem
    },
    props: {
      posts: {
        type: Array<IPost>,
        default: () => [],
        required: true
      }
    }
  }
</script>

<style scoped>
  .user-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .user-list-enter-active,
  .user-list-leave-active {
    transition: all 0.4s ease;
  }
  .user-list-enter-from,
  .user-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .user-list-move {
    transition: transform 0.4s ease;
  }
</style>
