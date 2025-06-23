
"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p className="font-bold">Be Warned</p>
      <p>{message}</p>
    </div>
  )
}

export function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [uamParams, setUamParams] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUamParams(searchParams);
  }, [searchParams]);

  console.log(Object.fromEntries(searchParams))

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(searchParams), username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          setError("No redirect URL received from server.");
        }
      } else {
        const err = await res.json();
        setError(err.error || "Login failed.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center px-4">

      {}

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to WiFi Portal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-1"
            >
              Username
            </label>
            <input
              placeholder="voucher001"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoComplete="off"
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              placeholder="pass001"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}
          {searchParams.get("reason") === "reject" && (
            <p className="text-red-600 font-semibold text-center">{"Invalid username or password"}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

