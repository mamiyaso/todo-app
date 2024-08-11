import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TodoDetail from '../views/TodoDetail.vue'
import Stats from '../views/Stats.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/todo/:id', name: 'TodoDetail', component: TodoDetail, props: true },
  { path: '/stats', name: 'Stats', component: Stats }
]

const router = createRouter({
  history: createWebHistory('/todo-app/'),
  routes
})

export default router