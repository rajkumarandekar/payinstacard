import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandle = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      console.log("Login Successful");
      alert("Successfully LoggedIn");
      navigate("/userdetails");
    } catch (err) {
      console.log("Login error", err.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading">Login Here</h2>
        <div>
          <label className="label" htmlFor="login">
            Username:
            <input
              type="text"
              className="input"
              placeholder="username"
              value={username}
              id="login"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="label" htmlFor="password">
            Password:
            <input
              type="password"
              className="input"
              placeholder="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="button" onClick={loginHandle}>
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
