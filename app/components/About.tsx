"use client";

import { SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import bukolaImg from "@public/bukola.webp";
import Image from "next/image";

export const About = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 px-6 md:px-12 border-t border-foreground/10 bg-background"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center w-full">
        <div className="relative group">
          <div className="aspect-4/5 rounded-xl overflow-hidden bg-foreground/5 border border-foreground/10">
            <Image
              src={bukolaImg}
              alt="Bukola Attah"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 grayscale hover:grayscale-0"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-foreground/20 rounded-full flex flex-col items-center justify-center p-4 bg-foreground z-10 text-center backdrop-blur-md">
            <span className="text-brand-light text-[10px] uppercase tracking-widest mb-1 opacity-60">
              Est.
            </span>
            <span className="text-brand-light font-display font-bold text-3xl">
              2023
            </span>
          </div>
        </div>
        <div className="space-y-8">
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40">
            Social Media Manager
          </div>
          <h2 className="text-5xl font-bold font-display leading-[1.2]">
            Crafting Narratives that <br className="hidden lg:block" />{" "}
            <span className="italic">Convert</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed body-font">
            I'm Bukola, a dedicated Social Media Manager with a passion for
            turning complex brand messages into digestible, engaging, and highly
            shareable content.
          </p>
          <div className="flex gap-6 py-4">
            <a
              href="#"
              className="opacity-40 hover:opacity-100 transition-opacity"
              id="social-ig"
            >
              <SiInstagram size={20} />
            </a>
            <a
              href="#"
              className="opacity-40 hover:opacity-100 transition-opacity"
              id="social-tw"
            >
              <SiX size={20} />
            </a>
            <a
              href="#"
              className="opacity-40 hover:opacity-100 transition-opacity"
              id="social-li"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
          </div>
          <button className="pt-4 border-b border-foreground text-xs uppercase tracking-widest font-bold cursor-pointer hover:pb-2 transition-all">
            Read More About My Process
          </button>
        </div>
      </div>
    </section>
  );
};
