import Vue from 'vue'
import Vuex from 'vuex'
import AV from 'leancloud-storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    cart: {
      subscription: {}
    },
    goodsPrice: {
      subscription: 0
    },
    backgroundColor: '#5cadff'
  },
  mutations: {
    setBkgc (state, color) {
      state.backgroundColor = color
    },
    setUser (state, payload) {
      let {user, logout} = payload
      state.user = user
      //  console.log(payload)
      if (user) {
        localStorage.curUserSession = JSON.stringify(user._sessionToken)
      }
      if (logout) {
        // console.log('has logout')
        localStorage.curUserSession = null
      }
    },
    setCart (state, good) {
      let cart = state.cart
      // console.log(cart, good)
      state.cart[good.type] = good.data
    },
    setGoodsPrice (state, good) {
      state.goodsPrice[good.type] = good.price
    }
  },
  actions: {
    getSubscriptionPrice ({commit}) {
      let query = new AV.Query('Goods')
      query.equalTo('name', 'subscription')
      query.find().then((subscription) => {
        let subscriptionPrice = subscription[0].attributes.unitPrice
        // console.log(subscriptionPrice)
        commit('setGoodsPrice', {
          type: 'subscription',
          price: subscriptionPrice
        })
      }, (error) => {
        console.log(error)
      })
    }
  }
})

export default store
