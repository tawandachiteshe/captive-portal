"use client"
import { useState } from 'react';
const plans = [
  { gb: 1, price: 1, expireDays: 1 },
  { gb: 2, price: 1.5, expireDays: 3 },
  { gb: 10, price: 5, expireDays: 7 },
];
export default function TokenCreator() {
  const [voucher, setVoucher] = useState<{
    code: string,
    isActive: boolean,
    dataCap: string,
    usedData: string,
    timeCap: number,
    usedTime: 0,
    status: string
  } | null>(null);

  const [plan, setPlan] = useState<{ gb: number, price: number, expireDays: number } | null>(null);

  const createToken = async (gb: number, price: number, expireDays: number) => {
    const res = await fetch("https://portal-backend.umbiro.com/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gb, price, expireDays })
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
            onClick={() => setPlan(plan)}
            className={`cursor-pointer rounded-xl p-4 border transition-all
              ${plan?.gb === plan.gb ? "border-blue-500 bg-blue-700 shadow-md" : "border-gray-300 hover:bg-gray-50"}`}
          >
            <h3 className="text-xl font-semibold text-center">{plan.gb} GB</h3>
            <p className="text-center text-gray-300 mt-2">${plan.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {plan && (
        <div className="mt-6 text-center">
          <button
            onClick={() => createToken(plan?.gb ?? 0, plan?.price ?? 0, plan?.expireDays ?? 0)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Generate Token for {plan.gb} GB
          </button>
        </div>
      )}

      {voucher && (
        <div className="mt-6 p-4 border rounded-lg bg-green-100 text-center">
          <h3 className="text-lg font-semibold text-green-800">Voucher Created!</h3>
          <p className="text-2xl font-mono mt-2">{voucher.code}</p>
          <p className="text-sm text-green-700 mt-1">{plan?.gb} GB — ${plan?.price}</p>
        </div>
      )}
    </div>
  );
}
