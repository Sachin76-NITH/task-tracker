// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5050/login', {
        email,
        password,
      });

      // Handle successful login
      console.log(response.data);
      if(response){
        localStorage.setItem('token',response.data.token);
        navigate("/");
      }
    } catch (error) {
      // Handle login errors
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error during login:', error.message);
      }
    }
  };

  return (<div className='login-all'>
    <div className="login-container">
      <h2 className='lc'>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
