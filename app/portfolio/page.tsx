"use client";

import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import { ThemeProvider, useTheme } from "@/app/lib/ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  ChevronRight,
  Laptop,
  Layers,
  Pause,
  Play,
  Route,
  Smartphone,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import IphoneCanvas from "../components/IphoneCanvas";
import { cn } from "../lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    },
  },
} as const;

function PortfolioDetailContent() {
  const { theme, toggleTheme } = useTheme();
  const [screenIdx, setScreenIdx] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Refs for scroll animations
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const phone3DRef = useRef<THREE.Group | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reelsContainerRef = useRef<HTMLDivElement>(null);

  // Sample data for the page
  const projectDetails = {
    title: "Cloud Scale SAAS",
    subtitle: "Enterprise LinkedIn Authority",
    desc: "A complete redesign and optimization of a high-growth SaaS platform's mobile experience. We turned complex enterprise analytics into a hyper-engaging, intuitive interface that increased daily active users by 42% in under three months.",
    services: [
      "UI/UX Design",
      "3D Interactive Mockups",
      "Front-end Development",
      "Brand Strategy",
    ],
    platforms: ["iOS App Store", "Android Play Store", "Mobile Web"],
    comparison: {
      desc: "We completely re-architected the layout to put analytics upfront. Observe the workflow consolidation and cognitive load reduction.",
      beforeUrl: "/analytics/old1.jpeg",
    },
    goal: "Translate a massive, data-heavy desktop enterprise dashboard into a pocket-sized mobile interface without sacrificing analytical depth, while drastically lowering user friction.",
    approach:
      "We designed a gesture-driven dashboard utilizing 3D micro-interactions. Users can pivot, drill-down, and share reports seamlessly. The layout centers around visual hierarchy and high-fidelity feedback loops.",
    stats: [
      { label: "User Engagement", target: 58, suffix: "% Increase" },
      { label: "Load Performance", target: 240, suffix: "% Faster" },
      { label: "Conversion Rate", target: 4.8, suffix: "%", decimals: 1 },
      { label: "App Store Rating", target: 4.9, suffix: "/ 5.0" },
    ],
    reels: [
      {
        id: 1,
        title: "Analytics Demo",
        category: "Interaction Design",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 2,
        title: "3D iPhone Scroll",
        category: "Interactive 3D",
        thumbnail:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 5,
        title: "Before & After comparison",
        category: "UI Animation",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 6,
        title: "Onboarding Flow",
        category: "UX Research",
        thumbnail:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 7,
        title: "Before & After comparison",
        category: "UI Animation",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 8,
        title: "Onboarding Flow",
        category: "UX Research",
        thumbnail:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 9,
        title: "Onboarding Flow",
        category: "UX Research",
        thumbnail:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 10,
        title: "Before & After comparison",
        category: "UI Animation",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
      {
        id: 11,
        title: "Onboarding Flow",
        category: "UX Research",
        thumbnail:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=700",
        videoUrl: "https://lorem.video/1080x1920",
      },
    ],
    screens: [
      { id: "#before-after-section", screenUrl: "/analytics/wallpaper_2.jpeg" },
      { id: "#strategy-section", screenUrl: "/analytics/wallpaper_3.jpeg" },
    ],
  };

  const handleScroll = () => {
    if (reelsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        reelsContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

      const gapVal = window.innerWidth >= 768 ? 32 : 24;
      const index = Math.round(scrollLeft / (280 + gapVal));
      setActiveReelIndex(index);
    }
  };

  // Navigation for Reels
  const handlePrevReel = () => {
    if (reelsContainerRef.current) {
      const gapVal = window.innerWidth >= 768 ? 32 : 24;
      const prevIndex = Math.max(0, activeReelIndex - 1);
      reelsContainerRef.current.scrollTo({
        left: prevIndex * (280 + gapVal),
        behavior: "smooth",
      });
    }
  };

  const handleNextReel = () => {
    if (reelsContainerRef.current) {
      const gapVal = window.innerWidth >= 768 ? 32 : 24;
      const nextIndex = Math.min(
        projectDetails.reels.length - 1,
        activeReelIndex + 1,
      );
      reelsContainerRef.current.scrollTo({
        left: nextIndex * (280 + gapVal),
        behavior: "smooth",
      });
    }
  };

  const toggleVideoPlay = (index: number) => {
    const video = document.getElementById(
      `reel-video-${index}`,
    ) as HTMLVideoElement;
    if (!video) return;

    if (playingVideo === index) {
      video.pause();
      setPlayingVideo(null);
    } else {
      // Pause other playing videos
      if (playingVideo !== null) {
        const prevVideo = document.getElementById(
          `reel-video-${playingVideo}`,
        ) as HTMLVideoElement;
        if (prevVideo) prevVideo.pause();
      }
      video.play().catch((err) => console.log("Play interrupted", err));
      setPlayingVideo(index);
    }
  };

  useGSAP(
    () => {
      projectDetails.screens.forEach(({ id }, idx) => {
        ScrollTrigger.create({
          trigger: id,
          start: "top 20%",
          end: "bottom 20%",
          onEnter: () => setScreenIdx(idx),
          onEnterBack: () => setScreenIdx(idx),
        });
      });

      // --- 2. STATS INCREMENTING ANIMATION ---
      const statsElements = gsap.utils.toArray(".stat-number");
      statsElements.forEach((stat: any) => {
        const target = parseFloat(stat.getAttribute("data-target") || "0");
        const decimals = parseInt(stat.getAttribute("data-decimals") || "0");

        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 3,
            ease: "power3.out",
            snap: {
              innerText: decimals > 0 ? Math.pow(10, -decimals) : 1,
            },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            },
            onUpdate: function () {
              if (decimals > 0) {
                // Ensure correct decimals are printed
                stat.innerText = parseFloat(stat.innerText).toFixed(decimals);
              }
            },
          },
        );
      });
    },
    { scope: pageContainerRef },
  );

  useEffect(() => {
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleScroll, 200);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      ref={pageContainerRef}
      className="antialiased selection:bg-foreground selection:text-background bg-background text-foreground min-h-screen flex flex-col"
    >
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        portfolioTitle={projectDetails.title}
      />
      <main className="grow relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full relative">
          {/* LEFT SIDE: SCROLLING CONTENT SECTIONS */}
          <div className="relative lg:col-span-2">
            {/* SECTION 1: HERO & META */}
            <motion.section
              id="hero-section"
              className="flex flex-col px-6 md:px-12 py-16 md:py-24 border-b border-foreground"
              initial="hidden"
              whileInView={isMounted ? "visible" : "hidden"}
              viewport={{ once: false, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div
                variants={childVariants}
                className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 dark:text-neutral-500 mb-3"
              >
                {projectDetails.subtitle}
              </motion.div>
              <motion.h1
                variants={childVariants}
                className="text-5xl md:text-8xl font-bold uppercase tracking-tighter italic mb-8 leading-none"
              >
                {projectDetails.title}
              </motion.h1>
              <motion.p
                variants={childVariants}
                className="mb-12 font-light leading-relaxed"
              >
                {projectDetails.desc}
              </motion.p>

              {/* SERVICES RENDERED & PLATFORMS GRID */}
              <motion.div
                variants={childVariants}
                className="grid grid-cols-2 gap-8"
              >
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-500 mb-3 flex items-center gap-2">
                    <Layers size={18} /> Services Rendered
                  </h4>
                  <ul className="space-y-2 text-sm list-disc list-inside pl-1.5">
                    {projectDetails.services.map((service, idx) => (
                      <li key={idx}>{service}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-500 mb-3 flex items-center gap-2">
                    <Laptop size={18} /> Platforms
                  </h4>
                  <ul className="font-sans space-y-2 text-sm list-disc list-inside pl-1.5">
                    {projectDetails.platforms.map((platform, idx) => (
                      <li key={idx}>{platform}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.section>

            {/* SECTION 2: BEFORE & AFTER ANALYTICS */}
            <motion.section
              id="before-after-section"
              className="flex flex-col px-6 md:px-12 py-20 md:py-28 border-b border-foreground"
              initial="hidden"
              whileInView={isMounted ? "visible" : "hidden"}
              viewport={{ once: false, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={childVariants} className="mb-12">
                <div className="text-[10px] uppercase tracking-[0.4em] mb-2 text-neutral-600 dark:text-neutral-500">
                  Optimization Comparative
                </div>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter italic">
                  Before & After
                </h2>
                <p className="mt-4 leading-relaxed">
                  {projectDetails.comparison.desc}
                </p>
              </motion.div>

              {/* COMPARATIVE CARDS CONTAINER */}
              <motion.div
                variants={childVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative"
              >
                {/* BEFORE: STATIC DEVICE MOCKUP */}
                <div className="border border-foreground/10 bg-foreground/[0.02] p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-foreground/20 transition-all duration-300">
                  <div className="mb-8">
                    <span className="px-3 py-1 text-[8px] tracking-[0.2em] uppercase font-bold border border-red-500/20 text-red-500 rounded-full bg-red-500/5">
                      Legacy Dashboard
                    </span>
                    <h3 className="text-xl font-display font-bold mt-4 mb-2">
                      Fragmented & Text-Heavy
                    </h3>
                    <p className="text-xs opacity-50">
                      High cognitive load. Crucial performance metrics were
                      buried under deep tabs and non-responsive lists.
                    </p>
                  </div>

                  {/* BEFORE: 3D PHONE MOCKUP ARTIFACT REPRESENTATION */}
                  <div className="h-64 relative bg-foreground/5 rounded-xl border border-foreground/10 flex items-center justify-center overflow-hidden">
                    {/* Placeholder illustrating the Static 3D Asset which will be replaced by the client */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-2 animate-pulse">
                        <Smartphone size={20} className="opacity-40" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
                        [Static 3D iPhone Asset]
                      </span>
                      <p className="text-[8px] opacity-30 mt-2 max-w-[200px]">
                        Rendered with standard red/gray low engagement analytics
                        overlay
                      </p>
                    </div>
                  </div>
                </div>

                {/* THE AESTHETIC CONNECTOR ARROW */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-background border border-foreground/10 flex items-center justify-center shadow-lg group">
                    <svg
                      className="w-6 h-6 text-foreground animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* AFTER: TARGET POINTING TO STICKY INTERACTIVE MODEL */}
                <div className="border border-foreground/20 bg-foreground/5 p-6 rounded-2xl flex flex-col justify-between relative hover:border-foreground/30 transition-all duration-300">
                  <div>
                    <span className="px-3 py-1 text-[8px] tracking-[0.2em] uppercase font-bold border border-emerald-500/20 text-emerald-500 rounded-full bg-emerald-500/5">
                      New Redesign
                    </span>
                    <h3 className="text-xl font-display font-bold mt-4 mb-2">
                      Gesture-Driven 3D Canvas
                    </h3>
                    <p className="text-xs opacity-50">
                      Unified analytics panel with active scroll states. Users
                      swipe natively to navigate metric cards.
                    </p>
                  </div>

                  <div className="h-64 relative bg-foreground/10 rounded-xl border border-foreground/20 flex flex-col items-center justify-center overflow-hidden">
                    {/* Placeholder illustrating the Scroll-controlled target */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mb-2">
                        <TrendingUp size={20} className="text-emerald-500" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold font-mono">
                        [Active Scroll Target]
                      </span>
                      <p className="text-[8px] opacity-40 mt-2 max-w-[200px]">
                        Scroll maps to the viewport interactive iPhone rotating
                        on the right
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.section>

            {/* SECTION 3: GOAL, APPROACH & RESULTS */}
            <motion.section
              id="strategy-section"
              className="flex flex-col gap-12 px-6 md:px-12 py-20 md:py-28"
              initial="hidden"
              whileInView={isMounted ? "visible" : "hidden"}
              viewport={{ once: false, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div variants={childVariants}>
                <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 dark:text-neutral-500 mb-2">
                  Project Framework
                </div>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter italic">
                  Strategy & Impact
                </h2>
              </motion.div>

              <motion.div
                variants={childVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="uppercase tracking-widest font-bold mb-4 flex items-center gap-2 border-b border-foreground pb-2">
                    <Target size={16} /> The Goal
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {projectDetails.goal}
                  </p>
                </div>
                <div>
                  <h3 className="uppercase tracking-widest font-bold mb-4 flex items-center gap-2 border-b border-foreground/10 pb-2">
                    <Route size={16} /> The Approach
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {projectDetails.approach}
                  </p>
                </div>
              </motion.div>

              {/* STATS COUNTING CARDS */}
              <motion.div
                variants={childVariants}
                ref={statsRef}
                className="grid grid-cols-2 gap-4"
              >
                {projectDetails.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="border border-foreground p-6 rounded-2xl transition-colors"
                  >
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-2 text-neutral-600 dark:text-neutral-500">
                      {stat.label}
                    </div>
                    <div className="text-3xl md:text-5xl font-display font-medium">
                      <span
                        className="stat-number"
                        data-target={stat.target}
                        data-decimals={stat.decimals || 0}
                      >
                        0
                      </span>
                      <span className="text-lg font-light ml-1">
                        {stat.suffix}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.section>
          </div>

          {/* RIGHT SIDE: STICKY VIEWPORT FOR 3D CANVAS */}
          <div className="hidden lg:block h-screen sticky top-0 right-0 py-16 md:py-24 pr-6 md:pr-12 overflow-hidden bg-foreground/[0.02]">
            {/* 3D CANVAS WRAPPER CONTEXT */}
            <div className="aspect-9/16 size-full">
              <IphoneCanvas
                phoneRef={phone3DRef}
                screens={projectDetails.screens.map((s) => s.screenUrl)}
                currentScreenIdx={screenIdx}
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: REELS & VIDEOS SECTION */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-foreground/5 border-t border-foreground/10 relative overflow-hidden">
          <div className="max-w-6xl mx-auto w-full mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-20">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">
                Interaction Highlights
              </div>
              <h2 className="text-4xl md:text-7xl font-bold font-display uppercase tracking-tighter italic leading-none">
                Reels
              </h2>
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center gap-6 md:gap-8">
              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={handlePrevReel}
                  disabled={!canScrollLeft}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-foreground disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Reel"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextReel}
                  disabled={!canScrollRight}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-foreground disabled:cursor-not-allowed transition-all"
                  aria-label="Next Reel"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
                {String(projectDetails.reels.length).padStart(2, "0")} — Reels
              </div>
            </div>
          </div>

          {/* Reels carousel viewer */}
          <div
            ref={reelsContainerRef}
            onScroll={handleScroll}
            className="relative w-full overflow-x-auto scroll-smooth hide-scrollbar px-6 md:px-12 py-4"
          >
            <div className="flex gap-6 md:gap-8">
              {projectDetails.reels.map((reel, idx) => (
                <div
                  key={reel.id}
                  className="w-[280px] shrink-0 group relative aspect-9/16 bg-foreground rounded-2xl overflow-hidden border border-foreground transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
                  onClick={() => toggleVideoPlay(idx)}
                >
                  {/* Background media */}
                  <div className="absolute inset-0 z-0">
                    <video
                      id={`reel-video-${idx}`}
                      src={reel.videoUrl}
                      poster={reel.thumbnail}
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      controls={playingVideo === idx}
                    />
                  </div>

                  {/* Header info */}
                  {playingVideo !== idx && (
                    <div className="relative z-20 flex justify-between items-start p-4">
                      <span className="text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-1 bg-neutral-300/50 dark:bg-neutral-700/50 backdrop-blur-sm border border-foreground rounded-md">
                        {reel.category}
                      </span>
                    </div>
                  )}

                  {/* Play Trigger UI */}
                  <div
                    className={cn(
                      "invisible group-hover:visible relative z-20 my-auto mx-auto",
                      playingVideo !== idx && "visible",
                    )}
                  >
                    <button
                      onClick={() => toggleVideoPlay(idx)}
                      className="size-14 rounded-full border border-foreground flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer text-foreground"
                    >
                      {playingVideo === idx ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </button>
                  </div>

                  {/* Caption detail */}
                  {playingVideo !== idx && (
                    <div className="relative z-20 bg-neutral-300/50 dark:bg-neutral-700/50 backdrop-blur-sm px-4 py-2">
                      <h4 className="text-base font-bold font-display uppercase tracking-tight text-foreground">
                        {reel.title}
                      </h4>
                      <p className="text-[9px] opacity-50 tracking-wide uppercase mt-1">
                        Tap to Play
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function PortfolioDetailPage() {
  return (
    <ThemeProvider>
      <PortfolioDetailContent />
    </ThemeProvider>
  );
}
