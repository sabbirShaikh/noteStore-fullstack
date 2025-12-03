import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ViewNotes from "./pages/ViewNotes";
import Navbar from "./pages/Navbar";
import LogoutConfirm from "./pages/LogoutConfirm";
import ThemeContext from "./context/ThemeContext";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import About from "./pages/About";

function App() {
  const { isLogin } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isLogin ? <ViewNotes /> : <About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutConfirm />} />
      </Routes>
    </>
  );
}

export default App;
