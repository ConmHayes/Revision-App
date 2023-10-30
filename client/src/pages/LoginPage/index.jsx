import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="flexbox-container">
        <div className="flexbox-item flexbox-image-login"></div>
        <div className="flexbox-item flexbox-login-array">
          <div className="login-array">
            <h2>Login</h2>
          </div>
        </div>
      </div>
    </>
  );
}
