import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLogin } = useAuth();
  const [theme, setTheme] = useTheme();
  const location = useLocation();

  const themes = {
    light: "bg-blue-50 text-black",
    dark: "bg-gray-900 text-white",
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav>
      <div
        className={`max-w-full ${themes[theme]} mx-auto flex justify-between items-center p-4`}
      >
        {/* Left side: Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-indigo-500 transition"
        >
          NoteStore
        </Link>

        {/* Right side: Nav Links + Toggle */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {isLogin ? (
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "opacity-80 hover:opacity-100"
                }`
              }
            >
              LOGOUT
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "opacity-80 hover:opacity-100"
                  }`
                }
              >
                SIGNUP
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "opacity-80 hover:opacity-100"
                  }`
                }
              >
                LOGIN
              </NavLink>
            </>
          )}

          {/* Toggle Button (moved here to the right) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-6 bg-gray-400 rounded-full flex items-center px-1 transition"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition
          ${theme === "dark" ? "translate-x-6" : ""}`}
            ></div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
