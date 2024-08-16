import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const reviews = [
    { text: "This assistant feels like a natural extension of my daily routine. The emotion detection is a game-changer, making interactions feel personalized and empathetic. The conversation history feature is perfect for keeping track of past health queries. Highly recommended for anyone looking for a supportive digital health companion.", rating: 5 },
    { text: "I love how this assistant blends accurate health information with a friendly interface. The captions make it accessible, and the secure login ensures my data is protected. It's more than just a typical voice assistant; it truly cares about your well-being.", rating: 4 },
    { text: "The combination of voice interaction and easy-to-navigate UI makes it super convenient to get health tips wherever I am. The ability to view conversation history is a huge plus, and the AI's emotional intelligence adds a comforting touch.", rating: 5 },
    { text: "This assistant stands out for its thoughtful design. The emotion detection really sets it apart, making the responses feel tailored and caring. The secure login and detailed conversation history are features I didn’t know I needed until now!", rating: 4 },
    { text: "It's not just about the information; it's how the assistant presents it. The emotion-aware responses make it feel like you're talking to someone who understands. The friendly UI and accessibility options like captions are just the icing on the cake. A must-have for anyone serious about their health!", rating: 5 },
  ];


const ReviewCard = ({ review }) => (
  <div className="review-card">
    <p className="review-text">{review.text}</p>
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
      ))}
    </div>
  </div>
);

const ReviewCarousel = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition - 1 + reviews.length) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="review-carousel">
      <div className="review-slider" style={{ transform: `translateX(${position * -20}%)` }}>
        {reviews.concat(reviews.slice(0, 4)).map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;


