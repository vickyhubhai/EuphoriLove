"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="glass-effect mx-auto rounded-xl py-3 px-5 max-w-screen-lg w-full flex justify-between items-center mb-4" suppressHydrationWarning>
      <div className="flex items-center space-x-3">
        <Image src="/heart.png" alt="logo" width={35} height={35} className="floating-icon" />
        <h1 className="text-xl font-semibold gradient-text">EuphoriLove</h1>
      </div>
      <nav className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white hover:text-primary-400 transition-colors font-medium"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="md:hidden">
        <button className="text-white hover:text-primary-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}