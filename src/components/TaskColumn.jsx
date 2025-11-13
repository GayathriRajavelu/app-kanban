import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, items, onOpen }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-3 flex-1 min-w-[260px] rounded-lg transition-colors ${
        isOver ? "bg-blue-100" : "bg-gray-50"
      }`}
    >
      <h3 className="font-bold mb-2">
        {title}{" "}
        <span className="text-sm text-gray-500">({items.length})</span>
      </h3>
      {items.map((task) => (
        <TaskCard key={task.id} task={task} onOpen={onOpen} />
      ))}
    </div>
  );
};

export default TaskColumn;
