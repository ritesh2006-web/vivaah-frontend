export default function Navbar() {
  return (
    <div className="bg-primary text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold text-gold">
        Wedding Planner
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="bg-gold text-black px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}