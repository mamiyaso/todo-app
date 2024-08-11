import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { createStore } from 'vuex'

describe('Home.vue', () => {
  it('renders todo list', () => {
    const store = createStore({
      state: {
        todos: [{ id: 1, text: 'Test Todo', completed: false }]
      },
      getters: {
        completedTodos: () => [],
        incompleteTodos: state => state.todos
      }
    })

    const wrapper = mount(Home, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.text()).toContain('Test Todo')
  })
})