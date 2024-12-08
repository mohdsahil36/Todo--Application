'use client';

import { create } from 'zustand';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  status: string;
  date: string;
}

interface TodoStore {
  todos: Todo[];
  selectedDate: string;
  filter: string;
  filteredTodos: () => Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleCompletion: (id: number) => void;
  setFilter: (filter: string) => void;
  setSelectedDate: (date: string) => void;
  setEditingTodo: (todo: Todo | null) => void;
  clearEditingTodo: () => void;
  editingTodo: Todo | null;
  initializeTodos: () => void;
  filterTodosByDate: (date: string) => void;
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  selectedDate: localStorage.getItem('selectedDate') || new Date().toISOString().split('T')[0],
  filter: 'all',
  editingTodo: null,

  addTodo: (todo) => {
    set((state) => {
      const updatedTodos = [...state.todos, todo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  updateTodo: (todo) => {
    set((state) => {
      const updatedTodos = state.todos.map((t) =>
        t.id === todo.id ? todo : t
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  toggleCompletion: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },

  setFilter: (filter) => set({ filter }),

  setSelectedDate: (date) => {
    localStorage.setItem('selectedDate', date);
    set({ selectedDate: date });
  },

  setEditingTodo: (todo) => set({ editingTodo: todo }),

  clearEditingTodo: () => set({ editingTodo: null }),

  filteredTodos: () => {
    const { todos, filter, selectedDate } = get();
    const filteredByDate = todos.filter((todo) => todo.date === selectedDate);
    if (filter === 'completed') return filteredByDate.filter((todo) => todo.completed);
    if (filter === 'in-progress') return filteredByDate.filter((todo) => !todo.completed);
    return filteredByDate;
  },

  initializeTodos: () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      set({ todos: JSON.parse(storedTodos) });
    }
  },

  filterTodosByDate: (date) => {
    set((state) => {
      const filteredTodos = state.todos.filter((todo) => todo.date === date);
      return { todos: filteredTodos };
    });
  },
}));

export default useTodoStore;
