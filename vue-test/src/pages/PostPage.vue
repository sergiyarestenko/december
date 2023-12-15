<template>
  <div>
    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
      <!-- -->
    </div>
    <div>
      <my-input
        v-model="searchQuery"
        placeholder="Поиск...."
        @update:model-value="setSearchQuery"
      />
    </div>
    <div class="app__btns">
      <my-button @click="showDialog">Создать пользователя</my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
      <!-- @update:model-value="setSelectedSort" -->
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      v-if="!isPostsLoading"
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
    <p v-if="isPostsLoading">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus accusantium voluptatem aperiam
      similique temporibus, culpa nisi cupiditate quaerat quod, eaque animi facere ullam, saepe
      fugit. Officiis vitae tenetur corrupti delectus?
    </p>
    <div
      ref="observer"
      class="observer"
    />
  </div>
</template>
<script lang="ts">
  import PostForm from '@/components/PostForm.vue'
  import PostList from '@/components/PostList.vue'

  import type { IPost } from '@/components/types'
  import axios from 'axios'

  const posts: IPost[] = []
  const selectedSort: 'title' | 'body' = 'title'
  const page: number = 1
  const limit: number = 10
  const totalPages: number = 0

  export default {
    components: {
      PostList,
      PostForm
    },

    data() {
      return {
        posts,
        dialogVisible: false,
        isPostsLoading: false,
        selectedSort,
        sortOptions: [
          { value: 'title', name: 'title' },
          { value: 'body', name: 'body' }
        ],
        searchQuery: '',
        page,
        limit,
        totalPages
      }
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((a: IPost, b: IPost) => {
          const post1 = a[this.selectedSort]
          const post2 = b[this.selectedSort]
          return post1?.localeCompare(post2 as string)
        })
      },
      sortedAndSearchedPosts() {
        return this.sortedPosts.filter((post) => {
          return post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      }
    },
    mounted() {
      this.fetchPosts()
      const options = {
        rootMargin: '0px',
        threshold: 1.0
      }
      const callback = (entries: any) => {
        if (entries[0]?.isIntersecting && this.page < this.totalPages) {
          this.fetchMorePosts()
        }
      }
      const observer = new IntersectionObserver(callback, options)
      observer.observe(this.$refs.observer as HTMLElement)
    },
    methods: {
      createPost(newPost: IPost) {
        this.posts.push(newPost)
        this.dialogVisible = false
      },
      removePost(removingPost: IPost) {
        this.posts = this.posts.filter((p) => p.id !== removingPost.id)
      },
      showDialog() {
        this.dialogVisible = true
      },
      async fetchPosts() {
        try {
          this.isPostsLoading = true
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          })
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = response.data
        } catch (e) {
          console.error('fetchPosts', e)
        } finally {
          this.isPostsLoading = false
        }
      },
      async fetchMorePosts() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          })
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data]
          this.page += 1
        } catch (e) {
          console.error('fetchMorePosts', e)
        }
      },
      changePage(pageNumber: number) {
        this.page = pageNumber
        this.fetchMorePosts()
      },
      setSearchQuery() {}
    }
  }
</script>
<style>
  .app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }
  .page {
    border: 1px solid black;
    padding: 10px;
  }
  .current-page {
    border: 2px solid teal;
  }

  .observer {
    height: 30px;
    background: green;
  }
</style>
