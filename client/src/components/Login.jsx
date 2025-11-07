import { useState } from 'react';
import axios from 'axios';

export default function Login({ apiBase, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post(`${apiBase}/api/auth/login`, { email, password });
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <div style={{ marginBottom: 8 }}>
        <label>Email</label><br/>
        <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Password</label><br/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
    </form>
  );
}
