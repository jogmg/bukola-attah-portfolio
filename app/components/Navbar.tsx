"use client";

import { handleNavClick } from "@lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Button from "./common/Button";
import ThemeToggle from "./common/ThemeToggle";

export const Navbar = ({
  theme,
  toggleTheme,
  portfolioTitle,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
  portfolioTitle?: string;
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
    <nav className="sticky top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm">
      <Link
        href={"/"}
        className="text-2xl font-bold font-display tracking-tighter hover:scale-105 transition-transform cursor-pointer"
      >
        BUKOLA.SOCIAL
      </Link>
      {!portfolioTitle && (
        <div className="flex gap-4 items-center">
          <div className="hidden min-[900px]:flex gap-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-[10px] uppercase tracking-[0.2em] font-medium p-2.5 hover:opacity-100 opacity-60 transition-opacity relative group"
                id={`nav-item-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex lg:gap-4 items-center">
            <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
            <Button
              text="Work With Me"
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden lg:block px-5 py-2 border border-foreground text-[10px] uppercase tracking-widest cursor-pointer hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300 ease-in"
            />
          </div>
        </div>
      )}
      {portfolioTitle && (
        <div className="flex lg:gap-4 items-center">
          <p className="hidden sm:block font-mono text-xs uppercase tracking-widest">
            Case Study — {portfolioTitle}
          </p>
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          <Button
            text={
              <p className="flex items-center gap-2">
                <ArrowLeft
                  size={12}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to Projects
              </p>
            }
            href="//#portfolio"
            className="hidden lg:block px-5 py-2 border border-foreground text-[10px] uppercase tracking-widest cursor-pointer hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300 ease-in"
          />
        </div>
      )}
    </nav>
  );
};
