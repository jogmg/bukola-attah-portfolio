"use client";

import { cn } from "@lib/utils";
import gsap from "gsap";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Navbar = ({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: href === "#home" ? 0 : href,
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm",
      )}
    >
      <div className="text-2xl font-bold font-display tracking-tighter hover:scale-105 transition-transform cursor-pointer">
        BUKOLA.SOCIAL
      </div>
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="text-[10px] uppercase tracking-[0.2em] font-medium hover:opacity-100 opacity-60 transition-opacity relative group"
            id={`nav-item-${item.name.toLowerCase()}`}
          >
            {item.name}
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-foreground/5 transition-colors cursor-pointer"
          aria-label="Toggle theme"
          id="theme-toggle"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button className="px-5 py-2 border border-foreground text-[10px] uppercase tracking-widest cursor-pointer hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300 ease-in hidden lg:block">
          Work With Me
        </button>
      </div>
    </nav>
  );
};
