import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RegisterImage from "../assets/register/register.jpg";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-stone-50 font-sans">

      {/* LEFT IMAGE PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={RegisterImage}
          alt="Register"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-stone-900/80 via-rose-900/40 to-stone-900/70" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <h1 className="text-3xl font-serif font-bold text-rose-400">
            Vivaah
          </h1>

          <div>
            <h2 className="text-4xl font-serif font-bold text-white leading-snug mb-4">
              Start your<br />
              <span className="italic text-rose-300">beautiful journey</span>
            </h2>
            <p className="text-white/60 text-sm max-w-xs">
              Plan your dream wedding effortlessly with curated vendors and smart tools.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {["Free", "Trusted", "Premium"].map((item) => (
              <span key={item} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs border border-white/10">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-3xl font-serif font-bold text-rose-500">
              Vivaah
            </h1>
          </div>

          {/* HEADING */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-2">
              Create Account
            </p>
            <h1 className="text-3xl font-serif font-bold text-stone-800">
              Join <span className="italic text-rose-400">Vivaah</span>
            </h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Priya Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase mb-1.5">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-semibold hover:bg-rose-500 transition-all disabled:opacity-60"
            >
              {loading ? "Registering..." : "Create Account ✦"}
            </button>

          </form>

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm mt-4 text-red-500">{message}</p>
          )}

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-stone-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-500 font-semibold underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}