"use client";

import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useAccessToken } from "@/context/AccessTokenContext";

export default function PlaidIntegration() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    const fetchLinkToken = async () => {
      const response = await fetch("/api/link-token", {
        method: "POST",
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    };

    fetchLinkToken();
  }, []);

  const onSuccess = async (public_token: string) => {
    const response = await fetch("/api/plaid", {
      method: "POST",
      body: JSON.stringify({ public_token }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setAccessToken(data.access_token);
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess,
  });

  if (!linkToken) return <p>Loading...</p>;

  return (
    <div>
      {!accessToken ? (
        <button onClick={() => open()} disabled={!ready}>
          Link Account
        </button>
      ) : (
        <>
          <p>Account linked successfully!</p>
        </>
      )}
    </div>
  );
}
