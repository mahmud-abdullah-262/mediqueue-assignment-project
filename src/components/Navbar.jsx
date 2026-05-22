import Link from "next/link";
import BottomNav from "./nav/BottomNav";
import AuthActions from "./nav/AuthActions";
import { mainNavLinks } from "./nav/navConfig";
import Image from "next/image";
import NavLink from "./Navlink";
import { ToggolBtn } from "./ToggolBtn";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-bg-light dark:bg-bg-light shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <Logo></Logo>

      <ul className="hidden flex-1 flex-wrap items-center justify-center gap-1 lg:flex lg:gap-2">
  {mainNavLinks.map(({ href, label }) => (
    <li key={href}>
      <NavLink href={href} label={label} />
    </li>
  ))}
</ul>

          <AuthActions className="hidden lg:flex" />
          <AuthActions className="hidden md:flex lg:hidden" compact />
          <ToggolBtn/>
        </nav>
      </header>

      <BottomNav />
    </>
  );
}
