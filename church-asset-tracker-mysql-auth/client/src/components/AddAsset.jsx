import { useState } from 'react';
import axios from 'axios';

export default function AddAsset({ apiBase, token, onAdded }) {
  const [form, setForm] = useState({ name: '', manufacturer: '', model: '', category: 'electronic', acquisitionDate: '', price: '', quantity: 1, status: 'in use', custody: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function update(k, v){ setForm(prev => ({ ...prev, [k]: v })); }

  async function handleSubmit(e){
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await axios.post(`${apiBase}/api/assets`, form, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ name: '', manufacturer: '', model: '', category: 'electronic', acquisitionDate: '', price: '', quantity: 1, status: 'in use', custody: '', location: '' });
      if (onAdded) onAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add asset');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, maxWidth: 720, border: '1px solid #eee', padding: 12 }}>
      <h3>Add Asset</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div><label>Name</label><input required value={form.name} onChange={e=>update('name', e.target.value)} style={{ width: '100%', padding:8 }} /></div>
        <div><label>Category</label><select value={form.category} onChange={e=>update('category', e.target.value)} style={{ width: '100%', padding:8 }}><option value='electronic'>electronic</option><option value='furniture'>furniture</option><option value='other'>other</option></select></div>
        <div><label>Manufacturer</label><input value={form.manufacturer} onChange={e=>update('manufacturer', e.target.value)} style={{ width: '100%', padding:8 }} /></div>
        <div><label>Model</label><input value={form.model} onChange={e=>update('model', e.target.value)} style={{ width: '100%', padding:8 }} /></div>
        <div><label>Acquisition Date</label><input type='date' value={form.acquisitionDate} onChange={e=>update('acquisitionDate', e.target.value)} style={{ width: '100%', padding:8 }} /></div>
        <div><label>Location</label><input value={form.location} onChange={e=>update('location', e.target.value)} style={{ width: '100%', padding:8 }} placeholder='Helsinki, Turku...' /></div>
        <div><label>Price</label><input type='number' value={form.price} onChange={e=>update('price', e.target.value)} style={{ width: '100%', padding:8 }} /></div>
        <div><label>Quantity</label><input type='number' value={form.quantity} onChange={e=>update('quantity', e.target.value)} style={{ width: '100%', padding:8 }} /></div>
        <div><label>Status</label><select value={form.status} onChange={e=>update('status', e.target.value)} style={{ width: '100%', padding:8 }}><option value='in use'>in use</option><option value='needs replacement'>needs replacement</option><option value='damaged'>damaged</option></select></div>
        <div><label>Custody</label><input value={form.custody} onChange={e=>update('custody', e.target.value)} style={{ width: '100%', padding:8 }} placeholder='church premises, with pastor...' /></div>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 8 }}><button type='submit' disabled={loading}>{loading ? 'Adding...' : 'Add Asset'}</button></div>
    </form>
  );
}
