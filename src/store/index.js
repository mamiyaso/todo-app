import { createStore } from "vuex";

export default createStore({
  state: {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    TOGGLE_TODO(state, id) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    UPDATE_TODO(state, updatedTodo) {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
  actions: {
    addTodo({ commit }, todoText) {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      commit("ADD_TODO", newTodo);
    },
    toggleTodo({ commit }, id) {
      commit("TOGGLE_TODO", id);
    },
    deleteTodo({ commit }, id) {
      commit("DELETE_TODO", id);
    },
    updateTodo({ commit }, updatedTodo) {
      commit("UPDATE_TODO", updatedTodo);
    },
  },
  getters: {
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
    incompleteTodos: (state) => state.todos.filter((todo) => !todo.completed),
  },
});
