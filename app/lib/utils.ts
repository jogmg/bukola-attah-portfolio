import { clsx, type ClassValue } from "clsx";
import gsap from "gsap";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleNavClick = (
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
