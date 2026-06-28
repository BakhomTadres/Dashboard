import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TasksContext = createContext(
  null as null | [any[], React.Dispatch<React.SetStateAction<any[]>>, boolean]
);

export default function TasksContextProvider({ children }: { children: React.ReactNode }) {
  let [tasks, setTasks] = useState<any[]>([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) return; 

      setIsLoading(true);
      try {
        const res = await axios.get("https://dashboard-backend-ebon.vercel.app/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.data.tasks);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    window.addEventListener("userLoggedIn", fetchData);
    return () => window.removeEventListener("userLoggedIn", fetchData);
  }, []);

  return (
    <TasksContext.Provider value={[tasks, setTasks, isLoading]}>
      {children}
    </TasksContext.Provider>
  );
}