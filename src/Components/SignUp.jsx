import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({baseUrl}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }else{
      navigate("/signup");
    }
  },[]);
  const getData = async () => {
    // console.log(name, email, password);
    try {
      const results = await fetch(`${baseUrl}/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await results.json();
      // console.log(result);
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  return (
    <div className="signup-container">
      <h1>Signup Page</h1>
      <form action="#">
        <input
          className="inputBox"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="Enter Name"
        />
        <input
          className="inputBox"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          placeholder="Enter Email"
        />
        <input
          className="inputBox"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          placeholder="Enter Password"
        />
        <button type="button" onClick={getData}>Signup</button>

      </form>
    </div>
  );
}
