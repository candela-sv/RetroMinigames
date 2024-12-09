import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/login.css';
import avatar from '../images/avatar.png';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      console.log('Credenciales enviadas:', credentials);
      const response = await axios.post('http://localhost:5000/login', credentials);
  
      console.log('Respuesta completa del servidor:', response);
  
      if (response.data && response.data.user) {
        console.log('Usuario recibido:', response.data.user);
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      console.error('Error de login completo:', error);
      console.error('Detalles del error:', error.response?.data);
      setError(error.response?.data?.message || 'Error desconocido');
    }
  };
  
  

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="avatar-container">
          <img src={avatar} alt="Avatar" className="avatar-image" />
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Introduce your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>

          <div className="signup-link">
            <span>You don't have an account?</span>{' '}
            <a href="#" onClick={handleSignupClick}>
              Sign Up here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
