import Link from "next/link";
import BottomNav from "./nav/BottomNav";
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

          <div className="hidden shrink-0 items-center gap-2 sm:gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-dark transition-colors hover:bg-primary/10 hover:text-primary"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary"
            >
              Register
            </Link>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex lg:hidden">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-text-dark transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-secondary"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      <BottomNav />
    </>
  );
}
