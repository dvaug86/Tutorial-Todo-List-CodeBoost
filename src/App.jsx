import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
      console.log(loadedTodos)
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div> {todo.text}</div>
          )}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />

          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>Submit Edit</button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
