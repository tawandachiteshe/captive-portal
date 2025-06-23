
'use client'

import { useEffect, useState } from 'react';

type MyUsage = {
  username: string;
  usedData: string;
  sessionTime: number;
  lastSeen: string;
};

export default function MyUsage() {
  const [username, setUsername] = useState<string>('');
  const [usage, setUsage] = useState<MyUsage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try load saved code from localStorage on first render
    const saved = localStorage.getItem('voucher_code');
    if (saved) setUsername(saved);
  }, []);

  const fetchUsage = async () => {
    if (!username) return;
    setLoading(true);

    try {
      const res = await fetch(`https://portal-backend.umbiro.com/my-usage?x-user=${username}`, {
        headers: { 'x-user': username },
      });
      const data = await res.json();
      setUsage(data);
      localStorage.setItem('voucher_code', username); // save for future
    } catch (err) {
      console.error('Failed to fetch usage:', err);
      setUsage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check My Usage</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your voucher code"
          className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
        />
        <button
          onClick={fetchUsage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Check Usage
        </button>
      </div>

      {loading && <div className="text-gray-500">Loading usage info...</div>}

      {usage && !loading && (
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow space-y-2">
          <div>
            <strong>Username:</strong>{' '}
            <span className="font-mono">{usage.username}</span>
          </div>
          <div>
            <strong>Data Used:</strong>{' '}
            {(parseInt(usage.usedData) / 1024 / 1024).toFixed(2)} MB
          </div>
          <div>
            <strong>Session Time:</strong>{' '}
            {Math.floor(usage.sessionTime / 60)} minutes
          </div>
          <div>
            <strong>Last Seen:</strong>{' '}
            {new Date(usage.lastSeen).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}

