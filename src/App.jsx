import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Videobackground from './Components/Videobackground/Videobackground';
import Body from './Components/Body/Body';
import './App.css';
import Footer from './Components/Footer/Footer';

import Video from './assets/background.mp4'

const App = () => {
  return (
    <div className="app">
      <Videobackground videoSource= {Video} />
      <Navbar />
      <Body />
      <Footer />
      
    </div>
  );
};

export default App;