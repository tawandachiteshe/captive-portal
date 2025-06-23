'use client'

import { useEffect, useState } from 'react';

type MyUsage = {
  username: string;
  usedData: string;
  sessionTime: number;
  lastSeen: string;
};

export default function MyUsage() {
  const [usage, setUsage] = useState<MyUsage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true)

    // Example: get user code from localStorage or cookie
    const username = localStorage.getItem('voucher_code');

    if (!username) return;

    fetch('https://portal-backend.umbiro.com/my-usage?x-user' + '=' + username, {
      headers: {
        'x-user': username,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsage(data);
        setLoading(false);
      });
  }, []);

  if (loading || !usage) {
    return <div className="p-6">Loading usage info...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Usage</h1>
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow space-y-2">
        <div><strong>Username:</strong> <span className="font-mono">{usage.username}</span></div>
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
    </div>
  );
}
