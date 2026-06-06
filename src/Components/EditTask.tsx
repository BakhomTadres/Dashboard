import { useContext, useState } from "react";
import { TasksContext } from "../TasksContext";
import { NotificationContext } from "../NotificationContext";
import axios from "axios";

export default function EditTask({
  setShowEditTask,
  taskId,
}: {
  setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
}) {
  let [tasks, setTasks] = useContext(TasksContext)!;
  let [, setShowNotification, , setNotificationType] =
    useContext(NotificationContext)!;

  const currentTask = tasks.find((t) => {
    return t._id === taskId;
  });

  if (!currentTask) return null;

  let [title, setTitle] = useState(currentTask?.title || "");
  let [description, setDescription] = useState(currentTask?.description || "");
  let [priority, setPriority] = useState(currentTask?.priority || "Low");
  let [completed, setCompleted] = useState(currentTask?.completed || false);

  return (
    <>
      <div
        onClick={() => setShowEditTask(false)}
        className="fixed z-50 inset-0 bg-gray-900 opacity-60"
      ></div>
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-[90%] max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Edit Task</h2>
          <button
            onClick={() => setShowEditTask(false)}
            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Task title"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          placeholder="Task description"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task Completed
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={completed.toString()}
          onChange={(e) => setCompleted(e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>

        <button
          onClick={async () => {
            const updatedTasks = tasks.map((t) =>
              t._id === taskId
                ? { ...t, title, description, priority, completed }
                : t,
            );

            setTasks(updatedTasks);
            setShowEditTask(false);
            setNotificationType("info");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);

            try {
              const token = localStorage.getItem("token");
              await axios.patch(
                `https://dashboard-backend-ebon.vercel.app/api/tasks/${currentTask._id}`,
                {
                  title,
                  description,
                  priority,
                  completed,
                },
                {
                headers: {
                  Authorization: `Berear ${token}`,
                },
              }
              );
            } catch (error) {
              setTasks(tasks);
              setNotificationType("error");
              setShowNotification(true);
              setTimeout(() => setShowNotification(false), 2000);
            }
          }}
          className="w-full p-2 bg-teal-400 text-white rounded-md hover:bg-teal-600 transition duration-300 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
