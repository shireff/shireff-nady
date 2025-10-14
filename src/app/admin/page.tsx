/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && isAuthenticated && isAdmin) {
      router.push("/admin/projects");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/admin/projects");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--primaryBg)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 sm:p-8 border shadow-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--title)' }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6" style={{ color: 'var(--title)' }}>
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 px-4 py-2 text-sm rounded border" style={{ color: '#e63946', backgroundColor: 'rgba(230, 57, 70, 0.1)', borderColor: 'rgba(230, 57, 70, 0.3)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--title)' }}>
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--title)'
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--title)' }}>
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--title)'
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="block w-full py-2 font-semibold rounded-md shadow-sm hover:opacity-90 transition duration-300 disabled:opacity-60 text-center text-white"
            style={{ backgroundColor: 'var(--blue)' }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
