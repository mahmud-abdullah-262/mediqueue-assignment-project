"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthActions({ className = "", compact = false }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const btn = compact ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm";

  if (isPending) {
    return (
      <div
        className={`h-9 w-24 animate-pulse rounded-lg bg-primary/10 ${className}`}
      />
    );
  }

  if (session?.user) {
    return (
      <div className={`flex shrink-0 items-center gap-2 sm:gap-3 ${className}`}>
    
        <button
          type="button"
          onClick={handleLogout}
          className={`rounded-lg bg-primary font-medium text-white transition-colors hover:bg-secondary ${btn}`}
        >
          Logout
        </button>

         <Link
     href={'/profile'}

     >
      <div className=" rounded-full border-2 border-primary ">
<Image
     src={session?.user?.image}
     width={50}
     height={50}
     alt={session?.user?.name}
     className="w-8 h-8 rounded-full object-cover object-center"
     />
      </div>
     
     </Link>
      </div>
    );
  }

  return (
    <div className={`flex shrink-0 items-center gap-2 sm:gap-3 ${className}`}>
      <Link
        href="/login"
        className={`rounded-lg font-medium text-text-dark transition-colors hover:bg-primary/10 hover:text-primary ${btn}`}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={`rounded-lg bg-primary font-medium text-white transition-colors hover:bg-secondary ${btn}`}
      >
        Register
      </Link>
    </div>
  );
}
