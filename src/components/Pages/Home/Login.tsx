// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/login/login";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/features/authSlices";
 
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login({ email, password }).unwrap();
      // Save token in cookie and Redux
      Cookies.set("token", res.token, { expires: 1 }); // 1 day
      dispatch(setToken(res.token));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.data?.error || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-md p-6 rounded shadow">
        <h1 className="text-2xl mb-4">Login</h1>

        <label className="block mb-2">
          <div>Email</div>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-4">
          <div>Password</div>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border p-2 w-full"
          />
        </label>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
