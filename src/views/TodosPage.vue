<template>
  <div class="todos">
    <nav>
      <router-link to="/">Back</router-link>
    </nav>
    <add-todo-item></add-todo-item>
    <h3>{{listTitle}}</h3>
    <todo-list :todoFilter="currentFilter"></todo-list>
    <div class="todos__footer footer-todos">
      <span class="footer-todos__counter">{{countItemLeft}} item left</span>
      <div class="footer-todos__filters">
        <button
          v-for="btn in buttons"
          :class="{'active' : btn.title === currentFilter}"
          :key="btn.id" @click="handler(`${btn.title}`)"
        >{{btn.title}}</button>
      </div>
      <button v-if="isClearCompleted" @click="clearHandler">Clear completed</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AddTodoItem from '@/components/AddTodoItem.vue'
import TodoList from '@/components/TodoList.vue'
export default {
  name: 'TodosPage',
  components: {
    AddTodoItem,
    TodoList
  },
  data () {
    return {
      id: this.$route.params.id,
      buttons: [
        { id: 0, title: 'All' },
        { id: 1, title: 'Active' },
        { id: 2, title: 'Comlited' }
      ],
      currentFilter: 'All'
    }
  },
  computed: {
    ...mapGetters(['countItemLeft', 'completedTodos', 'listTitle']),

    isClearCompleted () {
      return !!this.completedTodos.length
    }
  },
  mounted () {
    this.$store.dispatch('fetchTodos', this.id)
  },
  methods: {
    handler (currentFilter) {
      this.currentFilter = currentFilter
    },

    clearHandler () {
      this.$store.dispatch('clearCompletedTodos', this.id)
    }
  }
}
</script>
<style lang="scss">
.todos {
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  padding: 0 2rem;

  &__list {
    padding: 0;
    border-top: 2px solid #5D5C5C;
  }

  &__footer {
    border-bottom: 1px solid #5D5C5C;
    display: flex;
    padding: 0 0.5rem 0.5rem;

    button {
      border: none;
      background: transparent;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all .3s ease-in-out;
      margin-right: 0.25rem;
      border-radius: 3px;

      &.active, &:hover {
        border-color:  #5D5C5C;
        transition: all .3s ease-in-out;
      }
    }
  }
}

.footer-todos {
  &__filters {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
}

.custom-checkbox {
  position: absolute;
  z-index: -10;
  opacity: 0;

  &+label {
    display: inline-flex;
    position: relative;
    align-items: center;
    user-select: none;
    padding-left: 3rem;
    min-height: 32px;

    &::before {
      content: '';
      display: block;
      position: absolute;
      box-sizing: border-box;
      top: 0;
      left: 0;
      width: 32px;
      height: 32px;
      border: 2px solid #5D5C5C;
      border-radius: 50%;
      flex-shrink: 0;
      flex-grow: 0;
      background-size: 70% 70%;
      background-position: center center;
      background-repeat: no-repeat;
      margin-right: 15px;
    }
  }

  &:checked+label::before{
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.15059 7.41484C3.21958 7.51113 3.31052 7.58959 3.41589 7.64372C3.52125 7.69784 3.638 7.72608 3.75645 7.72608C3.8749 7.72608 3.99165 7.69784 4.09701 7.64372C4.20237 7.58959 4.29332 7.51113 4.36231 7.41484L9.29825 0.571094C9.38731 0.446875 9.29825 0.273438 9.1459 0.273438H8.04668C7.80762 0.273438 7.58028 0.388281 7.43965 0.585156L3.75762 5.69453L2.08887 3.37891C1.94825 3.18438 1.72325 3.06719 1.48184 3.06719H0.382621C0.230277 3.06719 0.141215 3.24062 0.230277 3.36484L3.15059 7.41484Z' fill='%233ddf86'/%3E%3C/svg%3E");
  }
}
</style>
