import React, { useEffect, useState } from 'react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`scroll-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        display: isVisible ? 'block' : 'none', // Show/hide based on scroll position
      }}
    >
      ↑
    </div>
  );
};

export default ScrollButton;
