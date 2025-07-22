import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Manage Events", path: "/manage-events" },
  ];

  return (
    <header className="w-full rounded-xl sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-b shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
          <span className="text-yellow-400">E</span>ventify
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-3 py-1 rounded-md text-slate-200 font-medium transition-colors duration-200 hover:bg-white/10 hover:text-yellow-300",
                  isActive &&
                    "text-yellow-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5/6 after:h-0.5 after:bg-yellow-300"
                )}
                onClick={() => setMenuOpen(false)} // close menu on click
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
          {/* Close icon */}
          <svg
            className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-t border-gray-700 shadow-inner">
          <div className="px-6 py-3 flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-slate-200 font-medium transition-colors duration-200 hover:bg-white/10 hover:text-yellow-300",
                    isActive && "text-yellow-400 bg-white/20"
                  )}
                  onClick={() => setMenuOpen(false)} // close menu on click
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
