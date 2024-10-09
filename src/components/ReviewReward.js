import React, { useEffect } from "react";
import './ReviewReward.css'; // Import CSS for styling

const ReviewReward = () => {
  useEffect(() => {
    // JavaScript for any custom animations can go here if needed.
  }, []);

  return (
    <div className="review-reward-container">
      <div className="review-reward-header">Reviews & Rewards</div>
      <div className="review-reward-content">
        <div className="review-reward-slider">
          <div className="review-slide">
            <p className="review-text">"Amazing tool for generating QR codes!"</p>
            <p className="review-author">- John Doe</p>
          </div>
          <div className="review-slide">
            <p className="review-text">"Easy to use, highly recommend!"</p>
            <p className="review-author">- Jane Smith</p>
          </div>
        </div>
        <button className="reward-button">Claim Your Reward</button>
      </div>
    </div>
  );
};

export default ReviewReward;
