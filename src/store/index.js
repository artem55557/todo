import Vue from 'vue'
import Vuex from 'vuex'
import todos from './todos'
import todoList from './todoList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { todos, todoList }
})
