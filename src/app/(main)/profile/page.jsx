"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    document.title = "Profile - MediQueue";
  }, []);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <div className="text-text-dark font-medium">Loading profile...</div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <div className="rounded-2xl border border-primary/10 bg-white p-8 shadow-sm text-center">
          <p className="mb-4 text-text-dark">You are not logged in.</p>
          <Link
            href="/login"
            className="inline-block rounded-xl bg-primary px-5 py-2 text-white hover:bg-secondary transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-lg border border-primary/10 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm opacity-90">Manage your account information</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-text-dark">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid gap-4">

            <div className="rounded-xl border border-primary/10 bg-bg-light p-4">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-text-dark font-medium">{user.name}</p>
            </div>

            <div className="rounded-xl border border-primary/10 bg-bg-light p-4">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-text-dark font-medium">{user.email}</p>
            </div>

            {user.image && (
              <div className="rounded-xl border border-primary/10 bg-bg-light p-4">
                <p className="text-sm text-gray-500 mb-2">Profile Photo</p>
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover border border-primary/20"
                />
              </div>
            )}
          </div>

          {/* Action Button */}
          <button className="w-full rounded-xl bg-accent py-2 text-white font-medium hover:opacity-90 transition">
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
}