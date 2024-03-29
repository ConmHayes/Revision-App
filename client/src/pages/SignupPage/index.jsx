import React from "react";
import { useState, useEffect } from "react";
import { UsernameForm } from "../../components";
import "./style.css"
import { Link } from "react-router-dom"


export default function SignupPage() {
  const [inputUn, setInputUn] = useState("Username");
  const [inputPw, setInputPw] = useState("Password");
  const [button_Text, setButtonText] = useState("Create Account")

  useEffect(() => {
    document.body.classList.add("signup-page");
    document.body.classList.remove("home-page");
    document.body.classList.remove("login-page")
    document.body.classList.remove("notes-page")

    return () => {
      document.body.classList.remove("signup-page");
    };
  }, []);


  return (
    <>
      <div className="flexbox-container">
      <div className="flexbox-item-login flexbox-login-array" >
          <div className="login-array" >
            <h2>Register</h2>
            <UsernameForm
              inputUn={inputUn}
              setInputUn={setInputUn}
              inputPw={inputPw}
              setInputPw={setInputPw}
              button_Text = {button_Text}
              setButtonText = {setButtonText}
            />
            <p>
              Already have an account?{" "}
              <Link
                to="/"
                className="inline-link"
                style={{ color: "#3C7F72" }}
              >
                Back to Login
              </Link>
            </p>
          </div>
          


        </div>
        <div className="flexbox-item-login flexbox-image-login"></div>
      </div>
    </>
  );
}
