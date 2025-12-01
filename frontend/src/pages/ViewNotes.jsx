import React, { useEffect, useState } from "react";
import { authfetch } from "../utils/request";
import AddNote from "./AddNote";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function ViewNotes() {
  const { isLogin } = useAuth();
  const [notes, setNotes] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openNote, setOpenNote] = useState(null);
  const [theme] = useTheme();

  useEffect(() => {
    if (isLogin) getNotes();
  }, [isLogin]);

  const themes = {
    light: "bg-white text-gray-900 border border-gray-200 shadow-md",
    dark: "bg-gray-900 text-gray-100 border border-gray-800 shadow-lg",
  };

  async function getNotes() {
    try {
      const data = await authfetch("http://localhost:8000/api/v1/notes/");
      if (data.success && Array.isArray(data.notes)) {
        setNotes(data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.log(error.message);
      setNotes([]);
    }
  }

  async function completeBtn(id) {
    try {
      const data = await authfetch(`http://localhost:8000/api/v1/notes/${id}`, {
        method: "put",
      });
      if (data.success) getNotes();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteBtn(id) {
    try {
      const data = await authfetch(`http://localhost:8000/api/v1/notes/${id}`, {
        method: "delete",
      });
      if (data.success) getNotes();
    } catch (error) {
      console.log(error.message);
    }
  }

  // expand/collapse toggle
  const toggleNote = (id) => {
    setOpenNote(openNote === id ? null : id);
  };

  return (
    <>
      <AddNote
        getNotes={getNotes}
        editData={editData}
        setEditData={setEditData}
      />

      <div className="space-y-4 max-w-3xl m-auto mt-6">
        {notes.length > 0 && isLogin ? (
          notes.map((n) => (
            <div
              key={n._id}
              className={`${themes[theme]} shadow-md rounded-lg p-4 border border-gray-200`}
            >
              {/* Header Section */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleNote(n._id)}
              >
                <div>
                  <h3
                    className={`${
                      n.isCompleted ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {n.createdAt.split("T")[0]}
                  </p>
                </div>

                {/* Expand / Collapse Icon */}
                {openNote === n._id ? (
                  <IoIosArrowUp className="text-xl text-gray-600" />
                ) : (
                  <IoIosArrowDown className="text-xl text-gray-600" />
                )}
              </div>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openNote === n._id ? "max-h-screen mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 mb-4">{n.content}</p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => completeBtn(n._id)}
                    className={`px-3 py-1 hover:cursor-pointer rounded-md text-m font-medium ${
                      n.isCompleted
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    } transition`}
                  >
                    {n.isCompleted ? "Completed" : "Incomplete"}
                  </button>

                  <button
                    onClick={() =>
                      setEditData({
                        id: n._id,
                        title: n.title,
                        content: n.content,
                      })
                    }
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md text-m hover:cursor-pointer hover:bg-blue-700 transition"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => deleteBtn(n._id)}
                    className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-md text-m hover:cursor-pointer hover:bg-red-700 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center text-gray-500 text-lg">No notes found.</h3>
        )}
      </div>
    </>
  );
}

export default ViewNotes;
