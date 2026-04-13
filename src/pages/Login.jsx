import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

import Login from "../assets/login/login.jpg";

export default function LoginPage({ setToken, setUser }) {
  const [form, setForm] = useState({ email: "", password: "" }); // Removed name, as backend login uses email/password
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });

      const token = response.data.token;
      const userData = { name: response.data.user.name, email: response.data.user.email };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(token);
      setUser(userData);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      {/* ── Left panel — decorative ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={Login}
          alt="Wedding"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/80 via-stone-900/50 to-rose-900/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-3xl font-serif font-bold text-rose-400 tracking-tight">Vivaah</span>
            
          </a>

          {/* Center quote */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-rose-400/60" />
              <span className="text-rose-400 text-sm">✦</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-white leading-snug mb-4">
              Welcome back.<br />
              <span className="italic text-rose-300">Your perfect day</span><br />
              awaits you.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Sign in to manage your events, vendors, and every beautiful detail of your celebration.
            </p>
          </div>

          {/* Bottom trust badges */}
          <div className="flex flex-wrap gap-3">
            {["2,400+ Weddings", "12 Cities", "98% Happy Couples"].map((badge) => (
              <span key={badge} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 text-xs font-medium border border-white/10">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — form ──────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <a href="/" className="inline-block">
              <span className="text-3xl font-serif font-bold text-rose-500">Vivaah</span>
            </a>
            <p className="text-xs text-stone-400 mt-1 tracking-widest uppercase">Weddings</p>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-400 mb-2">Welcome Back</p>
            <h1 className="text-3xl font-serif font-bold text-stone-800 leading-tight">
              Sign in to your<br />
              <span className="italic text-rose-400">Vivaah account</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs text-rose-400 hover:text-rose-500 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 pr-11 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-rose-500 active:scale-[0.98] transition-all duration-200 tracking-wide shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In ✦"
              )}
            </button>
          </form>

          {message && <p className="text-red-500 text-sm mt-4">{message}</p>}

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">or</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-rose-500 font-semibold hover:text-rose-600 transition-colors underline underline-offset-2">
              Create one free
            </Link>
          </p>

          {/* Back to home */}
          <div className="text-center mt-8">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Vivaah Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}