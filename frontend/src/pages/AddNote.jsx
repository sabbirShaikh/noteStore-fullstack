import React, { useEffect } from "react";
import { useState } from "react";
import { authfetch } from "../utils/request";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function AddNote({ getNotes, editData, setEditData }) {
  const { isLogin } = useAuth();
  const [theme] = useTheme();
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (editData) {
      setFields({
        title: editData.title,
        content: editData.content,
      });
    }
  }, [editData]);

  const themes = {
    light: "bg-white text-gray-900 border border-gray-200 shadow-md",
    dark: "bg-gray-900 text-gray-100 border border-gray-800 shadow-lg",
  };

  function addInputs(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFields({ ...fields, [name]: value });
  }

  function clearInp() {
    setFields({
      title: "",
      content: "",
    });
    setEditData(null);
  }

  async function addNoteBtn() {
    if (isLogin) {
      if (editData) {
        try {
          const data = await authfetch(
            `http://localhost:8000/api/v1/notes/update/${editData.id}`,
            {
              method: "put",
              body: JSON.stringify(fields),
            }
          );
          if (data.success) {
            getNotes();
            setFields({
              title: "",
              content: "",
            });
            setEditData(null);
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        if (!fields.title || !fields.content) {
          alert("Provide all the input fields");
        }
        try {
          const data = await authfetch("http://localhost:8000/api/v1/notes", {
            method: "post",
            body: JSON.stringify(fields),
          });
          if (data.success) getNotes();
        } catch (error) {
          alert(data.message);
        }
      }
    } else {
      alert("login to add notes....");
      setFields({
        title: "",
        content: "",
      });
    }
  }

  return (
    <>
      <div
        className={`w-full mt-5 max-w-4xl mx-auto ${themes[theme]} shadow-md rounded-lg p-5 space-y-5`}
      >
        <input
          type="text"
          name="title"
          onChange={addInputs}
          value={fields.title}
          required
          placeholder="Enter Title"
          className={`w-full rounded-md px-3 py-2 border transition
                 ${
                   theme === "dark"
                     ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400"
                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
                 }`}
        />

        <textarea
          name="content"
          onChange={addInputs}
          value={fields.content}
          required
          placeholder="Enter Content"
          rows={4}
          className={`w-full rounded-md px-3 py-2 border resize-y transition
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
                }
              `}
        ></textarea>

        {editData ? (
          <div className="flex items-center gap-3">
            <button
              onClick={clearInp}
              className="w-full bg-red-500 text-white py-2 rounded-md font-medium 
               hover:bg-red-600 hover:cursor-pointer transition"
            >
              Cancel
            </button>
            <button
              onClick={addNoteBtn}
              className="w-full bg-green-600 text-white py-2 rounded-md font-medium 
               hover:bg-green-700 hover:cursor-pointer transition"
            >
              Update Note
            </button>
          </div>
        ) : (
          <button
            onClick={addNoteBtn}
            className="w-full bg-green-600 text-white py-2 rounded-md font-medium 
               hover:bg-green-700 transition"
          >
            Add Note
          </button>
        )}
      </div>
    </>
  );
}

export default AddNote;
