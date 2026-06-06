import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../UsersContext";
import { TasksContext } from "../TasksContext";
import EditProfile from "./EditProfile";

export default function RightSideBar({
  numTasksPending,
  numTasksCompleted,
  numTasksTotal,
  isRegistered,
  setIsRegistered,
}: {
  numTasksPending: number;
  numTasksCompleted: number;
  numTasksTotal: number;
  isRegistered: boolean | null | undefined;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  let {
    name: [name, setName],
    email: [email, setEmail],
  } = useContext(UsersContext)!;
  let [, setTasks] = useContext(TasksContext)!;
  let [showEditProfile, setShowEditProfile] = useState(false); 
  let navigate = useNavigate();
  return (
    <>
    {showEditProfile && (
      <EditProfile setShowEditProfile={setShowEditProfile} oldName={name} oldEmail={email} />
    )}
    <aside className="fixed pt-8 h-[calc(100vh-64px)] top-15 w-[calc(75%-32px)] lg:w-[30%] bg-white md:px-4">
      {isRegistered && (
        <>
          <div className="flex flex-col lg:flex-row justify-start items-center space-x-2 p-4 bg-mauve-100">
            <div onClick={() => setShowEditProfile(true)} className="flex items-center justify-center cursor-pointer w-10 h-10 p-1 rounded-full bg-teal-400 text-white font-bold text-2xl">
              {name?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-lg text-center lg:text-start font-semibold text-gray-800">
              Hello,
              <br />
              {name}
              <br />
              <span className="block mt-2 text-gray-600">{email}</span>
            </h3>
          </div>

          <div className="mt-6 p-4 bg-mauve-100 rounded-lg shadow-md grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <span className="text-xl text-gray-600 font-bold border-l-teal-400 border-l-4 pl-2">
                {numTasksTotal}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <span className="text-xl text-gray-600 font-bold border-l-blue-400 border-l-4 pl-2">
                {numTasksPending}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <span className="text-xl text-gray-600 font-bold border-l-green-400 border-l-4 pl-2">
                {numTasksCompleted}
              </span>
            </div>
          </div>
        </>
      )}
      {isRegistered && (
        <button
          onClick={() => {
            setIsRegistered?.(false);
            navigate("/login");
            localStorage.setItem("isRegistered", "false");
            localStorage.removeItem("tasks");
            localStorage.removeItem("token");
            setTasks([]);
            setName("");
            setEmail("");
          }}
          className="absolute bottom-20 left-4 cursor-pointer bg-teal-400 text-white py-2 px-4 rounded-md hover:bg-teal-500 transition-colors duration-150 w-[calc(100%-32px)]"
          >
          Log Out
        </button>
      )}
    </aside>
          </>
  );
}
