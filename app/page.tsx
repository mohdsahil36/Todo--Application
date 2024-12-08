'use client';

import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import useTodoStore from './store/todoStore';
import AddTodoModal from './components/AddTodo';
import { Plus } from 'lucide-react';

export default function Page() {
  const { initializeTodos, filterTodosByDate, selectedDate } = useTodoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initializeTodos();
    filterTodosByDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className="h-screen mx-auto p-5 md:p-8 bg-gray-200">
      <Calendar />
      {isModalOpen && <AddTodoModal closeModal={() => setIsModalOpen(false)} />}
      <TaskList />
      <button
        className="bg-white text-black rounded-full p-4 hover:bg-black hover:text-white ease-in-out duration-300 absolute bottom-8 left-40 md:left-2/4 shadow-2xl"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus />
      </button>
    </div>
  );
}
