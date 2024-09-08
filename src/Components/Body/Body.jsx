import React from 'react'
import './body.css'
import { useState } from 'react';
import { FaMicrophone, FaRobot, FaHeartbeat, FaDatabase, FaMicrophoneAlt, FaBrain, FaComments } from 'react-icons/fa';
import './Body.css';
import Reviewcarousel from './Reviewcarousal/Reviewcarousal';
import FAQ from './FAQ/FAQ';

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
    { icon: <FaRobot />, title: "AI Powered", description: "Leverages state-of-the-art AI algorithms to deliver personalized assistance tailored to your unique health needs. Whether it's providing accurate information or offering timely advice, the AI adapts to your preferences and learning patterns, making every interaction more meaningful." },
    { icon: <FaBrain />, title: "Emotion Recognition", description: "Utilizes advanced emotion detection technology to understand and respond to your emotional state in real-time. This feature ensures that the responses you receive are not only relevant but also empathetic, offering a more supportive and comforting user experience." },
    { icon: <FaDatabase />, title: "Trained on Medical Data", description: "Backed by an extensive database of medical knowledge, the assistant provides accurate and reliable health information. It draws from a wide range of medical sources, ensuring that you receive well-informed answers to your health-related queries." },
    { icon: <FaMicrophoneAlt />, title: "Voice Activated", description: "Designed for hands-free interaction, the voice activation feature allows you to effortlessly engage with the assistant using simple voice commands. Whether you're at home or on the go, accessing health information has never been easier or more convenient." },
    { icon: <FaHeartbeat />, title: "Health Monitoring", description: "Continuously tracks and analyzes your health metrics, offering insights and recommendations based on your data. From daily activity levels to vital signs, the health monitoring feature helps you stay on top of your well-being, enabling proactive health management." },
    { icon: <FaComments />, title: "Conversational Support", description: "Engage in natural, human-like dialogue that provides both informational and emotional support. The conversational AI is designed to assist with mental health concerns, offering a friendly ear and helpful advice whenever you need it, day or night." }
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
      <div className='info'>
      <h1>What Our Users Say</h1>
      <p>Our users love how Haven feels like a true companion, offering personalized advice, emotional understanding, and reliable health information. Whether it's asking questions, getting support, or simply having a conversation, Haven is always there to help.</p>
      </div>
      <section className="review-section">
        <Reviewcarousel />
        <FAQ />
      </section>
      </main>
      
  )
}

export default Body
