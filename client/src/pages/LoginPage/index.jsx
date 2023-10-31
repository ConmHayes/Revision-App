import { useState } from "react";
import { UsernameForm } from "../../Components";
import { Link } from "react-router-dom"

localStorage.clear();
//document.body.style.backgroundImage = "url(./assets/start.svg)"

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [inputUn, setInputUn] = useState("Username");
  const [inputPw, setInputPw] = useState("Password");
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
            <p>Don't have an account? <Link to = "/signup" className = "inline-link" style = {{ color : "#3C7F72" }}>Create one here!</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
