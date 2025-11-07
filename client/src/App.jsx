import { useEffect, useState } from 'react';
import axios from 'axios';
import AssetTable from './components/AssetTable';
import Login from './components/Login';
import AddAsset from './components/AddAsset';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (token) fetchAssets();
    else setLoading(false);
  }, [token]);

  async function fetchAssets() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/assets`, { headers: { Authorization: `Bearer ${token}` } });
      setAssets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogin({ token, user }) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setAssets([]);
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Church Asset Tracker</h1>
      {!token ? (
        <Login apiBase={API_BASE} onLogin={handleLogin} />
      ) : (
        <div>
          <p>Signed in as <strong>{user?.email}</strong> ({user?.role}) — <button onClick={handleLogout}>Logout</button></p>
          <AddAsset apiBase={API_BASE} token={token} onAdded={fetchAssets} />
          {loading ? <p>Loading assets...</p> : <AssetTable assets={assets} />}
        </div>
      )}
    </div>
  );
}
