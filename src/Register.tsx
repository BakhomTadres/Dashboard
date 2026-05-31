import Header from "./Components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterContext } from "./RegisterContext";
import { useContext } from "react";

export default function Register() {
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  let [nameInput, setNameInput] = useState("");
  let [emailInput, setEmailInput] = useState("");
  let [passwordInput, setPasswordInput] = useState("");
  let [passwordRepeatInput, setPasswordRepeatInput] = useState("");

  let [nameError, setNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [passwordRepeatError, setPasswordRepeatError] = useState("");

  let [isRegistered, setIsRegistered] = useContext(RegisterContext)!;
  return (
    <div>
      <Header isRegistered={isRegistered} setIsRegistered={setIsRegistered} />
      <div className="relative min-h-[calc(100vh)] bg-linear-to-r from-teal-400 to-teal-600">
        <div className="absolute top-1/2 md:top-[calc(50%+40px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-[90%] max-w-sm">
          <h2 className="text-lg text-center font-bold mb-4">
            Register for an Account
          </h2>
          <p className="text-sm text-gray-400 text-center font-light mb-4">
            Register Now. Already have an account?{" "}
            <a
              className="text-teal-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </a>
          </p>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <p className="text-sm text-red-500 mt-1">{nameError}</p>
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
            className="block text-sm font-medium text-gray-700 mb-1"
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPasswordRepeat ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
            <input
              type={showPasswordRepeat ? "text" : "password"}
              id="password-repeat"
              placeholder="Confirm Password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              value={passwordRepeatInput}
              onChange={(e) => setPasswordRepeatInput(e.target.value)}
            />
          </div>
          <p className="text-sm text-red-500 mt-1">{passwordRepeatError}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (
                nameInput !== "" &&
                emailInput !== "" &&
                passwordInput !== "" &&
                passwordRepeatInput !== "" &&
                emailInput.includes("@") &&
                passwordInput.length >= 8 &&
                passwordInput === passwordRepeatInput
              ) {
                localStorage.setItem("name", nameInput);
                localStorage.setItem("email", emailInput);
                localStorage.setItem("password", passwordInput);
                setIsRegistered(true);
                localStorage.setItem("isRegistered", "true");
                navigate("/");
              } else {
                if (nameInput === "") {
                  setNameError("Please enter your name");
                } else {
                  setNameError("");
                }
                if (emailInput === "") {
                  setEmailError("Please enter your email");
                } else if (!emailInput.includes("@")) {
                  setEmailError("Please enter a valid email address");
                } else {
                  setEmailError("");
                }
                if (passwordInput === "") {
                  setPasswordError("Please enter your password");
                } else if (passwordInput.length < 8) {
                  setPasswordError(
                    "Password must be at least 8 characters long",
                  );
                } else {
                  setPasswordError("");
                }
                if (passwordRepeatInput === "") {
                  setPasswordRepeatError("Please confirm your password");
                } else if (passwordRepeatInput !== passwordInput) {
                  setPasswordRepeatError("Passwords do not match");
                } else {
                  setPasswordRepeatError("");
                }
              }
            }}
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mt-4 cursor-pointer"
          >
            Register
          </button>
        </div>
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
