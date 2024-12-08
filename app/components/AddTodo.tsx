'use client';

import React, { useState, useEffect } from 'react';
import useTodoStore, { Todo } from '../store/todoStore';

interface AddTodoModalProps {
  closeModal: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ closeModal }) => {
  const { addTodo, updateTodo, editingTodo, clearEditingTodo } = useTodoStore();

  const [taskDetails, setTaskDetails] = useState<Omit<Todo, 'id' | 'completed'>>({
    title: '',
    status: 'in-progress',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editingTodo) {
      setTaskDetails({
        title: editingTodo.title,
        status: editingTodo.status,
        date: editingTodo.date,
      });
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskDetails.title.trim() || !taskDetails.date) {
      alert('Please fill out all fields.');
      return;
    }

    if (editingTodo) {
      updateTodo({
        ...editingTodo,
        ...taskDetails,
      });
      clearEditingTodo();
    } else {
      addTodo({
        ...taskDetails,
        id: Date.now(),
        completed: false,
      });
    }

    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full md:w-1/3">
        <h2 className="text-xl mb-4">{editingTodo ? 'Edit Todo' : 'Add Todo'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={taskDetails.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="date"
              value={taskDetails.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center gap-x-4">
            <button type="button" onClick={closeModal} className="border-2 text-black px-3 py-2 rounded-md hover:text-white hover:bg-black ease-in-out duration-300">
              Cancel
            </button>
            <button type="submit" className="border-2 text-black px-3 py-2 rounded-md hover:text-white hover:bg-black ease-in-out duration-300">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
