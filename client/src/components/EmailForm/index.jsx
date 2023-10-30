import React from "react";

export default function EmailForm({ username, setUsername }) {
  return (
    <form id="login">
      <label htmlFor="username" className="input-label">
        <i className="material-icons">person</i>
        <input
          className="Input"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
      </label>
    </form>
  );
}
