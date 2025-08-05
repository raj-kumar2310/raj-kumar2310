import React, { useState } from "react";
import { TaskStatus } from "./TaskStatus";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { name: task, status: TaskStatus.PENDING }]);
      setTask("");
    }
  };

  const updateStatus = (index, newStatus) => {
    const updated = todos.map((item, i) =>
      i === index ? { ...item, status: newStatus } : item
    );
    setTodos(updated);
  };

  const deleteTask = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div className="container">
      <h2>🧠 To-Do App </h2>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {todos.map((item, index) => (
          <li key={index}>
           <div>
  <div className="task-name">{item.name}</div>
  <p className={`status-badge status-${item.status.toLowerCase().replace(' ', '-')}`}>
    {item.status}
  </p>
</div>

            <div>
              <button
                onClick={() => updateStatus(index, TaskStatus.IN_PROGRESS)}
              >
                  In Progress
              </button>
              <button onClick={() => updateStatus(index, TaskStatus.COMPLETED)}>
                Complete
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
