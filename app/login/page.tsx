'use client';

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // This calls the 'credentials' provider defined in your [...nextauth]/route.ts
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // We handle redirect manually to check for errors first
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Redirect to dashboard or home on success
      router.replace("/"); 
      router.refresh(); // Refresh to update the Navbar session state
    } catch (error) {
      console.log(error);
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="shadow-lg p-8 rounded-lg border-t-4 border-green-600 bg-white dark:bg-gray-800 w-96">
        <h1 className="text-xl font-bold my-4 text-gray-800 dark:text-white">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          
          <button 
            disabled={loading}
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right text-gray-600 dark:text-gray-400 hover:underline" href={"/register"}>
            Don't have an account? <span className="underline font-bold">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}