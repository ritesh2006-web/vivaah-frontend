export default function ReportView({ report }) {
  return (
    <div>
      {report.map((r) => (
        <div key={r.title}>
          <h3>{r.title}</h3>
          <p>Budget: ₹{r.budget}</p>
          <p>Total Spent: ₹{r.total_spent}</p>
          <p>Total Guests: {r.total_guests}</p>
        </div>
      ))}
    </div>
  );
}