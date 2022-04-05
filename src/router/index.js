import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomePage.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView
},
{
  path: '/todos/:id',
  name: 'todos',
  component: () =>
    import('@/views/TodosPage.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
