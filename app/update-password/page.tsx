"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSessionReady, setIsSessionReady] = useState(false);

  useEffect(() => {
    // 1. Check if the URL hash contains the access token from the email link
    if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
      setIsSessionReady(true);
    }

    // 2. Listen for Supabase password recovery event
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setIsSessionReady(true);
      }
    });

    // 3. Fallback: check current active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsSessionReady(true);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      alert("Password successfully updated! Please log in with your new password.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Create New Password</h2>
          <p className="text-gray-400 text-sm mt-2">Enter a strong new password for your account.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        {!isSessionReady && (
          <div className="mb-6 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-yellow-200 text-xs text-center">
            Verifying your security token... If this stays long, try clicking the email link again.
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || !isSessionReady}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-950 font-bold py-3.5 rounded-xl hover:from-yellow-300 transition shadow-[0_0_15px_rgba(234,179,8,0.2)] disabled:opacity-50 mt-2"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}