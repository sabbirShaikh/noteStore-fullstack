import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Signup() {
  const navigate = useNavigate();
  const [theme] = useTheme();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const themes = {
    light:
      "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500",
    dark: "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400",
  };

  const inputClass = `
  w-full rounded-md px-3 py-2 border transition
  ${
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
  }
`;

  function setDatas(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  async function signupBtn() {
    if (!user.name || !user.password || !user.email) {
      alert("All fields are required...");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) navigate("/login");
    } catch (error) {
      alert(data.message);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`w-full mt-10 ${themes[theme]} max-w-sm mx-auto shadow-md rounded-lg p-6 space-y-4`}
      >
        {/* Name */}
        <div>
          <label
            className={`block font-medium mb-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            onChange={setDatas}
            required
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label
            className={`block font-medium mb-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={setDatas}
            required
            className={inputClass}
          />
        </div>

        {/* Password */}
        <div>
          <label
            className={`block font-medium mb-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={setDatas}
            required
            className={inputClass}
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={signupBtn}
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium
               hover:bg-indigo-700 transition"
        >
          Signup
        </button>
      </form>
    </>
  );
}

export default Signup;
