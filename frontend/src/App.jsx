import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./pages/Navbar";
import LogoutConfirm from "./pages/LogoutConfirm";
import ThemeContext from "./context/ThemeContext";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeContext>
            <Navbar />
            <Routes>
              <Route path="/" element={<ViewNotes />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<LogoutConfirm />} />
            </Routes>
          </ThemeContext>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
