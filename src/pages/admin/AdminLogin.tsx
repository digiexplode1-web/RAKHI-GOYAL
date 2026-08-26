import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-brand-lavender/50">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-plum font-heading mb-2">Admin Portal</h1>
          <p className="text-brand-dark/60 text-sm">Sign in to manage the website.</p>
        </div>
        
        {error && (
          <div className="bg-brand-rose/10 text-brand-plum text-sm p-3 rounded-lg border border-brand-rose/20 mb-6 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-lavender focus:ring-2 focus:ring-brand-plum focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-lavender focus:ring-2 focus:ring-brand-plum focus:outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-brand-plum text-white font-medium py-3 rounded-xl hover:bg-brand-plum/90 transition-colors mt-4">
            Sign In
          </button>
        </form>
        <p className="text-xs text-center text-brand-dark/50 mt-8">
          Default: admin@example.com / ChangeMe123!
        </p>
      </div>
    </div>
  );
}
