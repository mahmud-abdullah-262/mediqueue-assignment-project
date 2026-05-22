"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-14 w-[200px]" /> // placeholder, layout shift রোধ করে
    );
  }

  return (
    <Link href="/" className="shrink-0 transition-colors">
      <Image
        src={resolvedTheme === "dark" ? "/assets/medilogow.png" : "/assets/medilogo.png"}
        width={200}
        height={80}
        alt="logo"
        className="h-14 w-full object-cover object-center"
      />
    </Link>
  );
}