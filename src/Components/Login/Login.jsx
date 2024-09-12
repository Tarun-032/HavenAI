// src/Components/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your authentication logic
    if (username === 'admin' && password === 'password') {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      {/* Left side with video and text */}
      <div className="login-left">
        <video autoPlay muted loop className="background-video">
          <source src="your-video-file.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="text-overlay">
          <h1>Enhance Efficiency with Our Dashboard</h1>
          <p>Stay organized in law enforcement!</p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="login-right">
        <div className="login-logo">
          <img src="your-logo.png" alt="KSP" />
        </div>
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
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
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="forgot-password">
            <a href="#">Forgot your password? Click Here</a>
          </div>
          <div className="signup-link">
            <p>Don't have an account? <a href="#">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
