import React from "react";
import { useState, useEffect } from "react";
import { UsernameForm } from "../../components";
import "./style.css"


export default function SignupPage() {
  const [inputUn, setInputUn] = useState("Username");
  const [inputPw, setInputPw] = useState("Password");
  const [button_Text, setButtonText] = useState("Create Account")

  console.log(button_Text)

  useEffect(() => {
    document.body.classList.add("signup-page");
    document.body.classList.remove("home-page");
    document.body.classList.remove("login-page")
    return () => {
      document.body.classList.remove("signup-page");
    };
  }, []);


  return (
    <>
      <div className="flexbox-container">
      <div className="flexbox-item flexbox-login-array">
          <div className="login-array">
            <h2>Register</h2>
            <UsernameForm
              inputUn={inputUn}
              setInputUn={setInputUn}
              inputPw={inputPw}
              setInputPw={setInputPw}
              button_Text = {button_Text}
              setButtonText = {setButtonText}
            />
          </div>
        </div>
        <div className="flexbox-item flexbox-image-login"></div>
      </div>
    </>
  );
}
