import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

const TaskCard = ({ task, onOpen }) => {
  const { deleteTask } = useContext(TaskContext);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white shadow p-3 rounded my-2 cursor-grab active:cursor-grabbing"
      onClick={() => onOpen(task)}
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-sm">{task.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className="text-red-500 text-xs"
        >
          Delete
        </button>
      </div>
      <p className="text-xs mt-1">{task.description || "No description"}</p>
      <div className="text-[11px] mt-2 px-2 py-0.5 bg-gray-100 rounded w-fit">
        {task.priority || "Medium"}
      </div>
    </div>
  );
};

export default TaskCard;
