import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const LoginRegister: React.FC = () => {
  const { login, register } = useUser();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }
    let success = false;
    if (mode === 'login') {
      success = await login(username, password);
      if (!success) setError('Invalid username or password');
    } else {
      success = await register(username, password);
      if (!success) setError('Username already exists');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #23272f 0%, #181a20 100%)', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: 350, margin: '120px auto', background: '#23242b', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}>
        <h2 style={{ color: '#e6e6e6', textAlign: 'center', marginBottom: 24 }}>{mode === 'login' ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1.5px solid #444a5a', background: '#181a20', color: '#e6e6e6' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1.5px solid #444a5a', background: '#181a20', color: '#e6e6e6' }}
          />
          {error && <div style={{ color: '#e06c75', marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 8, background: '#4e7fff', color: '#fff', fontWeight: 600, border: 'none', marginBottom: 8 }}>
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <div style={{ textAlign: 'center', color: '#e6e6e6' }}>
          {mode === 'login' ? (
            <span>Don't have an account? <button style={{ color: '#4e7fff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setMode('register')}>Register</button></span>
          ) : (
            <span>Already have an account? <button style={{ color: '#4e7fff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setMode('login')}>Login</button></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister; 