import Vue from 'vue'
import Vuex from 'vuex'

import stock from './modules/stock'
import portfolio from './modules/portfolio'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    stock,
    portfolio
  }
})
