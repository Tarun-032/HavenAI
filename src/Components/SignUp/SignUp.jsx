import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import Logo from '../../../src/assets/Logo2.png';
import Video from '../../../src/assets/login-background.mp4';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert("Signup successful! Please login.");
            navigate('/login');
        } else {
            const errorData = await response.json();
            console.error("Signup error response:", errorData);  // Log the error response
            alert(errorData.detail || "Signup failed");
        }
    } catch (error) {
        console.error("Error during signup:", error);  // Log the caught error
        alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <video autoPlay muted loop className="signup-background-video">
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="text-overlay">
          <h1>HavenAI</h1>
          <p>An Emotionally Intelligent Voice AI</p>
        </div>
      </div>
      <div className="signup-right">
        <div className="signup-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;