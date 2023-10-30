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

  async function handleSubmit(e) {
    e.preventDefault();

    setUsername(inputUn);
    setPassword(inputPw);
    setInputPw("Password");
    setInputUn("Username");
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
          value={username}
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
          value={password}
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
      <button className="loginButton" type="submit" onSubmit={handleSubmit}>
        {" "}
      </button>
    </form>
  );
}
