import axios from "axios";
import { useState, useContext } from "react";
import {UsersContext} from "../UsersContext.tsx";
export default function EditProfile({
  setShowEditProfile,
  oldName,
  oldEmail,
}: {
  setShowEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  oldName: string;
  oldEmail: string;
}) {
  const [name, setName] = useState(oldName);
  const [email, setEmail] = useState(oldEmail);
  let {
      name: [, setGlobalName],
      email: [, setGlobalEmail],
    } = useContext(UsersContext)!;
  return (
    <>
      <div
        onClick={() => setShowEditProfile(false)}
        className="fixed z-50 inset-0 bg-gray-900 opacity-60"
      ></div>
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-[90%] max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
          <button
            onClick={() => setShowEditProfile(false)}
            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div
          onClick={() => setShowEditProfile(true)}
          className="flex items-center justify-center w-10 h-10 p-1 my-2 rounded-full bg-teal-400 text-white font-bold text-2xl"
        >
          {name?.charAt(0).toUpperCase()}
        </div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          placeholder="Profile Name"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <textarea
          placeholder="Profile Email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></textarea>

        <button
          onClick={async () => {
            const token = localStorage.getItem("token")
            axios.patch("https://dashboard-backend-ebon.vercel.app/api/users/me", {name,email}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShowEditProfile(false);
            setGlobalName(name);
            setGlobalEmail(email)
          }}
          className="cursor-pointer w-full p-2 bg-teal-400 text-white rounded-md hover:bg-teal-600 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
