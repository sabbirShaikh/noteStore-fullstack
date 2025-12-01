import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogoutConfirm() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function confirmLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
        {/* Confirmation Dialog Box */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100">
          {/* Title/Message */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Are you sure you want to logout?
          </h3>

          {/* Buttons Container */}
          <div className="flex justify-around space-x-4">
            {/* Cancel Button */}
            <button
              onClick={() => navigate("/")}
              className="flex-1 px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>

            {/* Confirm Button (Destructive Action) */}
            <button
              onClick={confirmLogout}
              className="flex-1 px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogoutConfirm;
