"use client";

import { useGSAP } from "@gsap/react";
import { cn } from "@lib/utils";
import gsap from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const Reviews = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tweets = [
    {
      id: 1,
      user: "@startup_CEO",
      text: "Bukola literally doubled our engagement in month 1. Absolute wizard! ✨",
      x: 10,
      y: 15,
    },
    {
      id: 2,
      user: "@beauty_vibe",
      text: "Finally a manager who understands aesthetic and analytics equally.",
      x: 70,
      y: 10,
    },
    {
      id: 3,
      user: "@techCrunchy",
      text: "The ROI on our ad spend tripled thanks to her targeted strategy.",
      x: 80,
      y: 30,
    },
    {
      id: 4,
      user: "@foodie_king",
      text: "Our community has never been more active. Top notch work.",
      x: 5,
      y: 50,
    },
    {
      id: 5,
      user: "@crypto_bro",
      text: "Organic growth is hard, but she makes it look like a walk in the park.",
      x: 75,
      y: 60,
    },
    {
      id: 6,
      user: "@yoga_mamma",
      text: "Peace of mind knowing my social is in the best hands. 🧘‍♀️",
      x: 15,
      y: 80,
    },
  ];

  const connections = [
    [1, 2],
    [2, 3],
    [3, 6],
    [6, 5],
    [5, 4],
    [4, 1],
    [2, 4],
    [3, 5],
  ];

  useGSAP(
    () => {
      if (isMobile) return;
      const items = gsap.utils.toArray(".tweet-node");
      items.forEach((item: any) => {
        gsap.to(item, {
          x: "random(-15, 15)",
          y: "random(-15, 15)",
          duration: "4 + Math.random() * 3",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: reviewsRef, dependencies: [isMobile] },
  );

  return (
    <section
      id="reviews"
      className="min-h-[700px] lg:min-h-screen flex flex-col justify-center py-20 md:py-28 px-6 md:px-12 bg-background overflow-hidden relative border-t border-foreground/10"
    >
      <div className="max-w-4xl mx-auto text-center relative z-20 mb-12 md:mb-20 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4 text-foreground">
          Client Testimonials
        </div>
        <h2 className="text-6xl md:text-8xl font-bold mb-4 font-display text-foreground italic leading-none">
          Whispers
        </h2>
      </div>

      <div
        ref={reviewsRef}
        className={cn(
          "z-10 w-full h-full",
          isMobile
            ? "relative grid grid-cols-1 gap-6 max-w-sm mx-auto"
            : "absolute inset-0",
        )}
      >
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            {connections.map(([a, b], i) => {
              const start = tweets.find((t) => t.id === a)!;
              const end = tweets.find((t) => t.id === b)!;
              return (
                <motion.line
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke="var(--foreground)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>
        )}

        {tweets.map((tweet) => (
          <motion.div
            key={tweet.id}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.05,
              zIndex: 100,
            }}
            className={cn(
              "tweet-node p-6 bg-background/80 text-foreground border border-foreground/10 hover:bg-foreground hover:text-background hover:border-foreground cursor-pointer transition-all duration-500 shadow-2xl backdrop-blur-md",
              !isMobile ? "absolute max-w-[280px]" : "relative w-full",
            )}
            style={!isMobile ? { left: `${tweet.x}%`, top: `${tweet.y}%` } : {}}
          >
            <div className="opacity-40 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
              {tweet.user}
            </div>
            <p className="text-[12px] md:text-[13px] leading-relaxed font-medium italic">
              "{tweet.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
