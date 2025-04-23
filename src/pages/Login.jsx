import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
import logo from '../assets/logo.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Dummy hardcoded credentials
    const hardcodedUser = {
      email: 'admin@gmail.com',
      password: 'admin123',
      firstLogin: true,
    };

    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(hardcodedUser));
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <div>
            <h2>Login to Account</h2>
            <p>Please enter your email and password to continue</p>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <label>Email address:</label>
          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-row">
            <label>Password</label>
            <a href="/forgot-password">Forget Password?</a>
          </div>
          <input
            type="password"
            placeholder="●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-row">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember">Remember Password</label>
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
