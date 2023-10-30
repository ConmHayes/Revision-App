import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({fontWeight: isActive ? "bold"})

export default function Header(){
    return (
        <header>
            <nav>
                <NavLink to = "/" style = { styles }
            </nav>
        </header>
    )
}