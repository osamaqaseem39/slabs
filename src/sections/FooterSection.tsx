"use client";

import Image from "next/image";

const FOOTER_LINK_GROUPS = [
  {
    heading: "Work",
    links: [
      { label: "Services", href: "#services" },
      { label: "Technology", href: "#technology" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Portfolio", href: "#portfolio" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Brand Assets", href: "#" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "hello@synovolabs.com", href: "mailto:hello@synovolabs.com" },
      { label: "Calendly", href: "https://cal.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Dribbble", href: "https://dribbble.com/" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#1a2342] border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 md:py-20">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="mb-3 sm:mb-4">
              <Image
                src="/logo-w.png"
                alt="Company Logo"
                width={200}
                height={67}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Move faster, launch smarter, measure everything.
            </h3>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
              We help teams build digital experiences that convert today and scale tomorrow. Tell us where
              you're headed—we'll chart the build.
            </p>
            <a
              href="mailto:hello@synovolabs.com"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-[#00bef7] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-gray-950 transition-colors duration-300 hover:bg-[#00bef7] touch-manipulation"
            >
              hello@synovolabs.com
            </a>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.heading} className="space-y-4">
                <h4 className="text-sm uppercase tracking-[0.3em] text-white/50">{group.heading}</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="transition-colors duration-300 hover:text-[#00bef7]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col gap-3 sm:gap-4 border-t border-white/10 pt-6 sm:pt-8 text-xs sm:text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Synovo Labs. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="#" className="transition-colors duration-300 hover:text-[#00bef7]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-[#00bef7]">
              Terms of Service
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-[#00bef7]">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

