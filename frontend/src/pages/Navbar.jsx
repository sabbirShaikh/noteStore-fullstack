import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const { isLogin } = useAuth();
  const [theme, setTheme] = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const themes = {
    light: "bg-blue-50 text-gray-900",
    dark: "bg-gray-900 text-white",
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md transition font-medium ${
      isActive ? "bg-indigo-600 text-white" : "opacity-80 hover:opacity-100"
    }`;

  return (
    <nav
      className={`${themes[theme]} border-b border-gray-300 dark:border-gray-700`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-indigo-500 transition"
        >
          NoteStore
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>

          {isLogin ? (
            <NavLink to="/logout" className={linkClasses}>
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup" className={linkClasses}>
                Signup
              </NavLink>

              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
            </>
          )}

          {/* THEME TOGGLE */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-6 bg-gray-400 rounded-full flex items-center px-1 transition"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition 
              ${theme === "dark" ? "translate-x-6" : ""}`}
            ></div>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div
          className={`md:hidden px-4 pb-4 space-y-3 transition-all ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-blue-50 text-gray-900"
          }`}
        >
          <NavLink
            to="/"
            className={linkClasses}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>

          {isLogin ? (
            <NavLink
              to="/logout"
              className={linkClasses}
              onClick={() => setMobileOpen(false)}
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={linkClasses}
                onClick={() => setMobileOpen(false)}
              >
                Signup
              </NavLink>

              <NavLink
                to="/login"
                className={linkClasses}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </NavLink>
            </>
          )}

          {/* THEME TOGGLE MOBILE */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-6 bg-gray-400 rounded-full flex items-center px-1 transition mt-2"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition 
              ${theme === "dark" ? "translate-x-6" : ""}`}
            ></div>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
