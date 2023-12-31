import { useEffect, useState } from "react";
import { UsernameForm } from "../../Components";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [inputUn, setInputUn] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flexbox-container">
        <div className="flexbox-item flexbox-image-login"></div>
        <div className="flexbox-item flexbox-login-array">
          <div className="login-array">
            <h2>Login</h2>
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
      </div>
    </>
  );
}
