<template>
  <form class="add-todo-list" @submit.prevent="addTodoItem">
    <input type="text" v-model="title" placeholder="Add new todo list">
    <button type="submit">Add</button>
  </form>
</template>
<script>
export default {
  name: 'AddTodoItem',
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTodoItem () {
      if (this.title.trim()) {
        const newTodoList = {
          id: Date.now(),
          title: this.title,
          todos: []
        }
        this.$store.dispatch('addTodoList', newTodoList)
        this.title = ''
      }
    }
  }
}
</script>

<style lang="scss">
.add-todo-list {
  display: flex;

  input {
    min-width: 250px;
    min-height: 32px;
    padding: 0.5rem;
    border: 1px solid #5D5C5C;

    &:focus, &:active {
      outline: none;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    }
  }

  button {
    padding: 0.5rem 1.5rem;
    border: 1px solid #5D5C5C;
    border-left: none;
  }
}
</style>
