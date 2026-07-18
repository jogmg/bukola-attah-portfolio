"use client";

import { Services } from "@/app/components/Services";
import { ThemeProvider, useTheme } from "@/app/lib/ThemeProvider";
import { About } from "@components/About";
import { Contact } from "@components/Contact";
import { Footer } from "@components/Footer";
import { Home } from "@components/Home";
import { Navbar } from "@components/Navbar";
import { Portfolio } from "@components/Portfolio";
import { Reviews } from "@components/Reviews";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function PageContent() {
  const { theme, toggleTheme } = useTheme();
  const appRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const homeSection = document.getElementById("home");
      const contentBundle = document.getElementById("content-bundle");
      const bundleSections = gsap.utils.toArray(
        "#content-bundle > section",
      ) as HTMLElement[];

      // 1. Home Stack Transition (Home Pins, Bundle Slides Over)
      if (homeSection && contentBundle) {
        ScrollTrigger.create({
          trigger: homeSection,
          start: "top top",
          endTrigger: contentBundle,
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.to(homeSection, {
          opacity: 0.1,
          scale: 0.9,
          filter: "blur(8px)",
          scrollTrigger: {
            trigger: contentBundle,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }

      // 2. Sections within the Bundle
      bundleSections.forEach((section, i) => {
        // Entry Animation
        gsap.from(section.children, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // "Natural" Dim and Blur Exit
        // As the section moves past the top of the viewport, it subtly fades and blurs
        if (i < bundleSections.length - 1) {
          gsap.to(section, {
            opacity: 0.4,
            scale: 0.97,
            filter: "blur(4px)",
            scrollTrigger: {
              trigger: section,
              start: "bottom 50%", // Start blurring only when the middle of the section enters the viewport
              end: "bottom 0%", // Full blur when the bottom reaches the top
              scrub: true,
            },
          });
        }
      });
    },
    { scope: appRef },
  );

  return (
    <div
      ref={appRef}
      className="antialiased selection:bg-foreground selection:text-background bg-background text-foreground"
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative">
        <Home />
        <div id="content-bundle" className="relative bg-background">
          <About />
          <Portfolio />
          <Services />
          <Reviews />
          <Contact />
        </div>
      </main>

      <div className="relative bg-background">
        <Footer />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
