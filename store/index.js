import Vue from 'vue'
import Vuex from 'vuex'

import events from './modules/events'
import users from './modules/users'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      events,
      users
    }
  })
}

export default store
