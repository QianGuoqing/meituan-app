import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goods from '../components/goods/goods.vue'
import Ratings from '../components/ratings/ratings.vue'
import Seller from '../components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
