import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";

export const TaskModal = ({ open, task, onClose }) => {
  const { updateTask } = useContext(TaskContext);
  const [local, setLocal] = useState(task || {});

  useEffect(() => setLocal(task || {}), [task]);

  if (!open || !task) return null;

  const handleSave = () => {
    updateTask(task.id, { title: local.title, description: local.description, status: local.status, priority: local.priority, tags: local.tags });
    onClose();
  };

  const handleChange = (k, v) => setLocal((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-backdrop absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Task Details</h2>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="mt-4 space-y-3">
          <input className="w-full px-3 py-2 border rounded" value={local.title || ""} onChange={(e) => handleChange("title", e.target.value)} />
          <textarea className="w-full px-3 py-2 border rounded" rows="4" value={local.description || ""} onChange={(e) => handleChange("description", e.target.value)} />
          <div className="flex gap-2">
            <select value={local.status || "To Do"} onChange={(e) => handleChange("status", e.target.value)} className="px-3 py-2 border rounded">
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <select value={local.priority || "Medium"} onChange={(e) => handleChange("priority", e.target.value)} className="px-3 py-2 border rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
