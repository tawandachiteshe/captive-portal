"use client"
import { useState } from 'react';
const plans = [
  { gb: 1, price: 1 },
  { gb: 2, price: 1.5 },
  { gb: 7, price: 5 },
];
export default function TokenCreator() {
  const [voucher, setVoucher] = useState<{ gb: number, price: number } | null>(null);

  const createToken = async (gb: number, price: number) => {
    const res = await fetch("/api/create-voucher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gb, price })
    });
    const data = await res.json();
    setVoucher(data);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Data Voucher</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div
            key={i}
            onClick={() => setVoucher(plan)}
            className={`cursor-pointer rounded-xl p-4 border transition-all
              ${voucher?.gb === plan.gb ? "border-blue-500 bg-blue-700 shadow-md" : "border-gray-300 hover:bg-gray-50"}`}
          >
            <h3 className="text-xl font-semibold text-center">{plan.gb} GB</h3>
            <p className="text-center text-gray-300 mt-2">${plan.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {voucher && (
        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Generate Token for {voucher.gb} GB
          </button>
        </div>
      )}

      {voucher && (
        <div className="mt-6 p-4 border rounded-lg bg-green-100 text-center">
          <h3 className="text-lg font-semibold text-green-800">Voucher Created!</h3>
          <p className="text-2xl font-mono mt-2">{voucher.code}</p>
          <p className="text-sm text-green-700 mt-1">{voucher.gb} GB — ${voucher.price}</p>
        </div>
      )}
    </div>
  );
}
