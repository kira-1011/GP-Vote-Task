"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Function to check token validity
    const checkAuth = () => {
      if (pathname === "/auth/login" || pathname === "/auth/register") return;
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to access this page.");
        router.push("/auth/login");
      } else {
        const isTokenValid = verifyToken(token);
        if (!isTokenValid) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          router.push("/auth/login");
        }
      }
    };

    checkAuth();
  }, [router]);

  const verifyToken = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp && payload.exp > currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  return <>{children}</>;
};

export default ProtectedRoute;
