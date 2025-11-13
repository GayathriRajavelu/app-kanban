import React, { createContext, useEffect, useState } from "react";
import { loadTasks, saveTasks } from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

/* Context */
export const TaskContext = createContext();

/* Provider with arrow functions */
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = loadTasks();
    return saved.length ? saved : [
      { id: uuidv4(), title: "Welcome!", description: "Use the + to add tasks. Drag between columns.", status: "To Do", priority: "Low", tags: ["starter"] }
    ];
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [{ ...task, id: uuidv4() }, ...prev]);
  };

  const updateTask = (id, updated) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTaskToStatus = (id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTaskToStatus }}>
      {children}
    </TaskContext.Provider>
  );
};
