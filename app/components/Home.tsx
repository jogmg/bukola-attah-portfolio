"use client";

import { useGSAP } from "@gsap/react";
import { cn } from "@lib/utils";
import gsap from "gsap";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

export const Home = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: "Active Clients", target: 24, icon: null },
    {
      label: "Total Revenue",
      target: 850,
      prefix: "$",
      suffix: "K+",
      icon: null,
    },
    {
      label: "Avg Engagement",
      target: 12,
      suffix: "%",
      icon: null,
      highlight: true,
    },
    { label: "Content Pieces", target: 5000, suffix: "+", icon: null },
  ];

  useGSAP(
    () => {
      const stats = gsap.utils.toArray(".stat-number");
      stats.forEach((stat: any) => {
        const target = parseInt(stat.getAttribute("data-target") || "0");
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
            },
          },
        );
      });
    },
    { scope: statsRef },
  );

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col px-6 md:px-12 relative justify-center items-center"
    >
      <div className="flex flex-col gap-12 py-6 max-h-screen max-w-6xl text-center w-full overflow-y-auto hide-scrollbar">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl text-balance md:text-9xl font-bold font-display leading-[1.1] tracking-tighter"
        >
          Elevate your <span className="italic">digital</span> influence.
        </motion.h1>

        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center justify-center p-8 border border-foreground/10 rounded-2xl transition-all duration-500",
                stat.highlight
                  ? "bg-foreground text-background"
                  : "bg-transparent",
              )}
            >
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3">
                {stat.label}
              </div>
              <div className="text-5xl font-display font-medium flex items-baseline">
                {stat.prefix}
                <span className="stat-number" data-target={stat.target}>
                  0
                </span>
                {stat.suffix}
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => gsap.to(window, { duration: 1, scrollTo: "#about" })}
          className="px-12 py-5 bg-foreground text-background uppercase tracking-[0.2em] text-[11px] font-bold hover:opacity-90 transition-all flex items-center gap-4 mx-auto animate-bounce"
          id="cta-home"
        >
          Scroll <ArrowUp size={14} />
        </motion.button>
      </div>
    </section>
  );
};
