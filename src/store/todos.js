export default {
  state: {
    todos: [],
    todoListTitle: []
  },
  getters: {
    allTodos (state) {
      return state.todos
    },
    completedTodos (state) {
      return state.todos.filter(item => item.completed)
    },
    activeTodos (state) {
      return state.todos.filter(item => item.completed === false)
    },
    countItemLeft (state) {
      return state.todos.filter(item => item.completed === false).length
    },
    listTitle (state) {
      return state.todoListTitle
    }
  },
  mutations: {
    addTodoItem (state, todoItem) {
      state.todos.push(todoItem)
    },

    updateTodo (state, todoList) {
      state.todos = todoList.todos
      state.todoListTitle = todoList.title
    },

    setTodoItem (state, todoItem) {
      state.todos = state.todos.map(item => {
        if (item.id === todoItem.id) {
          return {
            ...item,
            completed: todoItem.completed
          }
        } else { return item }
      })
    },

    clearCompletedTodos (state) {
      state.todos = state.todos.map(item => {
        if (item.completed) {
          return {
            ...item,
            completed: false
          }
        } else { return item }
      })
    }
  },
  actions: {
    addTodoItem ({ commit }, todoItem) {
      const listId = todoItem.listId
      const list = JSON.parse(localStorage.getItem(`${listId}`))
      list.todos.push(todoItem)
      localStorage.setItem(`${todoItem.listId}`, JSON.stringify(list))
      commit('addTodoItem', todoItem)
    },

    fetchTodos ({ commit }, id) {
      const todos = JSON.parse(localStorage.getItem(`${id}`))
      commit('updateTodo', todos)
    },

    updateTodoItem ({ commit }, data) {
      const listId = data.listId
      const updateTodoItem = data.updateData
      const list = JSON.parse(localStorage.getItem(`${listId}`))
      list.todos = list.todos.map(item => {
        if (item.id === updateTodoItem.id) {
          return {
            ...item,
            completed: updateTodoItem.completed
          }
        } else { return item }
      })
      localStorage.setItem(`${listId}`, JSON.stringify(list))
      commit('setTodoItem', updateTodoItem)
    },

    clearCompletedTodos ({ commit }, id) {
      const list = JSON.parse(localStorage.getItem(`${id}`))
      list.todos = list.todos.map(item => {
        if (item.completed) {
          return {
            ...item,
            completed: false
          }
        } else { return item }
      })
      localStorage.setItem(`${id}`, JSON.stringify(list))
      commit('clearCompletedTodos', id)
    }
  }
}
