
'use client'

import { useEffect, useState } from "react";

export function VoucherDashboard() {
  const [data, setData] = useState<{ code: string, usedTime: number, remainingTime: number, usedData: number, remainingData: number, status: string }[]>([
    {
      code: 'vvvv',
      usedTime: 1,
      remainingTime: 400,
      usedData: 100,
      remainingData: 499,
      status: ''
    },
    {
      code: 'vvvv',
      usedTime: 1,
      remainingTime: 400,
      usedData: 100,
      remainingData: 499,
      status: ''
    }]);

  useEffect(() => {
    fetch('/api/voucher-usage')
      .then(res => res.json())
      .then(setData);

  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Voucher Usage</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="p-2">Code</th>
            <th className="p-2">Used Time</th>
            <th className="p-2">Remaining Time</th>
            <th className="p-2">Used Data</th>
            <th className="p-2">Remaining Data</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 font-mono text-center">{v.code}</td>
              <td className="p-2 text-center">{Math.floor(v.usedTime / 60)} min</td>
              <td className="p-2 text-center">{Math.floor(v.remainingTime / 60)} min</td>
              <td className="p-2 text-center">{(v.usedData / 1024 / 1024).toFixed(2)} MB</td>
              <td className="p-2 text-center">{(v.remainingData / 1024 / 1024).toFixed(2)} MB</td>
              <td className={`p-2 text-center font-semibold ${v.status === "expired" ? "text-red-500" : "text-green-600"}`}>
                {v.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
