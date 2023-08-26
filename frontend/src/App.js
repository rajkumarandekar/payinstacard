import { Link, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import "./App.css";
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="userdetails">User Details</Link>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdetails" element={<UserDetails />} />
      </Routes>
    </div>
  );
}
export default App;
