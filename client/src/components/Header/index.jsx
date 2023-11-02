import React from "react";
import "animate.css";
import "./index.css";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ fontWeight: isActive ? "bold" : "medium" });

export default function Header() {
  function handleClick() {
    localStorage.clear();
  }
  return (
    <>
      <header>
        <nav className="navbar">
          <img src="../../../logo.png" alt="logo" />
          <NavLink className="white" to="/" style={styles}>
            {" "}
            🏡 Home{" "}
          </NavLink>
          <NavLink to="/timetables" style={styles} className="white">
            🗓️ Timetables{" "}
          </NavLink>
          <NavLink className="white" to="/notes" style={styles}>
            📝 Notes
          </NavLink>
          <NavLink
            className="yellow"
            to="/"
            style={styles}
            onClick={handleClick}
          >
            {" "}
            🔒 Logout
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
