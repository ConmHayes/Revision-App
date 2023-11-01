import { useState, useEffect } from "react";
import { UsernameForm } from "../../components";

import { Link } from "react-router-dom";

import "./style.css";

localStorage.clear();
//document.body.style.backgroundImage = "url(../assets/start.svg)"

export default function LoginPage() {
  const [inputUn, setInputUn] = useState("Username");
  const [inputPw, setInputPw] = useState("Password");
  const [button_Text, setButtonText] = useState("Login")

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.remove("home-page");
    document.body.classList.remove("signup-page")

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  return (
    <>
      <div className="flexbox-container">
        <div className="flexbox-item flexbox-image-login"></div>
        <div className="flexbox-item flexbox-login-array">
          <div className="login-array">
            <h2>Login</h2>
            <UsernameForm
              inputUn={inputUn}
              setInputUn={setInputUn}
              inputPw={inputPw}
              setInputPw={setInputPw}
              button_Text={button_Text}
              setButtonText={setButtonText}
            />
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="inline-link"
                style={{ color: "#3C7F72" }}
              >
                Create one here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
