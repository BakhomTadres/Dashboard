import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const TasksContext = createContext(
  null as null | [any[], React.Dispatch<React.SetStateAction<any[]>>],
);

export default function TasksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      
      const token = localStorage.getItem("token");
      await axios
        .get("https://dashboard-backend-ebon.vercel.app/api/tasks", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then((res) => res.data)
        .then((res) => setTasks(res.data.tasks));
    }
    fetchData();
    window.addEventListener("userLoggedIn", fetchData);
  return () => window.removeEventListener("userLoggedIn", fetchData);
  }, []);
  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {children}
    </TasksContext.Provider>
  );
}
