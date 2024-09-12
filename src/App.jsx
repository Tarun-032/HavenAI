// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Videobackground from './Components/Videobackground/Videobackground';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import './App.css';

import Video from './assets/background.mp4';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayoutComponents = location.pathname === '/login';

  return (
    <div className="app">
      {!hideLayoutComponents && <Videobackground videoSource={Video} />}
      {!hideLayoutComponents && <Navbar />}
      {children}
      {!hideLayoutComponents && <Footer />}
    </div>
  );
};

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
      </Routes>
    </Router>
  );
};

export default App;
