import AboutPage from '@/pages/AboutPage.vue'
import MainPage from '@/pages/MainPage.vue'
import PostPage from '@/pages/PostPage.vue'
import PostIdPage from '@/pages/PostIdPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
