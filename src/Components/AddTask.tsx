import { useContext, useState } from "react";
import { TasksContext } from "../TasksContext";
import { NotificationContext } from "../NotificationContext";
import axios from "axios";

export default function AddTask({
  setShowAddTask,
}: {
  setShowAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let [tasks, setTasks] = useContext(TasksContext)!;
  let [, setShowNotification, , setNotificationType] =
    useContext(NotificationContext)!;

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [priority, setPriority] = useState("Low");
  let [completed, setCompleted] = useState(false);

  // Validation
  let [titleError, setTitleError] = useState("");
  let [descriptionError, setDescriptionError] = useState("");
  return (
    <>
      <div
        onClick={() => setShowAddTask(false)}
        className="absolute z-50 min-h-[calc(100vh)] left-0 top-0 w-full bg-gray-900 opacity-60"
      ></div>
      <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-[90%] max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Add Task</h2>
          <button
            onClick={() => setShowAddTask(false)}
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
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="text-red-500 mb-4">{titleError}</p>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          placeholder="Task description"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p className="text-red-500 mb-4">{descriptionError}</p>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Priority
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
            if (title != "" && description != "") {
              const newTask = {
                title,
                description,
                priority,
                completed,
                userId: localStorage.getItem("id")
              };
              const updated = [...tasks, newTask];
              setTasks(updated);
              setShowAddTask(false);
              setNotificationType("success");
              setShowNotification(true);
              const token = localStorage.getItem("token");
              setTimeout(() => setShowNotification(false), 2000);
              await axios.post("https://dashboard-backend-ebon.vercel.app/api/tasks", newTask, {
                headers: {
                  Authorization: `Berear ${token}`,
                },
              });
            } else {
              if (title === "") {
                setTitleError("Please Enter A Title");
              } else {
                setTitleError("");
              }
              if (description === "") {
                setDescriptionError("Please Enter A Description");
              } else {
                setDescriptionError("");
              }
            }
          }}
          className="w-full p-2 bg-teal-400 text-white rounded-md hover:bg-teal-600 transition duration-300 cursor-pointer"
        >
          Add Task
        </button>
      </div>
    </>
  );
}
