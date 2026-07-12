"use client";

import { cn } from "@lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

export const Services = () => {
  const [packageHovered, setPackageHovered] = useState<number | null>(null);

  const plans = [
    {
      name: "Silver",
      price: "1,500",
      features: [
        "3 Posts per Week",
        "Basic Analytics",
        "Community Moderation",
        "Hashtag Research",
      ],
      highlight: false,
    },
    {
      name: "Gold",
      price: "3,500",
      features: [
        "Daily Posts",
        "Influencer Strategy",
        "Ad Management",
        "Monthly Video Content",
        "Bi-weekly Reports",
      ],
      highlight: true,
    },
    {
      name: "Platinum",
      price: "7,000",
      features: [
        "Everything in Gold",
        "Personal Branding",
        "Events Coverage",
        "VIP Support",
        "Podcast Integration",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-28 px-6 md:px-12 border-t border-foreground/10 bg-background"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-20">
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">
            Service Plans
          </div>
          <h2 className="text-6xl font-bold mb-4 font-display italic">
            Packages
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              animate={
                packageHovered === idx
                  ? { scale: 1.08, zIndex: 30 }
                  : { scale: 1, zIndex: 1 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={() => setPackageHovered(idx)}
              onMouseLeave={() => setPackageHovered(null)}
              onTouchStart={() => setPackageHovered(idx)}
              onTouchEnd={() => setPackageHovered(null)}
              className={cn(
                "p-10 border flex flex-col h-full transition-all duration-500",
                plan.highlight
                  ? "border-background/5 hover:border-background/30 shadow-[0_0_20px_4px_#FFD700]"
                  : "border-foreground/5 hover:border-foreground/30",
              )}
            >
              <h3 className="text-2xl font-bold mb-1 font-display uppercase tracking-tight">
                {plan.name}
              </h3>
              <p
                className={cn(
                  "text-[9px] uppercase tracking-widest mb-10 opacity-40",
                  plan.highlight && "opacity-70",
                )}
              >
                Plan Architecture
              </p>

              <div className="flex items-baseline mb-12">
                <span className="text-5xl font-display italic font-bold tracking-tighter">
                  ${plan.price}
                </span>
                <span className="text-[10px] opacity-40 ml-2 uppercase tracking-widest">
                  / monthly
                </span>
              </div>
              <ul className="space-y-4 mb-2 grow opacity-60">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 text-[11px] uppercase tracking-wider leading-relaxed"
                  >
                    <div
                      className={cn(
                        "w-1 h-1 bg-foreground",
                        plan.highlight && "bg-background",
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
