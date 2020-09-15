import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import waiters from './waiters/index'
import customers from './customers/index'
import products from './products/index'
import comments from './comments/index'
import categories from './categories/index'
import orders from './orders/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    waiters,
    customers,
    products,
    comments,
    categories,
    orders
  },
  getters
})

export default store
