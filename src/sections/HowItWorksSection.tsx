"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PROCESS_STEPS = [
  {
    title: "Discovery & Planning",
    timeline: "Step 1",
    summary: "Understanding your vision and requirements.",
    details:
      "Deep discovery sessions to understand business goals, target audience, and technical requirements.",
    deliverables: [
      "Project brief & roadmap",
      "Technical requirements",
      "Stakeholder alignment",
    ],
    icon: "🔍",
    duration: "1-2 weeks",
    stats: { meetings: "3-5", documents: "5+", stakeholders: "2-4" },
  },
  {
    title: "Design & Prototyping",
    timeline: "Step 2",
    summary: "Creating the visual and interactive experience.",
    details:
      "Wireframes, high-fidelity designs, and interactive prototypes iterated based on feedback.",
    deliverables: [
      "Wireframes & mockups",
      "Interactive prototype",
      "Design system",
    ],
    icon: "🎨",
    duration: "2-3 weeks",
    stats: { iterations: "3-5", screens: "20+", components: "15+" },
  },
  {
    title: "Development & Testing",
    timeline: "Step 3",
    summary: "Building and refining the solution.",
    details:
      "Regular sprints, weekly demos, and continuous testing with real-time updates and monitoring.",
    deliverables: [
      "Sprint demos",
      "QA reports",
      "Performance metrics",
    ],
    icon: "⚡",
    duration: "4-6 weeks",
    stats: { sprints: "4-6", demos: "Weekly", tests: "100+" },
  },
  {
    title: "Launch & Support",
    timeline: "Step 4",
    summary: "Going live and ensuring success.",
    details:
      "Deployment, training, and ongoing support with comprehensive documentation and optimization.",
    deliverables: [
      "Launch deployment",
      "Training & docs",
      "Support plan",
    ],
    icon: "🚀",
    duration: "Ongoing",
    stats: { deployments: "1+", training: "2-3 sessions", support: "24/7" },
  },
];

type ProcessStep = (typeof PROCESS_STEPS)[number];

export default function HowItWorksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROCESS_STEPS.length - 1 : prev - 1));
    setFlippedCard(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === PROCESS_STEPS.length - 1 ? 0 : prev + 1));
    setFlippedCard(null);
  };

  const handleCardClick = (index: number) => {
    if (flippedCard === index) {
      setFlippedCard(null);
    } else {
      setFlippedCard(index);
    }
  };

  const handleCardEnter = (stepIndex: number) => {
    if (stepIndex === currentIndex) {
      setFlippedCard(stepIndex);
    }
  };

  const handleCardLeave = () => {
    setFlippedCard(null);
  };

  useEffect(() => {
    const newProgress = ((currentIndex + 1) / PROCESS_STEPS.length) * 100;
    setProgress(newProgress);
  }, [currentIndex]);

  return (
    <section
      id="how-it-works"
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[rgb(20,27,56)] py-20 flex items-center"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-3xl space-y-6 mb-20">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#00bef7]">
            How It Works
          </p>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white whitespace-nowrap">
            From concept to launch.
          </h2>
        </div>

        {/* Timeline */}
        <div className="mb-16 relative">
          <div className="flex items-center justify-between max-w-4xl mx-auto px-4 relative">
            {/* Background Line Container */}
            <div className="absolute top-4 left-0 right-0 h-0.5 z-0" style={{ left: '2rem', right: '2rem' }}>
              <div className="h-full w-full bg-white/10" />
            </div>
            
            {/* Progress Line Container */}
            <div className="absolute top-4 left-0 right-0 h-0.5 z-0 overflow-hidden" style={{ left: '2rem', right: '2rem' }}>
              <motion.div 
                className="h-full bg-[#00bef7] origin-left"
                initial={{ scaleX: 1 / PROCESS_STEPS.length }}
                animate={{ 
                  scaleX: (currentIndex + 1) / PROCESS_STEPS.length
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {PROCESS_STEPS.map((step, index) => (
              <button
                key={step.title}
                onClick={() => {
                  setCurrentIndex(index);
                  setFlippedCard(null);
                }}
                className="flex flex-col items-center flex-1 relative cursor-pointer group z-[10]"
              >
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 relative z-[11] ${
                      currentIndex === index
                        ? "bg-[#00bef7] text-white shadow-lg shadow-[#00bef7]/50 scale-110"
                        : currentIndex > index
                        ? "bg-[#00bef7] text-white"
                        : "bg-white/10 text-white/60 group-hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {currentIndex > index ? "✓" : index + 1}
                  </motion.div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                      currentIndex === index ? "text-white" : "text-white/50 group-hover:text-white/70"
                    }`}
                  >
                    {step.timeline}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 hover:border-[#00bef7]/50 hover:bg-[#00bef7]/10 transition-all duration-300 group"
            aria-label="Previous step"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60 group-hover:text-[#00bef7] transition-colors"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 hover:border-[#00bef7]/50 hover:bg-[#00bef7]/10 transition-all duration-300 group"
            aria-label="Next step"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60 group-hover:text-[#00bef7] transition-colors"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Carousel Cards */}
          <div className="relative h-[480px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.article
                  className="group relative flex h-[460px] w-full max-w-[800px] md:max-w-[900px] lg:max-w-[1000px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[#00bef7]/30 perspective-[1600px] cursor-pointer"
                  onClick={() => handleCardClick(currentIndex)}
                  onMouseEnter={() => handleCardEnter(currentIndex)}
                  onMouseLeave={handleCardLeave}
                >
                  <div
                    className={`relative h-full w-full [transform-style:preserve-3d] [transition:transform_0.8s_cubic-bezier(0.22,1,0.36,1)] ${
                      flippedCard === currentIndex ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 flex h-full flex-col p-10 md:p-12 [backface-visibility:hidden]">
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-5">
                          <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-[#00bef7]/10 text-4xl md:text-5xl">
                            {PROCESS_STEPS[currentIndex].icon}
                          </div>
                          <div className="text-sm font-medium text-[#00bef7]">
                            {PROCESS_STEPS[currentIndex].timeline}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-5">
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                          {PROCESS_STEPS[currentIndex].title}
                        </h3>
                        <p className="text-base md:text-lg font-medium text-[#00bef7]/80 uppercase tracking-wider">
                          {PROCESS_STEPS[currentIndex].summary}
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-white/80 max-w-2xl">
                          {PROCESS_STEPS[currentIndex].details}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-xs text-white/40 text-center">
                          Hover or click to see deliverables
                        </p>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 flex h-full flex-col p-8 bg-gradient-to-br from-[#020617] to-[#0a1628] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
                      <div className="mb-4 flex-shrink-0">
                        <div className="text-sm font-medium text-[#00bef7] mb-2 uppercase tracking-wider">
                          {PROCESS_STEPS[currentIndex].timeline}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {PROCESS_STEPS[currentIndex].title}
                        </h3>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
                        {/* Left Column - Deliverables */}
                        <div className="flex flex-col min-h-0">
                          <div className="text-xs font-semibold text-[#00bef7]/80 mb-3 uppercase tracking-wider">
                            Deliverables
                          </div>
                          <div className="space-y-2.5 flex-1">
                            {PROCESS_STEPS[currentIndex].deliverables.map((item, idx) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                className="flex items-center gap-3 text-base text-white/85"
                              >
                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#00bef7]/20">
                                  <svg className="h-4 w-4 text-[#00bef7]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span>{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Right Column - Key Activities & Metrics */}
                        <div className="flex flex-col space-y-4 min-h-0">
                          {/* Key Activities Section */}
                          <div className="flex-shrink-0">
                            <div className="text-xs font-semibold text-[#00bef7]/80 mb-2 uppercase tracking-wider">
                              Key Activities
                            </div>
                            <div className="space-y-2">
                              {PROCESS_STEPS[currentIndex].summary && (
                                <div className="text-sm text-white/70 leading-relaxed">
                                  {PROCESS_STEPS[currentIndex].summary}
                                </div>
                              )}
                              <div className="text-sm text-white/60 leading-relaxed">
                                {PROCESS_STEPS[currentIndex].details}
                              </div>
                            </div>
                          </div>

                          {/* Stats Section */}
                          <div className="pt-3 border-t border-white/10 flex-shrink-0">
                            <div className="text-xs font-semibold text-[#00bef7]/80 mb-2 uppercase tracking-wider">
                              Process Metrics
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(PROCESS_STEPS[currentIndex].stats).map(([key, value], idx) => (
                                <motion.div
                                  key={key}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="text-center p-2 rounded-lg bg-white/5 border border-white/10"
                                >
                                  <div className="text-base font-bold text-[#00bef7] mb-0.5">
                                    {value}
                                  </div>
                                  <div className="text-xs text-white/50 uppercase tracking-wider leading-tight">
                                    {key}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {PROCESS_STEPS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setFlippedCard(null);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-10 bg-[#00bef7] shadow-[0_0_12px_rgba(0,190,247,0.5)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

