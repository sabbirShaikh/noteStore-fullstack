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
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
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
        // UI ONLY: Sort pinned notes to top
        const sorted = [...data.notes].sort(
          (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
        );
        setNotes(sorted);
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

  const toggleNote = (id) => {
    setOpenNote(openNote === id ? null : id);
  };

  const filteredNotes = notes.filter((note) => {
    return (
      (filterCategory ? note.category === filterCategory : true) &&
      (filterPriority ? note.priority === filterPriority : true)
    );
  });

  return (
    <>
      {/* Add Note Section */}
      <AddNote
        getNotes={getNotes}
        editData={editData}
        setEditData={setEditData}
      />
      {/* FILTER SECTION */}
      <div className="max-w-4xl mx-auto mt-6 mb-4 flex flex-wrap gap-4 justify-between items-center">
        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={`px-3 py-2 rounded-md border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>
          <option value="Important">Important</option>
          <option value="Other">Other</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className={`px-3 py-2 rounded-md border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Notes List */}
      <div className="space-y-4 max-w-4xl m-auto mt-6">
        {filteredNotes.length > 0 && isLogin ? (
          filteredNotes.map((n) => (
            <div
              key={n._id}
              className={`${themes[theme]} rounded-xl p-5 border transition shadow-md hover:shadow-lg`}
            >
              {/* TOP HEADER */}
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleNote(n._id)}
              >
                <div className="space-y-1">
                  {/* TITLE + PIN */}
                  <div className="flex items-center gap-2">
                    {n.isPinned && (
                      <span className="text-yellow-500 text-xl">📌</span>
                    )}
                    <h3
                      className={`text-xl font-semibold ${
                        n.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {n.title}
                    </h3>
                  </div>

                  {/* META INFO (Category + Priority + Date) */}
                  <div className="flex items-center flex-wrap gap-2 mt-1">
                    {/* Category */}
                    {n.category && (
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium
            ${
              theme === "dark"
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
                      >
                        {n.category}
                      </span>
                    )}

                    {/* Priority */}
                    {n.priority && (
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold
            ${
              n.priority === "High"
                ? "bg-red-200 text-red-700"
                : n.priority === "Medium"
                ? "bg-yellow-200 text-yellow-700"
                : "bg-green-200 text-green-700"
            }`}
                      >
                        {n.priority}
                      </span>
                    )}

                    {/* Date */}
                    <span className="text-xs text-gray-400 ml-1">
                      {n.createdAt?.split("T")[0]}
                    </span>
                  </div>
                </div>

                {/* Expand / Collapse Arrow */}
                <div className="pt-1">
                  {openNote === n._id ? (
                    <IoIosArrowUp className="text-xl text-gray-500" />
                  ) : (
                    <IoIosArrowDown className="text-xl text-gray-500" />
                  )}
                </div>
              </div>

              {/* COLLAPSIBLE CONTENT */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openNote === n._id ? "max-h-screen mt-4" : "max-h-0"
                }`}
              >
                {/* CONTENT */}
                <p
                  className={`leading-relaxed mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {n.content}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center flex-wrap gap-3 mt-3">
                  {/* COMPLETE */}
                  <button
                    onClick={() => completeBtn(n._id)}
                    className={`px-4 py-1.5 rounded-md font-medium text-sm transition
        ${
          n.isCompleted
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-yellow-500 text-white hover:bg-yellow-600"
        }`}
                  >
                    {n.isCompleted ? "Completed" : "Mark Complete"}
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() =>
                      setEditData({
                        id: n._id,
                        title: n.title,
                        content: n.content,
                        category: n.category,
                        priority: n.priority,
                        isPinned: n.isPinned,
                      })
                    }
                    className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                  >
                    <FaEdit /> Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteBtn(n._id)}
                    className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
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
