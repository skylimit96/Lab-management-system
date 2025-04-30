import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import { Loader } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpeg')" }}
    >
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-10 w-full max-w-md mx-4">
          <div className="flex justify-center mb-8">
            <img className="h-30" src="/logo.webp" alt="Maintenance Lab Logo" />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="disabled"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder-gray-400 focus:placeholder-transparent focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 px-5 py-3"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder-gray-400 focus:placeholder-transparent focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 px-5 py-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-white py-4">
        All rights reserved, Maintenance Lab 2025.
      </footer>
    </div>
  );
}
