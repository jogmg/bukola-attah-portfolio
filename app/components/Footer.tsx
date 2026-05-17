"use client";

export const Footer = () => (
  <footer className="w-full px-6 md:px-12 py-10 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.3em] uppercase">
    <div className="mb-6 md:mb-0">
      © {new Date().getFullYear()} BUKOLA SOCIAL. ALL RIGHTS RESERVED.
    </div>
    <div className="flex gap-8">
      <a href="#">Instagram</a>
      <a href="#">LinkedIn</a>
      <a href="#">X / Twitter</a>
    </div>
  </footer>
);
