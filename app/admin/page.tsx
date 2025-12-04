"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminLogin from "@/components/admin/AdminLogin";
import DevLogManager from "@/components/admin/DevLogManager";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) return <div className="min-h-screen bg-background flex items-center justify-center text-neutral-500">Načítám...</div>;

  if (!user) return <AdminLogin />;

  return <DevLogManager />;
}