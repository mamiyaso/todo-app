<template>
  <div v-if="todo" class="todo-detail">
    <h2 class="mb-4">Todo Detail</h2>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="todoText" class="form-label">Todo Text</label>
          <input type="text" class="form-control" id="todoText" v-model="editedText">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="todoStatus" v-model="editedCompleted">
          <label class="form-check-label" for="todoStatus">Completed</label>
        </div>
        <button @click="saveTodo" class="btn btn-primary me-2">Save</button>
        <button @click="deleteTodo" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TodoDetail',
  props: ['id'],
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const todo = computed(() => store.state.todos.find(todo => todo.id === Number(props.id)))
    const editedText = ref(todo.value?.text)
    const editedCompleted = ref(todo.value?.completed)

    const saveTodo = () => {
      if (editedText.value.trim()) {
        store.dispatch('updateTodo', {
          id: Number(props.id),
          text: editedText.value,
          completed: editedCompleted.value
        })
        router.push('/')
      }
    }

    const deleteTodo = () => {
      store.dispatch('deleteTodo', Number(props.id))
      router.push('/')
    }

    return { todo, editedText, editedCompleted, saveTodo, deleteTodo }
  }
}
</script>