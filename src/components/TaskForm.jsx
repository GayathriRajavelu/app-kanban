import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

export const TaskForm = ({ className = "" }) => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), description: description.trim(), status, priority, tags: [] });
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2 border rounded" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="px-3 py-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2 border rounded" placeholder="Short desc (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select className="px-3 py-2 border rounded" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Add</button>
      </div>
    </form>
  );
};

export default TaskForm;
