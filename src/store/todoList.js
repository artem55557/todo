export default {
  state: {
    todoLists: []
  },
  getters: {
    allTodoLists (state) {
      return state.todoLists
    }
  },
  mutations: {

    addTodoList (state, todoList) {
      state.todoLists.push(todoList)
    },

    updateTodoList (state, todoList) {
      state.todoLists = todoList
    }
  },
  actions: {

    addTodoList ({ commit }, todoList) {
      localStorage.setItem(`${todoList.id}`, JSON.stringify(todoList))
      commit('addTodoList', todoList)
    },

    fethTodoLists ({ commit }) {
      const keys = Object.keys(localStorage)
      const todoList = []
      keys.forEach(key => todoList.push(JSON.parse(localStorage.getItem(key))))
      commit('updateTodoList', todoList)
    }
  }
}
