import React, { useState } from 'react';
import './AuthModal.css'; 

function AuthModal({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form:', { isSignup, name, email, password });
  
    const url = isSignup ? 'http://localhost:4000/users' : 'http://localhost:4000/users/login';

    const payload = isSignup
      ? { name, email, password }
      : { email, password };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      // ==== save both user and token from response ====
      const { user, token } = data;
      if (!user || !token) {
        alert("Login failed: Missing user or token.");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);  // <-- Save JWT token here

      onLogin(user);

    } catch (error) {
      console.error('Auth error:', error);
      alert('Network error or server is down.');
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2>{isSignup ? 'Create Account' : 'Log in'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isSignup ? 'Sign up' : 'Log in'}
          </button>

          {!isSignup && (
            <div className="auth-footer">
              <small className="auth-forgot">Forgot your password?</small>
            </div>
          )}
        </form>

        <div className="auth-toggle">
          {isSignup ? (
            <button onClick={() => setIsSignup(false)} className="toggle-btn">
              Already have an account? Log in
            </button>
          ) : (
            <button onClick={() => setIsSignup(true)} className="toggle-btn">
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;

