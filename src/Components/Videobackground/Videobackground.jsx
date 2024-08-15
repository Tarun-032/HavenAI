// VideoBackground.jsx
import React from 'react';
import './videobackground.css';

const Videobackground = ({ videoSource }) => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
      </video>
    </div>
  );
};

export default Videobackground;