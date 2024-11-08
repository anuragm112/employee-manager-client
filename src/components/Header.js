// src/components/Header.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // Hide header on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");  // Remove stored username
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/employee-list" className="nav-link">Employee List</Link>
      </nav>
      {username && (
        <div className="user-info">
          <span>Welcome, {username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </header>
  );
}
