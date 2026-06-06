import Header from "./Components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterContext } from "./RegisterContext";
import { useContext } from "react";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [emailInput, setEmailInput] = useState("");
  let [passwordInput, setPasswordInput] = useState("");

  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");

  let [isRegistered, setIsRegistered] = useContext(RegisterContext)!;

  return (
    <div>
      <Header isRegistered={isRegistered} setIsRegistered={setIsRegistered} />
      <div className="relative min-h-[calc(100vh)] bg-linear-to-r from-teal-400 to-teal-600">
        <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-[90%] max-w-sm">
          <h2 className="text-lg text-center font-bold mb-4">
            Login to Your Account
          </h2>
          <p className="text-sm text-gray-400 text-center font-light mb-4">
            Login Now. Don't have an account?{" "}
            <a
              className="text-teal-500 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </a>
          </p>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <p className="text-sm text-red-500 mt-1">{emailError}</p>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1 mt-4"
          >
            Password
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          <p className="text-sm text-red-500 mt-1">{passwordError}</p>
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (emailInput === "") {
                return setEmailError("Please enter your email");
              }
              if (!emailInput.includes("@")) {
                return setEmailError("Please enter a valid email address");
              }
              if (passwordInput === "") {
                return setPasswordError("Please enter your password");
              }
              if (passwordInput.length < 8) {
                return setPasswordError(
                  "Password must be at least 8 characters long",
                );
              }

              
              try {
                const res = await axios.post(
                  "https://dashboard-backend-ebon.vercel.app/api/users/login",
                  {
                    email: emailInput,
                    password: passwordInput,
                  },
                );
                localStorage.setItem("token", res.data.data.token);
                setIsRegistered(true);
                localStorage.removeItem("tasks")
                window.dispatchEvent(new Event("userLoggedIn"));
                localStorage.setItem("isRegistered", "true");
                navigate("/");
              } catch (error: any) {
                const message = error.response?.data?.message;
               
                if (message === "Email not found") {
                  setEmailError("Email not found");
                } else if (message === "Incorrect password") {
                  setEmailError("");
                  setPasswordError("Incorrect password");
                } else {
                  setPasswordError("Something went wrong, try again");
                }
              }
            }}
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mt-4 cursor-pointer"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          className="absolute top-25 left-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-150 cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
}
