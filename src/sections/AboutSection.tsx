"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const CORE_VALUES = [
  {
    title: "Transparency First",
    description:
      "Clear milestones, open communication, and artifacts you can share with stakeholders without extra polish.",
  },
  {
    title: "Velocity With Discipline",
    description:
      "We ship fast, but never at the expense of accessibility, performance, or documentation.",
  },
  {
    title: "Embedded Partnership",
    description:
      "We integrate with your sprints, rituals, and tools so the hand-off from agency to in-house team is seamless.",
  },
];

const CAPABILITIES = [
  "Product & GTM Alignment",
  "Design Systems & Prototyping",
  "Full-stack Web Engineering",
  "Lifecycle & Experimentation",
  "Platform Integrations",
  "Analytics & Insights",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-gray-950 py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-12">
            <div className="space-y-6">
            <p
            ref={eyebrowRef}
            className="text-sm uppercase tracking-[0.4em] text-[#00BDFF] mb-6"
          >
            About
          </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                We partner with teams that treat digital as a growth engine, not just a website.
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">
                From strategy workshops to post-launch analytics, we blend creative, engineering, and GTM
                expertise. The output is momentum: aligned roadmaps, crafted experiences, and instrumentation
                that proves impact.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              {CORE_VALUES.map((value) => (
                <motion.article
                  key={value.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_22px_45px_rgba(15,23,42,0.32)] backdrop-blur"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <h3 className="text-2xl font-semibold text-white">{value.title}</h3>
                  <p className="mt-4 text-base text-white/70 leading-relaxed">{value.description}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(15,23,42,0.32)] p-10 backdrop-blur lg:sticky lg:top-28">
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-white leading-snug">
                The team behind the launch button.
              </h3>
              <p className="text-base text-white/70 leading-relaxed">
                Designers, engineers, marketers, and analysts working as one squad. We operate with shared
                rituals, shared dashboards, and shared accountability for outcomes.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#00BDFF]">Core Stack</p>
              <div className="grid gap-3">
                {CAPABILITIES.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white"
                  >
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#00BDFF]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-dashed border-[#00BDFF]/40 bg-[#00BDFF]/10 p-6 text-sm text-[#00BDFF]">
              <p>
                “We treat every engagement like an in-house initiative—standing up systems that keep shipping,
                learning, and iteration alive long after launch.”
              </p>
              <p className="mt-4 font-semibold text-white">— Leadership Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

