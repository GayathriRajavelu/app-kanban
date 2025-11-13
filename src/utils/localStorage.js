export const loadTasks = () => {
  try {
    const raw = localStorage.getItem("kanban_tasks_v1");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("loadTasks error", e);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem("kanban_tasks_v1", JSON.stringify(tasks));
  } catch (e) {
    console.error("saveTasks error", e);
  }
};
