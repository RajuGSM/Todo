import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './styles.css'; 
const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    // Filter out completed todos
    const newTodos = todos.filter(todo => !todo.complete);
    // Update the state with the filtered todos
    setTodos(newTodos);
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>
      <div className="card shadow">
        <div className="card-body">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <div className="input-group mb-3">
            <input
              ref={todoNameRef}
              type="text"
              className="form-control"
              placeholder="Add a new todo"
            />
            <div className="input-group-append">
              <button onClick={handleAddTodo} className="btn btn-primary">
                Add Todo
              </button>
            </div>
          </div>
          <button onClick={handleClearTodos} className="btn btn-danger">
            Clear Complete
          </button>
          <div className="mt-3">
            <strong>{todos.filter(todo => !todo.complete).length}</strong> left to do
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
