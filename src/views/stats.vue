<template>
    <div class="stats">
      <h2 class="mb-4">Todo Statistics</h2>
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Overview</h5>
              <p class="card-text">Total Todos: {{ totalTodos }}</p>
              <p class="card-text">Completed Todos: {{ completedTodos }}</p>
              <p class="card-text">Incomplete Todos: {{ incompleteTodos }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Completion Rate</h5>
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{ width: completionRate + '%' }" :aria-valuenow="completionRate" aria-valuemin="0" aria-valuemax="100">{{ completionRate }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Recent Todos</h5>
              <ul class="list-group">
                <li v-for="todo in recentTodos" :key="todo.id" class="list-group-item">
                  {{ todo.text }}
                  <span class="badge bg-primary float-end">{{ todo.completed ? 'Completed' : 'Incomplete' }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'Stats',
    setup() {
      const store = useStore()
  
      const totalTodos = computed(() => store.state.todos.length)
      const completedTodos = computed(() => store.getters.completedTodos.length)
      const incompleteTodos = computed(() => store.getters.incompleteTodos.length)
      
      const completionRate = computed(() => {
        return totalTodos.value > 0 ? Math.round((completedTodos.value / totalTodos.value) * 100) : 0
      })
  
      const recentTodos = computed(() => {
        return [...store.state.todos]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
      })
  
      return { 
        totalTodos, 
        completedTodos, 
        incompleteTodos, 
        completionRate,
        recentTodos
      }
    }
  }
  </script>