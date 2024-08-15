import React from 'react'
import './body.css'
import { FaMicrophone } from 'react-icons/fa';
import { useState } from 'react';



const handleMicClick = () => {
  // Implement voice recording logic here
  setCaptions('Listening...');
};

const Body = () => {

  const [captions, setCaptions] = useState('');

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
      </main>
  )
}

export default Body
