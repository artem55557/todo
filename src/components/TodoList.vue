<template>
  <ul class="todos__list">
    <todo-item
      v-for="todo in todos"
      :key="todo.id"
      :title="todo.title"
      :id="todo.id"
      :completed="todo.completed"
      @change="updateTodoItem"
      ></todo-item>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import TodoItem from '@/components/TodoItem.vue'
export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todoFilter: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapGetters(['allTodos', 'completedTodos', 'activeTodos']),
    todos () {
      if (this.todoFilter === 'All') return this.allTodos
      else if (this.todoFilter === 'Active') return this.activeTodos
      else return this.completedTodos
    }
  },
  methods: {
    updateTodoItem (updateData) {
      const listId = this.$route.params.id
      this.$store.dispatch('updateTodoItem', { updateData, listId })
    }
  }
}
</script>
