import Link from "next/link";
import React from "react";

interface ISocialLink {
  href: string;
  icon: React.ReactNode;
}

export default function SocialLink({ href, icon }: ISocialLink) {
  return (
    <Link
      href={href}
      className="opacity-40 hover:opacity-70 active:opacity-100 transition-opacity"
      id="social-ig"
    >
      {icon}
    </Link>
  );
}
