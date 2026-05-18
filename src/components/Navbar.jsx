import Link from "next/link";
import BottomNav from "./nav/BottomNav";
import AuthActions from "./nav/AuthActions";
import { mainNavLinks } from "./nav/navConfig";

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-bg-light shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold text-primary transition-colors hover:text-secondary"
          >
            Logo
          </Link>

          <ul className="hidden flex-1 flex-wrap items-center justify-center gap-1 lg:flex lg:gap-2">
            {mainNavLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-text-dark transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <AuthActions className="hidden lg:flex" />
          <AuthActions className="hidden md:flex lg:hidden" compact />
        </nav>
      </header>

      <BottomNav />
    </>
  );
}
