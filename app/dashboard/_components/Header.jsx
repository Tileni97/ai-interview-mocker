"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/questions", label: "Questions" },
    { href: "/dashboard/technical", label: "Technical" },
    { href: "/dashboard/upgrade", label: "Upgrade" },
    { href: "/dashboard/how", label: "How it Works?" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard">
          <Image
            src="/logo.svg"
            width={160}
            height={100}
            alt="logo"
            className="cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} currentPath={path} />
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white px-4 py-2">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} currentPath={path} mobile />
          ))}
        </nav>
      )}
    </header>
  );
}

function NavItem({ href, label, currentPath, mobile }) {
  const isActive = currentPath === href;
  const baseClasses = "transition-colors duration-200";
  const mobileClasses = mobile ? "block py-2" : "";
  const activeClasses = isActive
    ? "text-primary font-semibold"
    : "text-gray-600 hover:text-primary";

  return (
    <Link href={href}>
      <span className={`${baseClasses} ${mobileClasses} ${activeClasses}`}>
        {label}
      </span>
    </Link>
  );
}

export default Header;
