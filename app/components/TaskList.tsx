'use client';

import React from 'react';
import useTodoStore, { Todo } from '../store/todoStore';
import AddTodoModal from './AddTodo';

const TaskList: React.FC = () => {
    const { todos, setEditingTodo, deleteTodo, toggleCompletion } = useTodoStore();
    const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);

    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        setFilteredTodos(todos);
    }, [todos]);

    const handleEditClick = (todo: Todo) => {
        setEditingTodo(todo);
        setShowModal(true);
    };

    const handleDeleteClick = (id: number) => {
        deleteTodo(id);
    };

    const handleCompletionToggle = (id: number) => {
        toggleCompletion(id);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <ul className='flex flex-col items-center'>
                {filteredTodos.map((todo) => (
                    <li key={todo.id} className="p-5 bg-white rounded-2xl mb-3 w-full md:w-3/6">
                        <h1 className={`text-xl font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                            {todo.title}
                        </h1>
                        <div className="flex text-center flex-col md:flex-row gap-y-2 md:gap-x-4 mt-3">
                            <button
                                onClick={() => handleEditClick(todo)}
                                className="border-2 px-4 py-2 rounded-md hover:bg-black hover:text-white ease-in-out duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteClick(todo.id)}
                                className="border-2 px-4 py-2 rounded-md hover:bg-black hover:text-white ease-in-out duration-300"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleCompletionToggle(todo.id)}
                                className="border-2 px-4 py-2 rounded-md hover:bg-black hover:text-white ease-in-out duration-300"
                            >
                                {todo.completed ? 'Unmark' : 'Mark as Completed'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && <AddTodoModal closeModal={handleCloseModal} />}
        </div>
    );
};

export default TaskList;
