"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined
);

export const AccessTokenProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = (): AccessTokenContextType => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error(
      "useAccessToken must be used within an AccessTokenProvider"
    );
  }
  return context;
};
