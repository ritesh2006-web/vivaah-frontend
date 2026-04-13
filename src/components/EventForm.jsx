import { useState } from 'react';

export default function EventForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', date: '', budget: '', venue_id: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', date: '', budget: '', venue_id: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      <input type="number" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} required />
      <input type="text" placeholder="Venue ID" value={form.venue_id} onChange={(e) => setForm({ ...form, venue_id: e.target.value })} required />
      <button type="submit">Create Event</button>
    </form>
  );
}