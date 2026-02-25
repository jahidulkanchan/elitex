"use client";

import { signIn } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleCredentialsLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = callbackUrl || "/";
    }
  };

  return (
    <div className="flex min-h-[95vh] items-center justify-center bg-white px-5">
      <div className="w-full max-w-md rounded-xl border border-gray-200 p-8 shadow-sm">
        {/* Header */}
        <h1 className="text-center text-2xl font-semibold text-black">
          Sign in to your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Welcome back 👋
        </p>

        {/* Credentials form */}
        <form onSubmit={handleCredentialsLogin} className="mt-6 space-y-4">
          {/* Email Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white transition hover:bg-gray-900 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          You don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-black hover:underline"
          >
            Register
          </a>
        </p>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google login */}
        <button
          onClick={() => signIn("google", { callbackUrl})}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}