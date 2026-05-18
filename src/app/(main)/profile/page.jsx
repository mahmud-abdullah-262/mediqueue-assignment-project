"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="p-6">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="p-6">
        <p className="mb-4">You are not logged in.</p>
        <Link href="/login" className="text-primary underline">
          Go to Login
        </Link>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-bold text-primary">Profile</h1>
      <div className="space-y-3 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        {user.image && (
          <p>
            <span className="font-medium">Photo:</span> {user.image}
          </p>
        )}
      </div>
    </div>
  );
}
