"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import Button from "./base/Button";

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-6 md:px-12 border-t border-foreground/10 bg-background"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 w-full">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">
            Engagement
          </div>
          <h2 className="text-6xl font-bold mb-8 font-display italic">
            Say Hello
          </h2>
          <p className="text-lg text-foreground/60 mb-16 leading-relaxed">
            Ready to take your social presence to the next level? Drop a message
            and I'll get back to you within 24 hours.
          </p>

          <div className="space-y-12">
            <div className="flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-widest opacity-40">
                Email
              </div>
              <Button
                text="hello@bukola.social"
                href="mailto:#"
                className="text-xl font-display w-fit border-b border-foreground/20 pb-1 active:pb-2 transition-all cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-widest opacity-40">
                Phone
              </div>
              <Button
                text="+1 (234) 567 8900"
                href="tel:#"
                className="text-xl font-display w-fit border-b border-foreground/20 pb-1 active:pb-2 transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <div className="text-[9px] uppercase tracking-widest opacity-40 mb-2">
              Your Name
            </div>
            <input
              type="text"
              required
              className="w-full text-sm placeholder:text-brand-dark/50 dark:placeholder:text-brand-light/50 bg-transparent border-b border-foreground/20 pb-4 focus:border-foreground outline-none transition-all duration-300"
              placeholder="Your full name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest opacity-40 mb-2">
              Email Address
            </div>
            <input
              type="email"
              required
              className="w-full text-sm placeholder:text-brand-dark/50 dark:placeholder:text-brand-light/50 bg-transparent border-b border-foreground/20 pb-4 focus:border-foreground outline-none transition-all duration-300"
              placeholder="Email address"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest opacity-40 mb-2">
              Project Vision
            </div>
            <textarea
              rows={4}
              required
              className="w-full text-sm placeholder:text-brand-dark/50 dark:placeholder:text-brand-light/50 bg-transparent border-b border-foreground/20 pb-4 focus:border-foreground outline-none resize-none transition-all duration-300"
              placeholder="Briefly describe your objectives"
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-6 cursor-pointer bg-foreground text-background font-bold text-[11px] uppercase tracking-[0.3em] border border-foreground/20 transition-opacity"
            id="form-submit"
          >
            {submitted ? "Message Received" : "Send Message"}
          </motion.button>
        </form>
      </div>
    </section>
  );
};
