import { create } from 'zustand'
import { ITask } from '@/types/tasks'

interface TodoStore {
  todos: ITask[]
  loading: boolean
  fetchTodos: () => Promise<void>
  addTodo: (todo: ITask) => Promise<void>
  updateTodo: (id: string, todo: Partial<ITask>) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
}

export const useTodoStore = create<TodoStore>((set: any, get: any) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/tasks')
      const todos = await response.json()
      set({ todos, loading: false })
    } catch (error) {
      console.error('Failed to fetch todos:', error)
      set({ loading: false })
    }
  },

  addTodo: async (todo: ITask) => {
    try {
      const response = await fetch('http://localhost:3001/tasks', {
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

  updateTodo: async (id: string, updatedTodo: Partial<ITask>) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
      const updated = await response.json()
      set((state: TodoStore) => ({
        todos: state.todos.map((todo: ITask) => 
          todo.id === id ? updated : todo
        )
      }))
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  },

  deleteTodo: async (id: string) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
      })
      set((state: TodoStore) => ({
        todos: state.todos.filter((todo: ITask) => todo.id !== id)
      }))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }
})) 