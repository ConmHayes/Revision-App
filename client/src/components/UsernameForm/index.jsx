import React from "react";

export default function EmailForm({
  username,
  setUsername,
  password,
  setPassword,
  inputUn,
  setInputUn,
  inputPw,
  setInputPw,
}) {
  function handleInputUN(e) {
    setInputUn(e.target);
  }
  function handleInputPW(e) {
    setInputPw(e.target);
  }
  function revealPassword() {
    const x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

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
          onChange={handleInputUN}
        />
      </label>
      <label htmlFor="password" className="input-label">
        <i className="material-icons">lock</i>
        <input
          className="Input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleInputPW}
        ></input>
      </label>
      <label>
        <input
          className="showPassword"
          type="checkbox"
          onClick={revealPassword}
        />
      </label>
    </form>
  );
}
