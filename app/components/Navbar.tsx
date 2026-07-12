"use client";

import { cn, handleNavClick } from "@lib/utils";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

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

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm",
      )}
    >
      <Link
        href={"#home"}
        onClick={(e) => handleNavClick(e, "#home")}
        className="text-2xl font-bold font-display tracking-tighter hover:scale-105 transition-transform cursor-pointer"
      >
        BUKOLA.SOCIAL
      </Link>
      <div className="flex gap-4 items-center">
        <div className="hidden min-[900px]:flex gap-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[10px] uppercase tracking-[0.2em] font-medium px-2.5 hover:opacity-100 opacity-60 transition-opacity relative group"
              id={`nav-item-${item.name.toLowerCase()}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex lg:gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors cursor-pointer"
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Link href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
            <button className="hidden lg:block px-5 py-2 border border-foreground text-[10px] uppercase tracking-widest cursor-pointer hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300 ease-in">
              Work With Me
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
