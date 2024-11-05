/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";

interface WalletContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: ethers.JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
}

export const WalletContext = createContext<WalletContextType>({
  provider: null,
  signer: null,
  address: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnected: false,
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Check if MetaMask is already connected
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(ethProvider);

      ethProvider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          ethProvider.getSigner().then((signer) => {
            setSigner(signer);
            setAddress(accounts[0]);
            setIsConnected(true);
          });
        }
      });

      // Listen for account changes
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else {
          setAddress(new ethers.JsonRpcSigner(ethProvider, accounts[0]));
        }
      });

      // Listen for chain changes
      (window as any).ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      toast.error("MetaMask is not installed.");
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        provider.getSigner().then((signer) => {
          setSigner(signer);
          setAddress(accounts[0]);
          setIsConnected(true);
          toast.success("Wallet connected successfully!");
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet.");
    }
  };

  const disconnectWallet = () => {
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
    toast.info("Wallet disconnected.");
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        signer,
        address,
        connectWallet,
        disconnectWallet,
        isConnected,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
