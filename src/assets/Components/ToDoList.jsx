import React, { useState, useEffect } from "react";
import "../Css/app.css"

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const handleAddTask = () => {
    if (taskTitle && taskTime) {
      setTasks([...tasks, { title: taskTitle, time: taskTime, completed: false }]);
      setTaskTitle("");
      setTaskTime("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleEditTask = (index, newTitle, newTime) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], title: newTitle, time: newTime };
    setTasks(newTasks);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toISOString();
      tasks.forEach((task, index) => {
        if (task.time <= currentTime && !task.completed) {
          alert(`Time to complete: ${task.title}`);
          const newTasks = [...tasks];
          newTasks[index].completed = true;
          setTasks(newTasks);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div>
      <h1>TODO LIST</h1>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="datetime-local"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
        placeholder="Set Time"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task.title}</span>
            <span>{new Date(task.time).toLocaleString()}</span>
            <button onClick={() => handleEditTask(index, task.title, task.time)}>
              Edit
            </button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;