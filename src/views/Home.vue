<template>
  <div class="home">
    <h1 class="mb-4">Todo List</h1>
    <form @submit.prevent="addTodo" class="mb-3">
      <div class="input-group">
        <input v-model.trim="newTodo" class="form-control" placeholder="Add a new todo" v-focus>
        <button class="btn btn-primary" type="submit" :disabled="!newTodo">Add</button>
      </div>
      <small v-if="error" class="text-danger">{{ error }}</small>
    </form>
    <ul class="list-group">
      <li v-for="todo in todos" :key="todo.id" 
          @click="toggleTodo(todo.id)"
          class="list-group-item d-flex justify-content-between align-items-center"
          :class="{ 'list-group-item-success': todo.completed }"
          style="cursor: pointer;">
        <div>
          <input type="checkbox" :checked="todo.completed" @click.stop class="me-2">
          <span :class="{ 'text-decoration-line-through': todo.completed }">{{ todo.text }}</span>
        </div>
        <router-link :to="{ name: 'TodoDetail', params: { id: todo.id } }" class="btn btn-sm btn-info" @click.stop>Details</router-link>
      </li>
    </ul>
    <div class="mt-3">
      <button @click="filter = 'all'" class="btn btn-outline-primary me-2">All</button>
      <button @click="filter = 'completed'" class="btn btn-outline-success me-2">Completed</button>
      <button @click="filter = 'incomplete'" class="btn btn-outline-warning">Incomplete</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { focus } from '../directives/focus'

export default {
  name: 'Home',
  directives: { focus },
  setup() {
    const store = useStore()
    const newTodo = ref('')
    const filter = ref('all')
    const error = ref('')

    const todos = computed(() => {
      switch (filter.value) {
        case 'completed':
          return store.getters.completedTodos
        case 'incomplete':
          return store.getters.incompleteTodos
        default:
          return store.state.todos
      }
    })

    const addTodo = () => {
      if (newTodo.value.trim()) {
        store.dispatch('addTodo', newTodo.value)
        newTodo.value = ''
        error.value = ''
      } else {
        error.value = 'Todo cannot be empty'
      }
    }

    const toggleTodo = (id) => {
      store.dispatch('toggleTodo', id)
    }

    return { newTodo, filter, todos, addTodo, toggleTodo, error }
  }
}
</script>