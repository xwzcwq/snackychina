import Vue from 'vue'

import Router from 'vue-router'
import Index from '@/view/index'
import Account from '@/view/user/account'
import Checkout from '@/view/product/checkout'
import Subscription from '@/view/product/subscription'
import Market from '@/view/product/market'
import Signup from '@/view/auth/signup'

import Term from '@/view/other/term'
import Help from '@/view/other/help'

// import UserOrder from '@/view/user/order'

// import UserProfile from '@/view/user/profile'
// import UserAddress from '@/view/user/address'
const UserOrder = () =>  import('@/view/user/order')
const UserProfile = () =>  import('@/view/user/profile')
const UserAddress = () => import('@/view/user/address')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/term',
      component: Term
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/user/:id',
      name: 'account',
      component: Account,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        { path: '', redirect: 'profile' },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'address',
          component: UserAddress
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'order',
          component: UserOrder
        }
      ]
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: Subscription
    },
    {
      path: '/market',
      name: 'market',
      component: Market
    }
  ]
})
