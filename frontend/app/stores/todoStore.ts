import { create } from 'zustand'
import { ITask } from '@/types/tasks'

interface TodoStore {
  todos: ITask[]
  loading: boolean
  fetchTodos: () => Promise<void>
  addTodo: (todo: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTodo: (id: number, todo: Partial<Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}

export const useTodoStore = create<TodoStore>((set: any, get: any) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:5161/api/todos')
      const todos = await response.json()
      set({ todos, loading: false })
    } catch (error) {
      console.error('Failed to fetch todos:', error)
      set({ loading: false })
    }
  },

  addTodo: async (todo) => {
    try {
      const response = await fetch('http://localhost:5161/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })
      const newTodo = await response.json()
      set((state: TodoStore) => ({ 
        todos: [...state.todos, newTodo] 
      }))
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  },

  updateTodo: async (id, updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:5161/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
      if (response.ok) {
        // Refresh the todos list after update
        const { fetchTodos } = get()
        await fetchTodos()
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  },

  deleteTodo: async (id) => {
    try {
      const response = await fetch(`http://localhost:5161/api/todos/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        set((state: TodoStore) => ({
          todos: state.todos.filter((todo: ITask) => todo.id !== id)
        }))
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }
})) 