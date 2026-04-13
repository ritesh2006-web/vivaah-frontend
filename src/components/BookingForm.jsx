import { useState } from 'react';

export default function BookingForm({ onSubmit }) {
  const [form, setForm] = useState({ event_id: '', vendor_id: '', booking_date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ event_id: '', vendor_id: '', booking_date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Event ID" value={form.event_id} onChange={(e) => setForm({ ...form, event_id: e.target.value })} required />
      <input type="text" placeholder="Vendor ID" value={form.vendor_id} onChange={(e) => setForm({ ...form, vendor_id: e.target.value })} required />
      <input type="date" value={form.booking_date} onChange={(e) => setForm({ ...form, booking_date: e.target.value })} required />
      <button type="submit">Book Vendor</button>
    </form>
  );
}