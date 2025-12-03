import React, { useEffect, useState } from "react";
import { authfetch } from "../utils/request";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function AddNote({ getNotes, editData, setEditData }) {
  const { isLogin } = useAuth();
  const [theme] = useTheme();

  // Now includes new fields
  const [fields, setFields] = useState({
    title: "",
    content: "",
    category: "",
    priority: "",
    isPinned: false,
  });

  // When editing → load data into fields
  useEffect(() => {
    if (editData) {
      setFields({
        title: editData.title || "",
        content: editData.content || "",
        category: editData.category || "",
        priority: editData.priority || "",
        isPinned: editData.isPinned || false,
      });
    }
  }, [editData]);

  const themes = {
    light: "bg-white text-gray-900 border border-gray-200 shadow-md",
    dark: "bg-gray-900 text-gray-100 border border-gray-800 shadow-lg",
  };

  // Update inputs
  function addInputs(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFields({ ...fields, [name]: value });
  }

  // Reset fields
  function clearInp() {
    setFields({
      title: "",
      content: "",
      category: "",
      priority: "",
      isPinned: false,
    });
    setEditData(null);
  }

  async function addNoteBtn() {
    if (!isLogin) {
      alert("Login to add notes...");
      clearInp();
      return;
    }

    if (!fields.title || !fields.content) {
      alert("Provide all the input fields");
      return;
    }

    try {
      if (editData) {
        // UPDATE NOTE
        const data = await authfetch(
          `http://localhost:8000/api/v1/notes/update/${editData.id}`,
          {
            method: "put",
            body: JSON.stringify(fields),
          }
        );

        if (data.success) {
          getNotes();
          clearInp();
        }
      } else {
        // CREATE NEW NOTE
        const data = await authfetch("http://localhost:8000/api/v1/notes", {
          method: "post",
          body: JSON.stringify(fields),
        });

        if (data.success) {
          getNotes();
          clearInp();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div
      className={`w-full mt-5 max-w-4xl mx-auto ${themes[theme]} shadow-md rounded-lg p-5 space-y-5`}
    >
      {/* TITLE INPUT */}
      <input
        type="text"
        name="title"
        onChange={addInputs}
        value={fields.title}
        placeholder="Enter Title"
        className={`w-full rounded-md px-3 py-2 border transition
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
          }`}
      />

      {/* CONTENT INPUT */}
      <textarea
        name="content"
        onChange={addInputs}
        value={fields.content}
        placeholder="Enter Content"
        rows={4}
        className={`w-full rounded-md px-3 py-2 border resize-y transition
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
          }`}
      ></textarea>

      {/* CATEGORY */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="category"
          onChange={addInputs}
          value={fields.category}
          className={`w-full rounded-md px-3 py-2 border transition
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>
          <option value="Important">Important</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* PRIORITY */}
      <div>
        <label className="block mb-1 font-medium">Priority</label>
        <select
          name="priority"
          onChange={addInputs}
          value={fields.priority}
          className={`w-full rounded-md px-3 py-2 border transition
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
        >
          <option value="">Select Priority</option>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
      </div>

      {/* PIN NOTE */}
      <div className="flex items-center gap-3 mt-2">
        <input
          type="checkbox"
          name="isPinned"
          checked={fields.isPinned}
          onChange={(e) => setFields({ ...fields, isPinned: e.target.checked })}
          className="h-4 w-4 cursor-pointer"
        />
        <label className="font-medium cursor-pointer">📌 Pin this note</label>
      </div>

      {/* ACTION BUTTONS */}
      {editData ? (
        <div className="flex items-center gap-3">
          <button
            onClick={clearInp}
            className="w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={addNoteBtn}
            className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
          >
            Update Note
          </button>
        </div>
      ) : (
        <button
          onClick={addNoteBtn}
          className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
        >
          Add Note
        </button>
      )}
    </div>
  );
}

export default AddNote;
