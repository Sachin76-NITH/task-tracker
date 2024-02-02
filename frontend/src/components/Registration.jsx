// Registration.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5050/register', {
        email,
        password,
      });

      // Handle successful registration
      console.log(response.data);
    } catch (error) {
      // Handle registration errors
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error during registration:', error.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
