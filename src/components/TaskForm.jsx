import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [form, setForm] = useState({ event_id: '', task_name: '', deadline: '', status: 'Pending' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ event_id: '', task_name: '', deadline: '', status: 'Pending' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Event ID" value={form.event_id} onChange={(e) => setForm({ ...form, event_id: e.target.value })} required />
      <input type="text" placeholder="Task Name" value={form.task_name} onChange={(e) => setForm({ ...form, task_name: e.target.value })} required />
      <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required />
      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}