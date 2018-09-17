// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import Vuex from 'vuex'
import 'iview/dist/styles/iview.css';
import store from './store'
Vue.config.productionTip = false
import AV from 'leancloud-storage'
import locale from 'iview/dist/locale/en-US';

Vue.use(iView, { locale });
Vue.use(Vuex)



let APP_ID = 'UkGnz9f6GCeAqTUfBXy1oVIF-MdYXbMMI'
let APP_KEY = '5wew5JWTQv3d4z5GaHcJJsb6'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.user) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      alert('Please sign in to go on')
      next({
        path: '/',
      })
    }
  }
  else {
    next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
