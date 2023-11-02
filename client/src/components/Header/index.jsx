import React from "react";
import "./index.css";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ fontWeight: isActive ? "bold" : "medium" });

export default function Header() {
  function handleClick(){
    localStorage.clear()
  }
  return (
    <>
      <header>
        <nav className="navbar">
          <img src="../../../logo.png" alt="logo" />
          <NavLink to="/" style={styles}>
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/timetables" style={styles}>
            Timetables{" "}
          </NavLink>
          <NavLink to="/notes" style={styles}>
            Notes
          </NavLink>
          <NavLink to="/login" style={styles} onClick={handleClick}>
            {" "}
            Logout
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
