"use client";

import { useState } from "react";
import { useAccessToken } from "@/context/AccessTokenContext";

export default function FetchTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const { accessToken, setAccessToken } = useAccessToken();

  const fetchTransactions = async () => {
    if (!accessToken) return;

    const response = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ access_token: accessToken }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setTransactions(data.transactions);
  };

  return (
    <div>
      <button onClick={fetchTransactions}>Fetch Transactions</button>
      {transactions.length > 0 && (
        <ul>
          {transactions.map((txn, index) => (
            <li key={index}>
              {txn.name}: ${txn.amount} on {txn.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
