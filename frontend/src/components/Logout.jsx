// Logout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Clear the user token from local storage
    localStorage.removeItem('token');
    // Navigate to the NotLoggedInPage
    navigate('/');
  };

  const showLogoutConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="logout-container">
      <button onClick={showLogoutConfirmation} className="logout-button">
        Logout
      </button>

      {showConfirmation && (
        <div className="confirmation-box">
          <p>Are you sure you want to logout?</p>
          <button onClick={handleLogout} className="confirm-button">
            Yes, Logout
          </button>
          <button onClick={closeConfirmation} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
