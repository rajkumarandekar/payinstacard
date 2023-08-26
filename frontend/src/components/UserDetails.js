import { useState, useEffect } from "react";

import axios from "axios";

import "./UserDetails.css";

function UserDetails() {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Log the retrieved token for debugging
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log("Headers:", headers); // Log the headers for debugging
        const res = await axios.get("http://localhost:3000/api/userdetails", {
          headers: headers,
        });
        setUserDetails(res.data);
      } catch (err) {
        console.log("User Details Error:", err.response.data.message);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">User Details Page</h1>
        <p className="label">User ID :</p>
        <p className="value">{userDetails._id}</p>
        <p className="label">Username :</p>
        <p className="value"> {userDetails.username}</p>
        <p className="label">Email :</p>
        <p className="value">{userDetails.email}</p>
        <p className="label">Contact :</p>
        <p className="value">{userDetails.contact}</p>
      </div>
    </div>
  );
}

export default UserDetails;
