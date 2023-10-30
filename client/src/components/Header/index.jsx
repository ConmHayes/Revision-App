import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ fontWeight: isActive ? "bold" : "medium" });

export default function Header() {
  return (
    <>
      <header>
        <nav>
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
