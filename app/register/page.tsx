'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      setLoading(false);
      return;
    }

    try {
      const resUserExists = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await resUserExists.json();

      if (resUserExists.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/login"); // Redirect to login page after success
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="shadow-lg p-8 rounded-lg border-t-4 border-blue-600 bg-white dark:bg-gray-800 w-96">
        <h1 className="text-xl font-bold my-4 text-gray-800 dark:text-white">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          
          <button 
            disabled={loading}
            className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right text-gray-600 dark:text-gray-400 hover:underline" href={"/login"}>
            Already have an account? <span className="underline font-bold">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}