import React, { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskColumn from "../components/TaskColumn";
import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

const Board = () => {
  const { tasks, moveTaskToStatus } = useContext(TaskContext);
  const [selected, setSelected] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const columns = useMemo(
    () => ({
      "To Do": tasks.filter((t) => t.status === "To Do"),
      "In Progress": tasks.filter((t) => t.status === "In Progress"),
      Done: tasks.filter((t) => t.status === "Done"),
    }),
    [tasks]
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    if (["To Do", "In Progress", "Done"].includes(newStatus)) {
      moveTaskToStatus(taskId, newStatus);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-center">Kanban Board</h1>
          <div className="w-full md:w-1/2">
            <TaskForm />
          </div>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 items-start">
            {Object.entries(columns).map(([status, items]) => (
              <TaskColumn
                key={status}
                title={status}
                items={items}
                onOpen={(task) => setSelected(task)}
              />
            ))}
          </div>
        </DndContext>

        <TaskModal
          open={!!selected}
          task={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </div>
  );
};

export default Board;
