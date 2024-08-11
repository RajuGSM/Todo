import React from 'react';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
          className="mr-2"
        />
        <span>{todo.name}</span>
      </div>
    </li>
  );
}
