import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQ.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "Couldn't I build this myself and save money?",
      answer: "While it's possible to build a similar system yourself, our solution offers professional-grade quality, ongoing support, and regular updates. The time and resources saved by using our ready-made solution often outweigh the potential cost savings of building it from scratch."
    },
    {
      question: "Sounds good — but I'm building a custom X for Y...",
      answer: "Not a problem. We can likely already support it. And, you can bring custom models for any part of the pipeline. If they're hosted with one of our providers, you just need to add your provider keys, then specify the custom model in your API request. If they are hosted elsewhere, you can use the custom provider and specify the URL to your model in your API request."
    },
    {
      question: "Is it going to be hard to set up?",
      answer: "We've designed our system to be as user-friendly as possible. Most users find the setup process straightforward, with clear documentation and support available if needed. However, the complexity can vary depending on your specific requirements and technical expertise."
    }
  ];

  return (
    <section className="faq-section">
      <h2>Frequently asked questions</h2>
      <p> Have questions? We've got answers.</p>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;