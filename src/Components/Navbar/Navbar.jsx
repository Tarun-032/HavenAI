import React from 'react';
import './navbar.css'; // We'll create this CSS file next

import Logo from '../../../src/assets/Logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <ul className="navbar-menu">
          <li><a href="#affiliates">Affiliates</a></li>
          <li><a href="#docs">Docs</a></li>
          <li><a href="#price">Price</a></li>
          <li><a href="#history">History</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;