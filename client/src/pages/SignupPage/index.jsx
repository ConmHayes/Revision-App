import React from "react";
import { useState } from "react";
import { UsernameForm } from "../../Components";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [inputUn, setInputUn] = useState("Username");
  const [inputPw, setInputPw] = useState("Password");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flexbox-container">
        <div className="flexbox-item flexbox-login-array">
          <div className="login-array">
            <h2>Register</h2>
            <UsernameForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              inputUn={inputUn}
              setInputUn={setInputUn}
              inputPw={inputPw}
              setInputPw={setInputPw}
            />
          </div>
        </div>
        <div className="flexbox-item flexbox-image-login"></div>
      </div>
    </>
  );
}