import { TasksContext } from "../TasksContext";
import { useContext } from "react";
import Notification from "./Notification";
import { NotificationContext } from "../NotificationContext";

export default function TaskCard({
  task,
  setEditingTaskId,
  setShowEditTask,
}: {
  task: any;
  setEditingTaskId: React.Dispatch<React.SetStateAction<number | null>>;
  setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let [tasks, setTasks] = useContext(TasksContext)!;
  let [showNotification, setShowNotification, notificationType, setNotificationType] =
    useContext(NotificationContext)!;

  const showNotif = (type: string) => {
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const toggleComplete = () => {
    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t,
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const deleteTask = () => {
    showNotif("error");
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const priorityColor =
    task.priority === "High"
      ? "bg-red-500"
      : task.priority === "Medium"
        ? "bg-yellow-500"
        : "bg-green-500";

  return (
    <>
      {showNotification && <Notification type={notificationType} />}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800 wrap-break-word">
            {task.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 wrap-break-word">
            {task.description}
          </p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${priorityColor}`}
          >
            {task.priority}
          </span>

          <div className="flex items-center gap-2">
            {/* Check */}
            <button
              onClick={toggleComplete}
              title={task.completed ? "Mark as pending" : "Mark as completed"}
              className={`group cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200
                ${
                  task.completed
                    ? "border-green-500 bg-green-500 text-white hover:bg-white hover:text-green-500"
                    : "border-gray-300 bg-white text-gray-300 hover:border-green-500 hover:text-green-500"
                }`}
            >
              <i className="fa-solid fa-check text-xs"></i>
            </button>

            {/* Edit */}
            <button
              onClick={() => {
                setEditingTaskId(task.id);
                setShowEditTask(true);
              }}
              title="Edit task"
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-400 bg-white text-blue-400 transition-all duration-200 hover:bg-blue-400 hover:text-white"
            >
              <i className="fa-solid fa-pen text-xs"></i>
            </button>

            {/* Delete */}
            <button
              onClick={deleteTask}
              title="Delete task"
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-400 bg-white text-red-400 transition-all duration-200 hover:bg-red-400 hover:text-white"
            >
              <i className="fa-solid fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
