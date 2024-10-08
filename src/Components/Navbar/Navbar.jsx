// src/Components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './navbar.css';
import Logo from '../../../src/assets/Logo2.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#history">History</a></li>
          <li>
            <div className="login-button">
              {/* Use Link to navigate to login route */}
              <Link to="/login">Login</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
