import AddTask from "./AddTask";
import { useContext, useState } from "react";
import Bars from "./Bars";
import RightSideBar from "../Components/RightSideBar";
import { TasksContext } from "../TasksContext";
export default function Header({
  isRegistered,
  setIsRegistered,
}: {
  isRegistered?: null | boolean;
  setIsRegistered?: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks?: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  let [showAddTask, setShowAddTask] = useState(false);
  let [showMobileSidebar, setShowMobileSidebar] = useState(false);
  let [tasks] = useContext(TasksContext)!;
  return (
    <>
      {showAddTask && <AddTask setShowAddTask={setShowAddTask} />}
      {showMobileSidebar && (
        <Bars
          show={showMobileSidebar}
          setShowMobileSidebar={setShowMobileSidebar}
        >
          <RightSideBar
            numTasksPending={tasks.filter((t) => !t.completed).length}
            numTasksCompleted={tasks.filter((t) => t.completed).length}
            numTasksTotal={tasks.length}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
          />
        </Bars>
      )}
      <header
        className={`flex items-center justify-between p-2 bg-white shadow-md fixed w-full z-40 h-18`}
      >
        <div className="flex items-center md:w-[60%] relative z-50">
          <img src="/images/logo.png" alt="logo" className="h-10 w-10" />
          <div className="ml-4">
            <h1 className="text-sm md:text-lg font-bold ml-2">
              Welcome to the Dashboard
            </h1>

            {isRegistered ? (
              <p className="text-sm text-gray-600">You are logged in.</p>
            ) : (
              <p className="text-sm text-gray-600">
                Please login or register to view your tasks
              </p>
            )}
          </div>
        </div>

        <div className="lg:hidden block">
          <button
            onClick={() => {
              setShowMobileSidebar(!showMobileSidebar);
            }}
            className="cursor-pointer lg:ml-4 p-2 md:px-4 md:py-2 bg-teal-400 text-white rounded-lg transition duration-300 hover:bg-teal-600 block"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>
    </>
  );
}
