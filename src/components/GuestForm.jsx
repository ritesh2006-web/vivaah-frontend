import { useState } from 'react';

export default function GuestForm({ onSubmit }) {
  const [form, setForm] = useState({ event_id: '', name: '', rsvp_status: 'Pending', meal_pref: 'Vegetarian' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ event_id: '', name: '', rsvp_status: 'Pending', meal_pref: 'Vegetarian' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Event ID" value={form.event_id} onChange={(e) => setForm({ ...form, event_id: e.target.value })} required />
      <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <select value={form.rsvp_status} onChange={(e) => setForm({ ...form, rsvp_status: e.target.value })}>
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Declined">Declined</option>
      </select>
      <select value={form.meal_pref} onChange={(e) => setForm({ ...form, meal_pref: e.target.value })}>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Non-Vegetarian">Non-Vegetarian</option>
      </select>
      <button type="submit">Add Guest</button>
    </form>
  );
}