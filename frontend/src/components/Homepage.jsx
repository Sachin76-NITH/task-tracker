import React from 'react';
import Sidebar from './Sidebar';
import Tracking from './Tracking';
import NotLoggedInPage from './NotLoggedInPage';

function Homepage() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className='sachin'>
      <Sidebar />
      {isLoggedIn ? <Tracking /> : <NotLoggedInPage />}
    </div>
  );
}

export default Homepage;


