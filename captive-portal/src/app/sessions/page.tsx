
'use client'

import { useEffect, useState } from 'react'

export default function ActiveVoucherPage() {
  const [vouchers, setVouchers] = useState<any[]>([])

  useEffect(() => {
    fetch('https://portal-backend.umbiro.com/sessions')
      .then(res => res.json())
      .then(setVouchers)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Active Voucher Sessions</h1>
      {vouchers.map(v => (
        <div key={v.code} className="border rounded p-4 mb-4">
          <h2 className="text-lg font-semibold">Voucher: {v.code}</h2>
          <p>Total Data: {(Number(v.totalData) / 1024 / 1024).toFixed(2)} MB</p>
          <table className="mt-2 w-full text-sm border">
            <thead>
              <tr className="bg-grey-100">
                <th className="border p-1">Start Time</th>
                <th className="border p-1">IP Address</th>
                <th className="border p-1">MAC Address</th>
                <th className="border p-1">Data Used</th>
              </tr>
            </thead>
            <tbody>
              {v.sessions.map((s: any, i: number) => (
                <tr key={i}>
                  <td className="border p-1">{new Date(s.startTime).toLocaleString()}</td>
                  <td className="border p-1">{s.ip}</td>
                  <td className="border p-1">{s.mac}</td>
                  <td className="border p-1">{(Number(s.dataUsed) / 1024 / 1024).toFixed(2)} MB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
