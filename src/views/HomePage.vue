<template>
  <div class="home">
    <add-todo-list></add-todo-list>
    <ul>
      <li
        v-for="todoList in allTodoLists"
        :key="todoList.id"
      >
        <router-link
        :to="`/todos/${todoList.id}`"
        class="todo-list-link"
      >{{todoList.title}}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddTodoList from '../components/AddTodoList.vue'
export default {
  name: 'HomeView',
  components: {
    AddTodoList
  },
  computed: {
    ...mapGetters(['allTodoLists'])
  },
  mounted () {
    this.$store.dispatch('fethTodoLists')
  }
}
</script>
<style lang="scss">
.home {
  max-width: 900px;
  margin: 3rem auto;
  text-align: left;
  padding: 0 2rem;

  .todo-list-link {
    font-size: 1.5rem;
    color: #2c3e50;
    margin: 0.5rem 0;
    display: block;

  }
}
</style>
