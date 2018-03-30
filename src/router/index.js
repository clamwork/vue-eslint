import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import pathList from './path'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/home',
      component: home,
      children: pathList
    }
  ]
})
router.onReady((route) => {
  route.meta.isKeep !== false && store.state.keepComponents.push(route.name)
})
router.beforEach((to, fromm, next) => {
  next()
})
export default router
