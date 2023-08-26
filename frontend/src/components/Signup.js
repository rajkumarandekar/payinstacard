import { useState } from "react";
import axios from "axios";

import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const signupHandle = async () => {
    try {
      await axios.post("http://localhost:3000/api/signup", {
        username: username,
        password: password,
        email: email,
        contact: contact,
      });
      
      console.log("Signup Successful");
      alert("Successfully Signup !");

      navigate("/login");
    } catch (err) {
      console.log("Signup error", err);
      console.log("Response data:", err.response?.data);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading">Signup Here</h2>
        <div>
          <label className="label" htmlFor="username">
            username:
            <input
              className="input"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="label" htmlFor="password">
            password:
            <input
              className="input"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="label" htmlFor="email">
            email:
            <input
              className="input"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="label" htmlFor="contact">
            contact:
            <input
              className="input"
              type="text"
              placeholder="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>
          <button className="button" onClick={signupHandle}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
