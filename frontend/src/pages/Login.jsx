import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();
  const [theme] = useTheme();
  const [user, setUser] = useState({
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

  async function loginBtn() {
    if (!user.password || !user.email) {
      alert("All fields are required...");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLogin(true);
        navigate("/");
      }
    } catch (error) {
      alert(data.message);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`w-full mt-10 max-w-sm m-auto ${themes[theme]} shadow-md rounded-lg p-6 space-y-4`}
      >
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

        <button
          onClick={loginBtn}
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium 
               hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
