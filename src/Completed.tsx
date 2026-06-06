import Header from "./Components/Header";
import { useContext, useState } from "react";
import SideBar from "./Components/SideBar";
import BottomNav from "./Components/BottomNav";
import { RegisterContext } from "./RegisterContext";
import { TasksContext } from "./TasksContext";
import EditTask from "./Components/EditTask";
import RightSideBar from "./Components/RightSideBar";
import TaskCard from "./Components/TaskCard";
import { useNavigate } from "react-router-dom";
import AddTask from "./Components/AddTask";

export default function Completed() {

  let [active, setActive] = useState("completed");
  let [activeFilter, setActiveFilter] = useState("all");
  let [isRegistered, setIsRegistered] = useContext(RegisterContext)!;
  let [tasks, setTasks] = useContext(TasksContext)!;
  let [showEditTask, setShowEditTask] = useState(false);
  let [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  let navigate = useNavigate();
  let [showAddTask, setShowAddTask] = useState(false);
  const filters = ["all", "Low", "Medium", "High"];

  return (
    <>
      {showEditTask && editingTaskId !== null && (
        <EditTask setShowEditTask={setShowEditTask} taskId={editingTaskId} />
      )}
      {showAddTask && <AddTask setShowAddTask={setShowAddTask} />}
      <Header
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        setTasks={setTasks}
      />
      <SideBar active={active} setActive={setActive} />
      <BottomNav active={active} setActive={setActive} />

      <div className="flex flex-col lg:flex-row">
         <div className="pl-4 md:pl-20 py-25 pr-4 md:pb-6 min-h-[calc(100vh)] w-full lg:w-[70%] bg-mauve-100 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 px-2">
              Completed Tasks
            </h2>
            <div>
              {!isRegistered ? (
              <button
                onClick={() => {
                  setIsRegistered && setIsRegistered(false);
                  localStorage.setItem("isRegistered", "false");
                  navigate("/login");
                }}
                className="cursor-pointer lg:ml-4 p-2 md:px-4 md:py-2 relative left-7/9 md:left-2/3 lg:left-2/3 sm:left-3/4 -translate-x-1/2 bottom-2 bg-teal-400 text-white rounded-lg transition duration-300 hover:bg-teal-600 block"
              >
                Login/Register
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAddTask(true);
                }}
                className="cursor-pointer lg:ml-4 p-2 md:px-4 md:py-2 relative left-7/9 md:left-2/3 lg:left-2/3 sm:left-3/4 -translate-x-1/2 bottom-2 bg-teal-400 text-white rounded-lg transition duration-300 hover:bg-teal-600 block"
              >
                Add a new task
              </button>
            )}
            <ul className="flex items-center flex-wrap gap-1 px-3 py-2 bg-white rounded-lg shadow-md">
              {filters.map((f) => (
                <li
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`cursor-pointer capitalize text-sm px-3 py-1 rounded-md transition-colors duration-150
                    ${
                      activeFilter === f
                        ? "bg-teal-400 text-white font-semibold"
                        : "text-gray-500 hover:text-teal-400"
                    }`}
                >
                  {f}
                </li>
              ))}
            </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {isRegistered && tasks
              .filter((task) => task.completed)
              .filter((task) => activeFilter === "all" || task.priority === activeFilter)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  setEditingTaskId={setEditingTaskId}
                  setShowEditTask={setShowEditTask}
                />
              ))}
            {tasks.filter((t) => t.completed && (activeFilter === "all" || t.priority === activeFilter)).length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-12">No completed tasks yet.</p>
            )}
          </div>
        </div>

        <div className="hidden lg:block lg:w-[30%]">
          <RightSideBar
            numTasksPending={tasks.filter((t) => !t.completed).length}
            numTasksCompleted={tasks.filter((t) => t.completed).length}
            numTasksTotal={tasks.length}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
          />
        </div>
      </div>
    </>
  );
}
