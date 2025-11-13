import React from "react";
import { TaskProvider } from "./context/TaskContext";
import Board from "./pages/Board";

const App = () => (
  <TaskProvider>
    <div className="min-h-screen bg-gray-100">
      <Board />
    </div>
  </TaskProvider>
);

export default App;
