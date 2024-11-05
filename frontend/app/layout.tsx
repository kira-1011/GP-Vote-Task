import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/common/sonner";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { WalletProvider } from "@/context/WalletContext";

export const metadata: Metadata = {
  title: "GP Vote",
  description: "GP Vote",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProtectedRoute>
          <WalletProvider>{children}</WalletProvider>
          <Toaster richColors />
        </ProtectedRoute>
      </body>
    </html>
  );
}
