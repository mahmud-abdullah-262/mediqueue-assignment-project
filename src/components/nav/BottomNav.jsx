"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Ellipsis } from "@gravity-ui/icons";
import { useEffect, useRef, useState } from "react";
import { mainNavLinks, mobileNavLinks, moreNavLinksGuest } from "./navConfig";

function NavItem({ href, label, icon: Icon, isActive }) {
  return (
    <Link
      href={href}
      className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-2 transition-colors ${
        isActive ? "text-primary" : "text-text-dark/70 hover:text-primary"
      }`}
    >
      <Icon width={22} height={22} className="shrink-0" />
      <span className="w-full truncate text-center text-[10px] font-medium leading-tight sm:text-xs">
        {label}
      </span>
    </Link>
  );
}

function MoreMenu({ links, isActive }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div ref={menuRef} className="relative flex min-w-0 flex-1 flex-col">
      {open && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-xl border border-primary/15 bg-white py-2 shadow-lg">
          {links.map((item) =>
            item.action === "logout" ? (
              <button
                key="logout"
                type="button"
                onClick={handleLogout}
                className="block w-full px-4 py-2.5 text-left text-sm font-medium text-text-dark transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-text-dark transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full flex-col items-center gap-0.5 px-1 py-2 transition-colors ${
          isActive || open
            ? "text-primary"
            : "text-text-dark/70 hover:text-primary"
        }`}
        aria-expanded={open}
        aria-label="More menu"
      >
        <Ellipsis width={22} height={22} />
        <span className="text-[10px] font-medium sm:text-xs">More</span>
      </button>
    </div>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const moreLinks = session?.user
    ? [
        ...moreNavLinksGuest.filter(
          (l) => l.href !== "/login" && l.href !== "/register"
        ),
        { label: "Logout", action: "logout" },
      ]
    : moreNavLinksGuest;

  const moreActive =
    moreLinks.some((item) => item.href && pathname === item.href) ||
    (session?.user && pathname === "/profile");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-bg-light shadow-[0_-4px_20px_rgba(124,58,237,0.08)] lg:hidden">
      <ul className="mx-auto hidden max-w-3xl items-stretch justify-around md:flex">
        {mainNavLinks.map((link) => (
          <li key={link.href} className="flex min-w-0 flex-1">
            <NavItem {...link} isActive={pathname === link.href} />
          </li>
        ))}
      </ul>

      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 md:hidden">
        {mobileNavLinks.map((link) => (
          <li key={link.href} className="flex min-w-0 flex-1">
            <NavItem {...link} isActive={pathname === link.href} />
          </li>
        ))}
        <li className="flex min-w-0 flex-1">
          <MoreMenu links={moreLinks} isActive={moreActive} />
        </li>
      </ul>
    </nav>
  );
}
