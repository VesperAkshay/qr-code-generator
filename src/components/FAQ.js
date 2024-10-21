import React, { useEffect } from 'react';
import './FAQ.css'; // Import the FAQ-specific CSS

const FAQ = () => {
  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        const isActive = answer.classList.contains('active');

        // Hide all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
          ans.classList.remove('active');
        });

        // Toggle current answer
        if (!isActive) {
          answer.classList.add('active');
        }
      });
    });
  }, []);

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>What is a QR code, and how does it work?</h3>
        <p className="faq-answer">A QR code is a type of matrix barcode that can be scanned using a smartphone camera to access information.</p>
      </div>
      <div className="faq-item">
        <h3>How can I customize a QR code on this website?</h3>
        <p className="faq-answer">You can customize QR codes by selecting colors, shapes, and adding logos using our tools.</p>
      </div>
      <div className="faq-item">
        <h3>Are the QR codes generated here free to use?</h3>
        <p className="faq-answer">Yes, all QR codes generated on this website are free to use.</p>
      </div>
      <div className="faq-item">
        <h3>Can I track the performance of my QR code?</h3>
        <p className="faq-answer">Currently, we do not provide tracking features for QR codes.</p>
      </div>
      <div className="faq-item">
        <h3>Do the QR codes expire?</h3>
        <p className="faq-answer">No, the QR codes generated do not expire.</p>
      </div>
    </div>
  );
};

export default FAQ;
