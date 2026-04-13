{/* CREATE EVENT */}
<div className="bg-white p-4 rounded shadow mb-6 border-l-4 border-gold">
  <h2 className="font-bold mb-2 text-primary">Create Event</h2>

  <div className="flex flex-wrap gap-2">
    <input
      placeholder="Title"
      onChange={(e) =>
        setNewEvent({ ...newEvent, title: e.target.value })
      }
      className="border p-2 rounded"
    />

    <input
      type="date"
      onChange={(e) =>
        setNewEvent({ ...newEvent, date: e.target.value })
      }
      className="border p-2 rounded"
    />

    <input
      placeholder="Location"
      onChange={(e) =>
        setNewEvent({ ...newEvent, location: e.target.value })
      }
      className="border p-2 rounded"
    />

    <input
      placeholder="Budget"
      onChange={(e) =>
        setNewEvent({ ...newEvent, budget: e.target.value })
      }
      className="border p-2 rounded"
    />

    <button
      onClick={createEvent}
      className="bg-gold px-4 py-2 rounded hover:bg-primary hover:text-white"
    >
      Create
    </button>
  </div>
</div>