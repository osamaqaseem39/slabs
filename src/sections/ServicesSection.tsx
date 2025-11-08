"use client";

import type { ReactNode } from "react";

type ServicesSectionProps = {
  id?: string;
};

type Service = {
  title: string;
  description: string;
  deliverables: string[];
  icon: ReactNode;
};

const primaryServices: Service[] = [
  {
    title: "WordPress Engineering",
    description:
      "Custom theme and plugin development focused on performance, accessibility, and easy content authoring.",
    deliverables: [
      "Modern headless and traditional builds",
      "Core Web Vitals optimization",
      "Content migrations and launch support",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4.5 6.75h15" />
        <path d="M4.5 12h9" />
        <path d="M4.5 17.25h6" />
        <path d="M14.25 14.25L19.5 19.5" />
        <circle cx="17.25" cy="12" r="2.25" />
      </svg>
    ),
  },
  {
    title: "Search Engine Optimization",
    description:
      "Technical and content SEO programs that drive qualified traffic and measurable growth.",
    deliverables: [
      "Comprehensive audits and roadmaps",
      "Content strategy and on-page optimization",
      "Analytics, reporting, and iterative improvements",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
        <path d="m16.5 16.5 3 3" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
  {
    title: "Paid & Organic Social",
    description:
      "Campaigns that connect with the right audience through targeted creative and data-backed insights.",
    deliverables: [
      "Performance creative and messaging playbooks",
      "Channel management and experimentation",
      "Unified campaign reporting",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M7.5 7.5h9a2.25 2.25 0 0 1 2.25 2.25v2.25A2.25 2.25 0 0 1 16.5 14.25h-4.5L7.5 18v-3.75H6A2.25 2.25 0 0 1 3.75 12V9.75A2.25 2.25 0 0 1 6 7.5h1.5Z" />
        <path d="M15 7.5V6A2.25 2.25 0 0 1 17.25 3.75h.75A2.25 2.25 0 0 1 20.25 6v6" />
      </svg>
    ),
  },
  {
    title: "Digital Experience Design",
    description:
      "Human-centered design systems that translate brand vision into high-converting digital experiences.",
    deliverables: [
      "UX research and customer journeys",
      "UI systems and interactive prototypes",
      "Design-to-dev collaboration and QA",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M5.25 5.25h7.5v7.5h-7.5z" />
        <path d="m12.75 11.25 6-6" />
        <path d="M15 9.75h3.75V13.5" />
        <path d="M11.25 12.75 17.25 18.75" />
        <path d="M5.25 18.75h7.5v-4.5h-7.5z" />
      </svg>
    ),
  },
];

const secondaryServices: Service[] = [
  {
    title: "Marketing Automation",
    description:
      "Lifecycle programs that nurture leads with behavior-based messaging and intelligent routing.",
    deliverables: [
      "Journey mapping and segmentation",
      "Platform integrations and workflows",
      "Ongoing optimization and A/B testing",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M7.5 3.75v4.5" />
        <path d="M16.5 3.75v4.5" />
        <path d="M4.5 9.75h15" />
        <path d="M6 9.75v6a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 15.75v-6" />
        <path d="M9.75 14.25h4.5" />
      </svg>
    ),
  },
  {
    title: "Data & Analytics",
    description:
      "Unified measurement foundations that unlock faster decision making and attribution clarity.",
    deliverables: [
      "Tracking plans and instrumentation",
      "Dashboarding and reporting systems",
      "Experiment design and analytics QA",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M5.25 18.75v-6" />
        <path d="M10.5 18.75v-9" />
        <path d="M15.75 18.75v-12" />
        <path d="M21 5.25H3" />
      </svg>
    ),
  },
  {
    title: "Product Strategy",
    description:
      "Roadmaps grounded in user insights, revenue goals, and technical feasibility to guide roadmaps.",
    deliverables: [
      "Vision setting and opportunity sizing",
      "Prioritization frameworks",
      "Pilot launches and validation",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M7.5 16.5 12 6.75l4.5 9.75" />
        <path d="M8.25 15h7.5" />
        <path d="M12 3.75v2.25" />
        <path d="M12 17.25v3" />
      </svg>
    ),
  },
  {
    title: "Content Operations",
    description:
      "Editorial systems that align creators, reviewers, and automation for consistent, scalable output.",
    deliverables: [
      "Governance models and playbooks",
      "Publishing workflows and tooling",
      "Training programs and documentation",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M6.75 4.5h10.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5Z" />
        <path d="M15 3.75V6" />
        <path d="M9 3.75V6" />
        <path d="M6.75 9h10.5" />
        <path d="M9.75 12.75h4.5" />
        <path d="M9.75 15.75h3" />
      </svg>
    ),
  },
];

export default function ServicesSection({ id = "services" }: ServicesSectionProps) {
  const services = [...primaryServices, ...secondaryServices];

  return (
    <section
      id={id}
      className="relative min-h-[100vh] bg-gray-950 py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-[#00BDFF] mb-6">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            End-to-end digital execution from strategy through launch.
          </h2>
          <p className="text-lg md:text-xl text-white/70">
            We embed with your team to ship faster, polish the details, and ensure
            every touchpoint supports your growth goals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-10 hover:border-[#00BDFF]/60 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-px rounded-[22px] bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] text-[#00BDFF] ring-1 ring-inset ring-white/10">
                    {service.icon}
                  </span>
                  <h3 className="text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-base text-white/70 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 text-sm text-white/60">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#00BDFF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


