
import React, { useState, useEffect } from 'react';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then(res => res.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = async () => {
        const res = await fetch('http://localhost:5000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTodo }),
        });
        const data = await res.json();
        setTodos([...todos, data]);
        setNewTodo('');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg p-6 rounded-md w-1/2">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <div className="mb-4 flex">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a task"
                        className="border rounded-md px-3 py-2 flex-grow"
                    />
                    <button
                        onClick={addTodo}
                        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                    >
                        Add
                    </button>
                </div>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo._id} className="flex justify-between items-center mb-2">
                            <span>{todo.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;

