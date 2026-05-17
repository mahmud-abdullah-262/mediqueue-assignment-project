"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ellipsis } from "@gravity-ui/icons";
import { useEffect, useRef, useState } from "react";
import { mainNavLinks, mobileNavLinks, moreNavLinks } from "./navConfig";

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

function MoreMenu({ isActive }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <div ref={menuRef} className="relative flex min-w-0 flex-1 flex-col">
      {open && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-xl border border-primary/15 bg-white py-2 shadow-lg">
          {moreNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-text-dark transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {label}
            </Link>
          ))}
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
  const moreActive = moreNavLinks.some(({ href }) => pathname === href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-bg-light shadow-[0_-4px_20px_rgba(124,58,237,0.08)] lg:hidden">
      {/* Tablet (md): all menu items */}
      <ul className="mx-auto hidden max-w-3xl items-stretch justify-around md:flex">
        {mainNavLinks.map((link) => (
          <li key={link.href} className="flex min-w-0 flex-1">
            <NavItem {...link} isActive={pathname === link.href} />
          </li>
        ))}
      </ul>

      {/* Mobile (< md): Home, Tutors, My Tutor, Profile + More */}
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 md:hidden">
        {mobileNavLinks.map((link) => (
          <li key={link.href} className="flex min-w-0 flex-1">
            <NavItem {...link} isActive={pathname === link.href} />
          </li>
        ))}
        <li className="flex min-w-0 flex-1">
          <MoreMenu isActive={moreActive} />
        </li>
      </ul>
    </nav>
  );
}
