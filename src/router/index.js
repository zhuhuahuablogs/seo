import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Home,
      children: [
        {path: '/', name: 'home', component: Home}
      ]
    },
    {path: '/404', name: '404', component: page('404')},
    {path: '/poker', name: 'poker', component: page('poker')},
    {path: '*', redirect: {name: '404'}}
  ]
})
