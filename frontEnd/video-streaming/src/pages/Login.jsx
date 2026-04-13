import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Calls http://localhost:8882/api/users/login
      const response = await apiClient.post('/api/users/login', {
        email: email,
        password: password
      });


      if (response.data) {
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
        navigate('/');
        window.location.reload();
      }
    } catch (err) {

      const message = err.response?.data?.message || "Invalid email or password";
      setError(message);
    }
  };

  return (
      <div style={containerStyle}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={inputStyle} /><br/>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={inputStyle} /><br/>
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p>New user? <Link to="/register">Register here</Link></p>
      </div>
  );
};

const containerStyle = { maxWidth: '400px', margin: '50px auto', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '10px', margin: '10px 0' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#e50914', color: 'white', border: 'none', cursor: 'pointer' };

export default Login;