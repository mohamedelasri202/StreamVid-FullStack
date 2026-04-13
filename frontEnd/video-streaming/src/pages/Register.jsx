import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axios.js';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {

      await apiClient.post('/api/users/register', formData);

      // If Java returns 201 Created
      navigate('/login');
    } catch (err) {
      // Handles "User already exists" from Java backend
      const message = err.response?.data?.message || "Registration failed. Try again.";
      setError(message);
    }
  };

  return (
      <div style={containerStyle}>
        <h2>Create Account</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input name="username" placeholder="Username" onChange={handleChange} required style={inputStyle} /><br/>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={inputStyle} /><br/>
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={inputStyle} /><br/>
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
  );
};

const containerStyle = { maxWidth: '400px', margin: '50px auto', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '10px', margin: '10px 0' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#e50914', color: 'white', border: 'none', cursor: 'pointer' };

export default Register;