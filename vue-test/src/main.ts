import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import components from '@/UI'
import router from '@/router/router'
import directives from '@/directives/index'

const pinia = createPinia()
const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(pinia).use(router).mount('#app')
