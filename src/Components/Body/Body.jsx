import React from 'react'
import './body.css'
import { useState } from 'react';
import { FaMicrophone, FaRobot, FaHeartbeat, FaDatabase, FaMicrophoneAlt, FaBrain, FaComments } from 'react-icons/fa';
import './Body.css';

import photo from '../../assets/photoai.png'

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    {icon}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);


const Body = () => {

  const [captions, setCaptions] = useState('');

  const handleMicClick = () => {
    // Implement voice recording logic here
    setCaptions('Listening...');
  };
  
  const features = [
    { icon: <FaRobot />, title: "AI Powered", description: "Advanced AI technology for personalized assistance" },
    { icon: <FaBrain />, title: "Emotion Recognition", description: "Detects and responds to your emotional state" },
    { icon: <FaDatabase />, title: "Trained on Medical Data", description: "Extensive medical knowledge for accurate information" },
    { icon: <FaMicrophoneAlt />, title: "Voice Activated", description: "Easy to use with voice commands" },
    { icon: <FaHeartbeat />, title: "Health Monitoring", description: "Tracks and analyzes your health data" },
    { icon: <FaComments />, title: "Conversational Support", description: "Natural dialogue for mental health support" }
  ];

  return (
       <main className="content">
        <h1>Emotionally Intelligent Voice AI for Everyone</h1>
        <p>Just ask anything related to your health or mental health and the AI will respond to you accordingly</p>
        <div className="mic-button" onClick={handleMicClick}>
        <FaMicrophone />
      </div>
      <p class= "para">Click here</p>
      <div className="captions">
        {captions}
      </div>
      <section className="info-section">
        <div className="info-content">
          <img src={photo} alt="photo" className="photo" />
          <h1>Health info for everyone</h1>
          <p>Mental health support, talk as a companion, ask diagnostic questions, upload your reports and ask about it, Haven will detect your emotion and respond accordingly</p>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      </main>
      
  )
}

export default Body
