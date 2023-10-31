import React from "react";
import "./index.css";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ fontWeight: isActive ? "bold" : "medium" });

export default function Header() {
  return (
    <>
      <header>
        <nav className="navbar">
          <img
            src="../../../public/Screenshot 2023-10-31 at 09.19.25.png"
            alt="logo"
          />
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
          <NavLink to="/login" style={styles}>
            {" "}
            Logout
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
