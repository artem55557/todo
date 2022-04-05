<template>
  <li class="todos__item" :class="classCompleted">
    <input
      type="checkbox"
      :name="id"
      :id="id"
      :checked="completed"
      @change="$emit('change', {completed: $event.target.checked, id:id})"
      class="custom-checkbox"
    ><label :for="id">{{title}}</label>
  </li>
</template>
<script>
export default {
  name: 'TodoItem',
  props: {
    id: {
      type: Number,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classCompleted () {
      return this.completed ? 'completed' : ''
    }
  }
}
</script>
<style lang="scss">
.todos__item {
    list-style: none;
    text-align: left;
    border-bottom: 1px solid #5D5C5C;
    padding: 1rem 0;

    &.completed {
      text-decoration: line-through;

      label {
         opacity: 0.8;
      }
    }
  }
</style>
