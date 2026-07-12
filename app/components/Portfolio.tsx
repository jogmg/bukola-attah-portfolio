"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import Button from "./base/Button";

export const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [porfolioHovered, setPortfolioHovered] = useState<number | null>(null);

  const projects = [
    {
      title: "Eco-Wear Rebrand",
      desc: "Sustainable fashion growth strategy.",
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "FitLife App Launch",
      desc: "100k downloads in 3 months.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Z-Tech Gadgets",
      desc: "Viral TikTok review campaign.",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Gourmet Bites",
      desc: "Foodie community engagement.",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Cloud Scale SAAS",
      desc: "Enterprise LinkedIn authority.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const isMobile = windowWidth < 768;
  const currentCardWidth = isMobile ? Math.min(300, windowWidth * 0.75) : 400;
  const gap = isMobile ? 24 : 32;

  // Calculate x position to center the active card
  const xTranslation =
    windowWidth / 2 -
    activeIndex * (currentCardWidth + gap) -
    currentCardWidth / 2;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="portfolio"
      className="py-20 md:py-28 px-6 md:px-12 bg-foreground/5 border-t border-foreground/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-20">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">
            Curated work
          </div>
          <h2 className="text-5xl md:text-8xl font-bold font-display uppercase tracking-tighter italic leading-none">
            Portfolio
          </h2>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex gap-3 md:gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
              aria-label="Previous project"
            >
              <ChevronLeft size={isMobile ? 16 : 20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
              aria-label="Next project"
            >
              <ChevronRight size={isMobile ? 16 : 20} />
            </button>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
            {String(activeIndex + 1).padStart(2, "0")} —{" "}
            {String(projects.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-visible">
        <motion.div
          animate={{ x: xTranslation }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
          className="flex items-center py-10 md:py-20"
          style={{ gap: `${gap}px`, width: "fit-content" }}
        >
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? 1.05 : 0.85,
                  opacity: isActive ? 1 : 0.25,
                  filter: isActive ? "blur(0px)" : "blur(4px)",
                }}
                className="flex-none relative group"
                style={{ width: `${currentCardWidth}px` }}
                onClick={() => {
                  setActiveIndex(i);
                }}
              >
                <div className="bg-background border border-foreground/10 p-3 md:p-4 shadow-2xl rounded-sm">
                  <div
                    className="relative aspect-4/5 overflow-hidden mb-4 md:mb-6 bg-foreground/5"
                    onTouchStart={() => setPortfolioHovered(i)}
                    onTouchEnd={() => setPortfolioHovered(null)}
                    onMouseEnter={() => setPortfolioHovered(i)}
                    onMouseLeave={() => setPortfolioHovered(null)}
                  >
                    <Image
                      src={project.img}
                      alt={project.title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-1000",
                        porfolioHovered === i && "scale-105",
                      )}
                      sizes="(max-width: 767px) 75vw, 400px"
                      fill
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 font-display tracking-tight uppercase">
                        {project.title}
                      </h3>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-50 mb-3 md:mb-4">
                        {project.desc}
                      </p>
                    </div>
                    <Button
                      text="Detail"
                      className="text-[9px] md:text-[10px] uppercase cursor-pointer tracking-widest border-b border-foreground pb-1 active:pb-2 transition-all font-bold"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
