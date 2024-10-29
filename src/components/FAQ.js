// src/components/FAQ.js
import React, { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // State to track which FAQ is open

  const faqs = [
    { question: "What is this app about?", answer: "This app provides QR code generation and scanning features." },
    { question: "How do I generate a QR code?", answer: "Go to the QR Code page after logging in, and follow the instructions." },
    { question: "Can I bulk generate QR codes?", answer: "Yes, our app supports bulk QR code generation." },
    { question: "How do I switch between dark and light themes?", answer: "You can easily switch between dark and light themes by clicking the theme toggle button." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open index
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index} onClick={() => toggleFAQ(index)}>
          <h3>{faq.question} <span>{openIndex === index ? "-" : "+"}</span></h3>
          {openIndex === index && <p>{faq.answer}</p>} {/* Show answer if open */}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
