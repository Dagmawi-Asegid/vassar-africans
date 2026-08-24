"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase"; // Correctly points to your app/lib/supabase.ts file

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [vassarEmail, setVassarEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      // 1. Create the user securely in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: personalEmail,
        password: password,
      });

      if (authError) throw authError;

      // 2. If successful, save their extra details to our 'profiles' table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: authData.user.id, // Links this profile to the secure auth account
              full_name: name,
              vassar_email: vassarEmail,
              personal_email: personalEmail,
              major: major
            }
          ]);

        if (profileError) throw profileError;
        
        // 3. Success! Send them to the chat dashboard
        router.push("/chat");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 my-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Join the Community</h2>
          <p className="text-gray-400 text-sm mt-2">Create your official Vassar Africans account.</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-yellow-500 transition"
              placeholder="e.g. Dagmawi Asegid"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Vassar Email</label>
              <input 
                type="email" 
                required
                pattern=".+@vassar\.edu"
                title="Must be a valid @vassar.edu email address"
                value={vassarEmail}
                onChange={(e) => setVassarEmail(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-yellow-500 transition"
                placeholder="@vassar.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Personal Email</label>
              <input 
                type="email" 
                required
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-yellow-500 transition"
                placeholder="@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Major / Intended Major</label>
            <input 
              type="text" 
              required
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-yellow-500 transition"
              placeholder="e.g. Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Create Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-yellow-500 transition"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-950 font-bold py-3.5 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition shadow-[0_0_15px_rgba(234,179,8,0.2)] disabled:opacity-70 mt-2"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-bold transition">
              Log In
            </Link>
          </p>
          <Link href="/" className="block text-sm text-gray-500 hover:text-gray-300 transition mt-4">
            &larr; Back to Homepage
          </Link>
        </div>

      </motion.div>
    </div>
  );
}