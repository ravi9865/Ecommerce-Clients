import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ baseUrl }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleLogin = async (e) => {
    console.log(email, password);
    try {
      let result = await fetch(`${baseUrl}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      result = await result.json();
      // console.log(result);
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("please enter correct details");
      }
    } catch (error) {
      alert("Internal Server Error");
      console.log(error);
    }
  };
  return (
    <div className="signup-container">
      <h1>Login Page</h1>
      <form action="#">
        <input
          className="inputBox"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Enter Email"
        />
        <input
          className="inputBox"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter Password"
        />
        <button onClick={(e) => handleLogin(e)} type="button">
          Login
        </button>
      </form>
    </div>
  );
}
