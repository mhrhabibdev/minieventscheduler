import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ThemeProvider/ModeToggle";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Manage Events", path: "/manage-events" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 border-b bg-background text-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          <span className="text-primary">E</span>ventify
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-3 py-1 rounded-md font-medium transition-colors duration-200 hover:bg-muted hover:text-primary",
                    isActive &&
                      "text-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5/6 after:h-0.5 after:bg-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ModeToggle />
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {/* Hamburger Icon */}
            <svg
              className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
            {/* Close Icon */}
            <svg
              className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-t shadow-inner">
          <div className="px-6 py-3 flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md font-medium transition-colors duration-200 hover:bg-muted hover:text-primary",
                    isActive && "text-primary bg-muted"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mode Toggle inside Mobile Menu */}
            <div className="pt-2 border-t">
              <ModeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
