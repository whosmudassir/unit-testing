import React from "react";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const addTodo = {
      id: new Date().getTime(),
      text: input,
      completed: false,
    };

    setTodos([...todos].concat(addTodo));

    setInput("");
  };

  const deleteTodo = (id) => {
    const updatedTodo = [...todos].filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodo);
  };

  const toggle = (id) => {
    const updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodo);
  };

  const deleteAll = () => {
    const updatedTodo = [...todos].filter((todo) => {
      return todo.completed === false;
    });
    setTodos(updatedTodo);
  };

  const selectAll = () => {
    const updatedTodo = [...todos].map((todo) => {
      todo.completed = true;
      return todo;
    });
    toggle(updatedTodo);
  };

  console.log(todos);
  return (
    <div className="App">
      <h3>Todo List</h3>
      <form onSubmit={submitHandler}>
        <input
          data-testid="inputfield"
          type="text"
          value={input}
          onChange={inputHandler}
        />
        <button data-testid="add-btn" type="submit" disabled={!input}>
          Add Todo
        </button>
      </form>

      {todos.map((todo, index) => (
        <div key={todo.id} data-testid="single-todo">
          <input
            type="checkbox"
            onChange={() => toggle(todo.id)}
            checked={todo.completed}
          />

          {todo.completed ? <strike>{todo.text} </strike> : todo.text}

          <button
            data-testid={`delete-btn-${index}`}
            onClick={() => deleteTodo(todo.id)}
          >
            delete
          </button>
        </div>
      ))}

      <button onClick={selectAll}>select all</button>
      <button onClick={deleteAll}>delete selected</button>
    </div>
  );
}
