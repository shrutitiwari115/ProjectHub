import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Navbar/Hero";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserProfile from "./Pages/UserProfile";
import ProjectManagement from "./Pages/ProjectManagement";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content-layout">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Hero />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/profile" element={<UserProfile />} />
          <Route path="/features/pm" element={<ProjectManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
