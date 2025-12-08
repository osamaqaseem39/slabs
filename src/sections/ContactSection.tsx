"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CONTACT_POINTS = [
  {
    label: "Start a project",
    description: "Share your goals and we'll create a launch-ready plan.",
    action: "hello@synovolabs.com",
    href: "mailto:hello@synovolabs.com",
  },
  {
    label: "Book a workshop",
    description: "Align your team in a focused session.",
    action: "Pick a time",
    href: "https://cal.com/",
  },
  {
    label: "Join the team",
    description: "We're always looking for talented builders.",
    action: "View openings",
    href: "#",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const titleEl = titleRef.current;
    const descriptionEl = descriptionRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));
    const formEl = formRef.current;

    const timeline = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        paused: true,
      })
      .fromTo(
        eyebrowEl,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo(
        titleEl,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.65 },
        "-=0.3"
      )
      .fromTo(
        descriptionEl,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.65 },
        "-=0.3"
      )
      .fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.25"
      )
      .fromTo(
        formEl,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeline.play();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      timeline.kill();
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission logic (e.g., API call, email service)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
      
      // Show success message (you can add a toast notification here)
      alert("Thank you for your message! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#00bdff] py-20 flex items-center"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-[#00bef7]" ref={eyebrowRef}>
                Contact
              </p>
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Let's build something great together.
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed" ref={descriptionRef}>
                Share your vision and we'll deliver the plan to make it happen.
              </p>
            </div>

            <div className="grid gap-6">
              {CONTACT_POINTS.map((point, index) => (
                <div
                  key={point.label}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white p-8 shadow-[0_22px_45px_rgba(15,23,42,0.28)] transition duration-500 hover:border-[#00bef7]/70 hover:bg-white/90"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{point.label}</h3>
                    <a
                      href={point.href}
                      target={point.href.startsWith("http") ? "_blank" : undefined}
                      rel={point.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-full bg-[#00bef7]/10 px-4 py-2 text-sm font-medium text-[#00bef7] transition-colors duration-300 group-hover:bg-[#00bef7]/20"
                    >
                      {point.action}
                    </a>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-white/10 bg-white p-10 shadow-[0_24px_60px_rgba(15,23,42,0.32)] backdrop-blur"
          >
            <div className="grid gap-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#00bef7] focus:outline-none focus:ring-2 focus:ring-[#00bef7]/40"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#00bef7] focus:outline-none focus:ring-2 focus:ring-[#00bef7]/40"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#00bef7] focus:outline-none focus:ring-2 focus:ring-[#00bef7]/40"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  required
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#00bef7] focus:outline-none focus:ring-2 focus:ring-[#00bef7]/40 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#00bef7] px-6 py-3 text-base font-semibold text-gray-950 transition-colors duration-300 hover:bg-[#00bef7] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              <p className="text-xs text-gray-500">
                We'll never share your information.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

