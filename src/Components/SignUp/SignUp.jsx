import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import Logo from '../../../src/assets/Logo2.png';
import Video from '../../../src/assets/login-background.mp4';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Replace with your signup logic
    if (password === confirmPassword) {
      // Add signup logic here
      navigate('/login'); // Redirect to login after successful sign up
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="signup-container">
      {/* Left side with video and text */}
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

      {/* Right side with sign-up form */}
      <div className="signup-right">
        <div className="signup-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h2>Create Account</h2>
        <form onSubmit={handleSignUp}>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
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
          <button type="submit" className="signup-btn">Sign Up</button>
          <div className="login-link">
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;