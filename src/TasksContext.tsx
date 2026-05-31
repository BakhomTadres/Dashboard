import { createContext, useState } from "react";

export const TasksContext = createContext(
  null as null | [any[], React.Dispatch<React.SetStateAction<any[]>>],
);

export default function TasksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [tasks, setTasks] = useState<any[]>(
    localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : [],
  );
  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {children}
    </TasksContext.Provider>
  );
}

