import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const [theme] = useTheme();

  const boxBg =
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-gray-200"
      : "bg-white border-gray-200 text-gray-900";

  const sectionTitle = theme === "dark" ? "text-white" : "text-gray-900";

  const sectionText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <section
      className={`min-h-screen px-6 py-16 ${
        theme === "dark" ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      {/* MAIN WRAPPER */}
      <div className="max-w-5xl mx-auto space-y-14">
        {/* 🔥 HERO SECTION */}
        <div className={`p-10 rounded-3xl border shadow-lg ${boxBg}`}>
          <h1 className="text-5xl font-extrabold text-center mb-4 bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Welcome to NoteStore
          </h1>

          <p className={`text-center text-lg max-w-3xl mx-auto ${sectionText}`}>
            NoteStore is your personal cloud notebook — designed to help you
            create, organize, prioritize, and manage your ideas effortlessly.
          </p>
        </div>

        {/* FEATURES OVERVIEW */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl shadow border ${boxBg}`}>
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-xl font-semibold mb-2">Create Notes</h3>
            <p className={sectionText}>
              Write clean and organized notes using our lightweight note editor.
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow border ${boxBg}`}>
            <div className="text-3xl mb-3">🏷️</div>
            <h3 className="text-xl font-semibold mb-2">Categories</h3>
            <p className={sectionText}>
              Categorize your notes into Work, Study, Ideas, Personal, and more.
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow border ${boxBg}`}>
            <div className="text-3xl mb-3">📌</div>
            <h3 className="text-xl font-semibold mb-2">Pin Notes</h3>
            <p className={sectionText}>
              Pin important notes to keep them at the top — always accessible.
            </p>
          </div>
        </div>

        {/* CATEGORY SECTION */}
        <div className={`p-8 rounded-3xl border shadow ${boxBg}`}>
          <h2 className={`text-3xl font-bold mb-4 ${sectionTitle}`}>
            Select Categories to Organize Smarter
          </h2>

          <p className={sectionText}>
            Notes can be grouped based on purpose such as <strong>Work</strong>,
            <strong>Study</strong>, <strong>Personal</strong>,{" "}
            <strong>Ideas</strong>,<strong>Important</strong>, and more. When
            creating a note, simply choose the category from the dropdown.
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Work", "Study", "Personal", "Ideas", "Important", "Other"].map(
              (cat) => (
                <div
                  key={cat}
                  className={`px-4 py-2 rounded-xl text-center font-medium border ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-100 border-gray-600"
                      : "bg-gray-200 text-gray-700 border-gray-300"
                  }`}
                >
                  {cat}
                </div>
              )
            )}
          </div>
        </div>

        {/* PRIORITY SECTION */}
        <div className={`p-8 rounded-3xl border shadow ${boxBg}`}>
          <h2 className={`text-3xl font-bold mb-4 ${sectionTitle}`}>
            Prioritize What Matters
          </h2>

          <p className={sectionText}>
            Assign priority to your notes:
            <strong>High</strong> (🔴),
            <strong>Medium</strong> (🟡),
            <strong>Low</strong> (🟢). This helps visually highlight what needs
            immediate attention.
          </p>

          <div className="flex gap-3 mt-4">
            <span className="px-4 py-2 rounded-full bg-red-500 text-white">
              High Priority
            </span>
            <span className="px-4 py-2 rounded-full bg-yellow-500 text-white">
              Medium Priority
            </span>
            <span className="px-4 py-2 rounded-full bg-green-500 text-white">
              Low Priority
            </span>
          </div>
        </div>

        {/* PINNING SECTION */}
        <div className={`p-8 rounded-3xl border shadow ${boxBg}`}>
          <h2 className={`text-3xl font-bold mb-4 ${sectionTitle}`}>
            Pin Notes to Keep Them Above
          </h2>

          <p className={sectionText}>
            Pinning ensures your most important notes stay on top. Just tick the{" "}
            <strong>“📌 Pin this note”</strong> option while creating or
            editing.
          </p>

          <div className="mt-4 bg-yellow-100 dark:bg-yellow-700 p-4 rounded-lg">
            <p className="font-medium">
              📌 Pinned notes appear at the top automatically.
            </p>
          </div>
        </div>

        {/* FILTERING SECTION */}
        <div className={`p-8 rounded-3xl border shadow ${boxBg}`}>
          <h2 className={`text-3xl font-bold mb-4 ${sectionTitle}`}>
            Find Notes Faster with Filters
          </h2>

          <p className={sectionText}>
            Use category and priority filters to instantly narrow down your
            notes list. This makes it incredibly easy to find exactly what you
            need.
          </p>

          <ul className={`mt-4 space-y-2 ${sectionText}`}>
            <li>• Filter by category (Work, Study, Personal…)</li>
            <li>• Filter by priority (High, Medium, Low)</li>
            <li>• Combine both filters for highly targeted results</li>
            <li>• Pinned notes still stay on top of filtered results</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="/signup"
            className="px-8 py-3 rounded-full font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Start Using NoteStore
          </a>
        </div>
      </div>
    </section>
  );
}
