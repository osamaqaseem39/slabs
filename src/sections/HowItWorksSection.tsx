"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PROCESS_STEPS = [
  {
    title: "Discovery Pulse",
    summary: "Align on context, metrics, and stakeholders.",
    details:
      "We run a working session to surface business goals, technical constraints, audience insights, and critical paths. Expect a tangible brief—not a bloated deck.",
    deliverables: [
      "Stakeholder scorecard",
      "North-star metrics map",
      "Opportunity brief",
    ],
  },
  {
    title: "Experience Blueprint",
    summary: "Translate outcomes into journeys, UI systems, and data contracts.",
    details:
      "Design and engineering pair to produce clickable prototypes, component specs, analytics schemas, and launch criteria in a single source of truth.",
    deliverables: [
      "Fidelity prototype",
      "Design token spec",
      "Analytics contract",
    ],
  },
  {
    title: "Integrated Delivery",
    summary: "Ship, test, and learn with shared rituals.",
    details:
      "Weekly demos, async updates, and instrumented releases keep everyone looped in. We own QA and observability so performance stays above baseline.",
    deliverables: [
      "Sprint demo recordings",
      "QA + perf dashboards",
      "Experiment matrix",
    ],
  },
  {
    title: "Growth Stewardship",
    summary: "Enable your team to iterate without us.",
    details:
      "Handoff includes playbooks, dashboards, and training sessions. When you need backup, we plug in for optimization cycles or new initiative spikes.",
    deliverables: [
      "Enablement playbook",
      "Team ops checklist",
      "Post-launch roadmap",
    ],
  },
];

const GROUP_SIZE = 2;
type ProcessStep = (typeof PROCESS_STEPS)[number];
type ProcessStepGroup = ProcessStep[];

const createStepGroups = (): ProcessStepGroup[] => {
  const groups: ProcessStepGroup[] = [];

  for (let index = 0; index < PROCESS_STEPS.length; index += GROUP_SIZE) {
    groups.push(PROCESS_STEPS.slice(index, index + GROUP_SIZE));
  }

  return groups;
};

const INITIAL_STEP_GROUPS = createStepGroups();

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [stepGroups, setStepGroups] = useState<ProcessStepGroup[]>(INITIAL_STEP_GROUPS);
  const [visibleGroupCount, setVisibleGroupCount] = useState(INITIAL_STEP_GROUPS.length);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    const groups = createStepGroups();
    setStepGroups(groups);
    setVisibleGroupCount(groups.length);
  }, []);

  useEffect(() => {
    const activeGroup = Math.floor(activeStep / GROUP_SIZE);
    setVisibleGroupCount((prev) => Math.max(prev, activeGroup + 1));
  }, [activeStep]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!topEntry) {
          return;
        }

        const groupIndex = stepRefs.current.findIndex(
          (group) => group === topEntry.target
        );

        if (groupIndex === -1) {
          return;
        }

        const firstStepIndex = groupIndex * GROUP_SIZE;

        if (firstStepIndex !== activeStepRef.current) {
          activeStepRef.current = firstStepIndex;
          setActiveStep(firstStepIndex);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    stepRefs.current.forEach((group) => {
      if (group) {
        observer.observe(group);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleCardEnter = (stepIndex: number) => {
    setHoveredStep(stepIndex);
  };

  const handleCardLeave = () => {
    setHoveredStep(null);
  };

  stepRefs.current.length = stepGroups.length;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-gray-950/95 py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-3xl space-y-6">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-[#00BDFF]">
            How It Works
          </p>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            A high-velocity process engineered for clarity and momentum.
          </h2>
          <p className="text-lg leading-relaxed text-white/70 md:text-xl">
            We collapse strategy, design, engineering, and analytics into one workflow. The result: fewer
            handoffs, faster learning, and teams that stay aligned from kickoff to iteration.
          </p>
        </div>

        <div className="mt-16 space-y-16 md:space-y-20">
          <AnimatePresence initial={false} mode="popLayout">
            {stepGroups.map((group, groupIndex) => {
              if (groupIndex >= visibleGroupCount) {
                return null;
              }

            const groupRefIndex = groupIndex;

            return (
              <motion.div
                key={group.map((item) => item.title).join("-")}
                ref={(el) => {
                  stepRefs.current[groupRefIndex] = el;
                }}
                className="grid gap-8 lg:grid-cols-2"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -48 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: groupIndex * 0.1 }}
              >
                {group.map((step, stepOffset) => {
                  const stepIndex = groupIndex * GROUP_SIZE + stepOffset;
                  const isGroupActive =
                    Math.floor(stepIndex / GROUP_SIZE) === Math.floor(activeStep / GROUP_SIZE);
                  const isHovered = hoveredStep === stepIndex;

                  return (
                    <motion.article
                      key={step.title}
                      className={`group relative flex min-h-[320px] flex-col overflow-visible rounded-[30px] border transition-all duration-500 ${
                        isGroupActive
                          ? "border-[#00BDFF]/60 bg-white/[0.05] shadow-[0_24px_58px_rgba(16,64,198,0.28)] backdrop-blur"
                          : "border-white/12 bg-white/[0.02] shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-sm opacity-85 hover:opacity-100 hover:border-[#00BDFF]/35"
                      } scroll-mt-36 perspective-[1600px]`}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{
                        opacity: isGroupActive ? 1 : 0.6,
                        y: 0,
                      }}
                      exit={{ opacity: 0, y: -32 }}
                      whileHover={{ scale: isGroupActive ? 1.02 : 1.04 }}
                      data-active={isGroupActive}
                      data-flipped={isHovered}
                      onMouseEnter={() => handleCardEnter(stepIndex)}
                      onMouseLeave={handleCardLeave}
                      onFocus={() => handleCardEnter(stepIndex)}
                      onBlur={handleCardLeave}
                    >
                      <div className="relative h-full w-full [transform-style:preserve-3d] [transition:transform_0.9s_cubic-bezier(0.22,1,0.36,1)] group-data-[flipped=true]:[transform:rotateY(180deg)]">
                        <div className="absolute inset-0 flex h-full flex-col gap-5 rounded-[30px] bg-transparent p-6 md:p-8 [backface-visibility:hidden]">
                          <div className="flex items-center justify-between">
                            <span
                              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-base font-semibold tracking-[0.08em] transition-colors duration-500 ${
                                isGroupActive
                                  ? "border-[#00BDFF] bg-[#00BDFF]/20 text-[#00BDFF]"
                                  : "border-white/20 bg-white/[0.05] text-white/60 group-hover:border-[#00BDFF]/50 group-hover:text-[#00BDFF]"
                              }`}
                            >
                              {`0${stepIndex + 1}`}
                            </span>
                            <motion.span
                              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                                isGroupActive ? "bg-[#00BDFF]" : "bg-white/30 group-hover:bg-[#00BDFF]/70"
                              }`}
                              layout
                            />
                          </div>

                          <div className="flex flex-1 flex-col justify-between gap-5">
                            <div className="space-y-3">
                              <h3 className="text-lg font-semibold text-white md:text-xl">
                                {step.title}
                              </h3>
                              <p
                                className={`text-xs uppercase tracking-[0.38em] transition-colors duration-500 md:text-sm ${
                                  isGroupActive
                                    ? "text-[#00BDFF]/80"
                                    : "text-white/45 group-hover:text-white/65"
                                }`}
                              >
                                {step.summary}
                              </p>
                              <p
                                className={`text-sm leading-relaxed transition-colors duration-500 ${
                                  isGroupActive
                                    ? "text-white/80"
                                    : "text-white/60 group-hover:text-white/75"
                                }`}
                              >
                                {step.details}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.4em]">
                              <span
                                className={`inline-flex h-1 w-8 rounded-full transition-colors duration-500 ${
                                  isGroupActive ? "bg-[#00BDFF]" : "bg-white/30 group-hover:bg-[#00BDFF]/60"
                                }`}
                              />
                              <span className="text-white/50">Step {stepIndex + 1}</span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 flex h-full flex-col gap-5 rounded-[30px] bg-[#020617] p-6 text-left text-white [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-8">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs uppercase tracking-[0.42em] text-[#00BDFF]/80">
                                Behind the scenes
                              </span>
                              <span className="text-sm text-white/40">Step {stepIndex + 1}</span>
                            </div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-white/75">{step.details}</p>
                          </div>
                          <div className="mt-auto space-y-3 text-xs text-white/60">
                            <p className="uppercase tracking-[0.35em] text-[#00BDFF]/70">
                              Deliverables
                            </p>
                            <ul className="space-y-2">
                              {step.deliverables.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[32px]"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isGroupActive ? 0.25 : 0,
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(0,189,255,0.25), transparent 65%)",
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.article>
                  );
                })}
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

