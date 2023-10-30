import React from "react";

export default function UsernameForm({
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
    setInputUn(e.target.value);
  }
  function handleInputPW(e) {
    setInputPw(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Hi")

    setUsername(inputUn);
    setPassword(inputPw);

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
        <i className="material-icons ikon">person</i>
        <input
          className="Input"
          type="text"
          id="username"
          name="username"
          placeholder={inputUn}
          onChange={handleInputUN}
        />
      </label>
      <label htmlFor="password" className="input-label">
        <i className="material-icons ikon" >lock</i>
        <input
          className="Input"
          type="password"
          id="password"
          name="password"
          placeholder={inputPw}
          onChange={handleInputPW}
        ></input>
      </label>
      <label>
        <input
          className="showPassword"
          type="checkbox"
          onClick={revealPassword}
        />
      </label> Show Password
      <button className="loginButton" type="submit" onSubmit={handleSubmit}>
        Login
      </button>
    </form>
  );
}
