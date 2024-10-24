// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Videobackground from './Components/Videobackground/Videobackground';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import './App.css';

import Video from './assets/background.mp4';

// Layout component that shows/hides elements based on the route
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide the Navbar, Footer, and Video on /login and /signup pages
  const hideLayoutComponents = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app">
      {!hideLayoutComponents && <Videobackground videoSource={Video} />}
      {!hideLayoutComponents && <Navbar />}
      {children}
      {!hideLayoutComponents && <Footer />}
    </div>
  );
};

// Main App component with Routes
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout><Body /></Layout>}
        />
        <Route
          path="/login"
          element={<Layout><Login /></Layout>}
        />
        <Route
          path="/signup"
          element={<Layout><SignUp /></Layout>}
        />
      </Routes>
    </Router>
  );
};

export default App;