"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Technology = {
  name: string;
  modelType: "cube" | "pyramid" | "torus";
  description: string;
  stack: string[];
  features: string[];
  useCases: string[];
};

const technologies: Technology[] = [
  {
    name: "Frontend",
    modelType: "cube",
    description: "Modern frontend technologies for building responsive, interactive user interfaces that deliver exceptional user experiences.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "WebGL"],
    features: [
      "Server-side rendering (SSR)",
      "Static site generation (SSG)",
      "Component-based architecture",
      "Responsive design systems",
      "Advanced animations",
      "Performance optimization",
    ],
    useCases: [
      "E-commerce platforms",
      "SaaS applications",
      "Marketing websites",
      "Progressive web apps",
      "Interactive dashboards",
      "Real-time applications",
    ],
  },
  {
    name: "Backend",
    modelType: "pyramid",
    description: "Robust backend solutions for scalable applications and seamless API integrations with enterprise-grade security.",
    stack: ["Node.js", "Express", "GraphQL", "REST APIs", "Serverless", "PostgreSQL", "MongoDB", "Redis"],
    features: [
      "RESTful & GraphQL APIs",
      "Microservices architecture",
      "Real-time communication",
      "Database optimization",
      "Authentication & authorization",
      "Caching strategies",
    ],
    useCases: [
      "API development",
      "Microservices",
      "Real-time systems",
      "Data processing",
      "Authentication services",
      "Third-party integrations",
    ],
  },
  {
    name: "DevOps",
    modelType: "torus",
    description: "Streamlined deployment pipelines and infrastructure management for reliable, scalable operations.",
    stack: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions", "Terraform", "Monitoring", "Security"],
    features: [
      "Automated deployments",
      "Container orchestration",
      "Infrastructure as code",
      "Continuous integration",
      "Performance monitoring",
      "Security scanning",
    ],
    useCases: [
      "Cloud infrastructure",
      "CI/CD pipelines",
      "Container management",
      "Monitoring & logging",
      "Security compliance",
      "Scalable deployments",
    ],
  },
  {
    name: "UI/UX",
    modelType: "cube",
    description: "Creating intuitive, beautiful interfaces that users love. We combine user research, design thinking, and modern aesthetics.",
    stack: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems", "Accessibility", "Usability Testing"],
    features: [
      "User interface design",
      "User experience research",
      "Interactive prototypes",
      "Design systems",
      "Brand identity",
      "Accessibility compliance",
    ],
    useCases: [
      "Web applications",
      "Mobile apps",
      "Design systems",
      "Brand identity",
      "User research",
      "Prototyping",
    ],
  },
  {
    name: "Digital Marketing",
    modelType: "pyramid",
    description: "Strategic digital marketing solutions that drive growth, engagement, and measurable results across all channels.",
    stack: ["SEO", "SEM", "Social Media", "Content Marketing", "Email Marketing", "Analytics", "PPC", "Conversion Optimization"],
    features: [
      "Search engine optimization",
      "Pay-per-click advertising",
      "Social media management",
      "Content strategy",
      "Email campaigns",
      "Analytics & reporting",
    ],
    useCases: [
      "Brand awareness",
      "Lead generation",
      "E-commerce growth",
      "Content marketing",
      "Social media campaigns",
      "SEO optimization",
    ],
  },
];

function TechnologyGalleryCarousel({ technologies }: { technologies: Technology[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const cooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = technologies;
  const slideWidth = 100; // Percentage width of each slide (full width)
  const gap = 0; // No gap between slides since they're full width

  // Initialize offset on mount
  useEffect(() => {
    // For 3-slide layout, offset starts at 0
    setOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    // Clear any existing timeout/interval
    if (autoAdvanceIntervalRef.current) {
      clearTimeout(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }

    // Don't auto-advance if dragging or in cooldown
    if (isDragging || isCooldown) {
      return;
    }

    // Auto-advance to next slide after 3 seconds
    autoAdvanceIntervalRef.current = setTimeout(() => {
      if (!isDragging && !isCooldown) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1 >= slides.length ? 0 : prevIndex + 1;
          // Trigger cooldown
          setIsCooldown(true);
          if (cooldownTimeoutRef.current) {
            clearTimeout(cooldownTimeoutRef.current);
          }
          cooldownTimeoutRef.current = setTimeout(() => {
            setIsCooldown(false);
          }, 3000);
          setOffset(0);
          return nextIndex;
        });
      }
    }, 3000);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (autoAdvanceIntervalRef.current) {
        clearTimeout(autoAdvanceIntervalRef.current);
        autoAdvanceIntervalRef.current = null;
      }
    };
  }, [currentIndex, isDragging, isCooldown, slides.length]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
      if (autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current);
      }
    };
  }, []);

  // Navigate to specific slide with infinite loop
  const goToSlide = (index: number, smooth = true) => {
    // Wrap around for infinite loop
    let newIndex = index;
    if (index < 0) {
      newIndex = slides.length - 1; // Wrap to last slide
    } else if (index >= slides.length) {
      newIndex = 0; // Wrap to first slide
    }
    setCurrentIndex(newIndex);
    // Reset offset to 0 for new position
    setOffset(0);
    
    // Start cooldown after swipe
    setIsCooldown(true);
    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
    }
    cooldownTimeoutRef.current = setTimeout(() => {
      setIsCooldown(false);
    }, 3000); // 3 second cooldown
  };

  // Next/Previous navigation with infinite loop
  const goToNext = () => goToSlide(currentIndex + 1);
  const goToPrev = () => goToSlide(currentIndex - 1);

  // Handle drag start
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
    setVelocity(0);
    // Pause auto-advance when dragging
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
    }
  };

  // Handle drag move
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    const xDelta = clientX - lastXRef.current;
    
    if (timeDelta > 0) {
      setVelocity(xDelta / timeDelta);
    }
    
    setCurrentX(clientX);
    lastXRef.current = clientX;
    lastTimeRef.current = now;
    
    const deltaX = clientX - startX;
    const sensitivity = 0.3;
    const dragOffset = (deltaX / window.innerWidth) * 100 * sensitivity;
    // For 3-slide layout, offset is just the drag offset (no base offset needed)
    setOffset(dragOffset);
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Don't allow drag navigation during cooldown
    if (isCooldown) {
      setVelocity(0);
      return;
    }
    
    const deltaX = currentX - startX;
    const threshold = 50; // Minimum drag distance
    
    // Use velocity to determine swipe direction if drag is small
    if (Math.abs(deltaX) < threshold && Math.abs(velocity) > 0.5) {
      if (velocity > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      // Snap back to current slide (no cooldown for snap back)
      setCurrentIndex(currentIndex);
      setOffset(0);
    }
    
    setVelocity(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    handleMouseUp(); // Handle drag end if dragging
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isDragging) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  // Calculate 3D transform for each slide
  const getSlideTransform = (slideIndex: number) => {
    // Calculate relative position to current index
    let relativeIndex = slideIndex - currentIndex;
    
    // Handle wrap-around for infinite loop
    // If we're at the last slide, the first slide should be the "next" slide (relativeIndex = 1)
    // If we're at the first slide, the last slide should be the "previous" slide (relativeIndex = -1)
    if (relativeIndex > slides.length / 2) {
      relativeIndex = relativeIndex - slides.length;
    } else if (relativeIndex < -slides.length / 2) {
      relativeIndex = relativeIndex + slides.length;
    }
    
    // Determine if this is previous, current, or next slide (with wrap-around)
    const isPrevious = relativeIndex === -1;
    const isCurrent = relativeIndex === 0;
    const isNext = relativeIndex === 1;
    const isVisible = isPrevious || isCurrent || isNext;
    
    // Hide slides that are not previous, current, or next
    if (!isVisible) {
      return {
        left: '50%',
        transform: `translateY(-50%) translateZ(-500px)`,
        opacity: 0,
        filter: 'none',
        pointerEvents: 'none' as const,
      };
    }
    
    // Apply drag offset for smooth dragging
    // Offset is already in percentage terms from drag calculation
    const dragOffsetPercent = offset;
    
    // Calculate positions for 3-slide layout
    // Slide width is 75%, so half width is 37.5%
    // Current slide: centered at 50% (left edge at 12.5%, right edge at 87.5%)
    // Previous slide: right half visible (right edge at 12.5%, so left edge at -62.5%)
    // Next slide: left half visible (left edge at 87.5%, so right edge at 162.5%)
    let baseLeftPosition = 12.5; // Default: current slide centered
    let rotationY = 0;
    let scale = 1;
    let translateZ = 0;
    let opacity = 1;
    
    if (isCurrent) {
      // Current slide: fully visible, centered
      baseLeftPosition = 12.5; // 50% - 37.5% (half of 75% width)
      rotationY = 0;
      scale = 1;
      translateZ = 0;
      opacity = 1;
    } else if (isPrevious) {
      // Previous slide: half visible on left, tilted left
      // Right edge should be at 12.5% (where current starts), so left edge at -62.5%
      baseLeftPosition = -62.5; // Position so right half is visible
      rotationY = -25; // Tilt left
      scale = 0.9;
      translateZ = -200;
      opacity = 0.4; // Semi-transparent
    } else if (isNext) {
      // Next slide: half visible on right, tilted right
      // Left edge should be at 87.5% (where current ends), so left edge at 87.5%
      baseLeftPosition = 87.5; // Position so left half is visible
      rotationY = 25; // Tilt right
      scale = 0.9;
      translateZ = -200;
      opacity = 0.4; // Semi-transparent
    }
    
    // Apply drag offset to all visible slides for smooth dragging
    const leftPosition = baseLeftPosition + dragOffsetPercent;
    
    return {
      left: `${leftPosition}%`,
      transform: `translateY(-50%) translateZ(${translateZ}px) rotateY(${rotationY}deg) scale(${scale})`,
      opacity: opacity,
      filter: 'none',
      pointerEvents: isCurrent ? 'auto' as const : 'none' as const,
    };
  };


  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] overflow-visible"
      style={{ 
        perspective: '1500px',
        perspectiveOrigin: 'center center',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Gallery Container */}
      <div
        ref={carouselRef}
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Render all slides */}
        {slides.map((tech, slideIndex) => {
          const slideTransform = getSlideTransform(slideIndex);
          const isActive = slideIndex === currentIndex;
          
          return (
            <div
              key={tech.name}
              className="absolute top-1/2"
              style={{
                width: '75%',
                maxWidth: '1280px',
                left: slideTransform.left || '50%',
                transform: slideTransform.transform,
                opacity: slideTransform.opacity,
                filter: slideTransform.filter,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: (slideTransform.pointerEvents !== undefined) ? slideTransform.pointerEvents : (isActive ? 'auto' : 'none'),
                willChange: 'transform, opacity, filter',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                transformOrigin: 'center center',
              }}
            >
              {/* White Slide Card */}
              <div
                className="w-full"
                style={{
                  transformOrigin: 'center center',
                  imageRendering: 'crisp-edges',
                }}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 cursor-grab active:cursor-grabbing w-full"
                  style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                  }}
                >
                  {/* Technology Name */}
                  <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                    {tech.name}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-center text-gray-600 mb-6 text-base md:text-lg max-w-3xl mx-auto">
                    {tech.description}
                  </p>

                  {/* Three Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Technology Stack */}
                    <div className="flex flex-col">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-3 font-semibold">
                        Technology Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tech.stack.map((item, itemIndex) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 text-xs rounded-full border border-gray-300 bg-gray-50 text-gray-900 font-medium hover:bg-gray-100 hover:border-gray-400 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="flex flex-col">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-3 font-semibold">
                        Key Features
                      </p>
                      <ul className="space-y-2">
                        {tech.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-gray-800 leading-relaxed"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00bef7] flex-shrink-0 mt-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases */}
                    <div className="flex flex-col">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-3 font-semibold">
                        Use Cases
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tech.useCases.map((useCase) => (
                          <span
                            key={useCase}
                            className="px-3 py-1.5 text-xs rounded-lg border border-gray-300 bg-gray-50 text-gray-900 font-medium hover:bg-gray-100 hover:border-gray-400 transition-colors"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const carouselEl = carouselRef.current;

    const elements = [eyebrowEl, headingEl, carouselEl].filter(Boolean);

    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 40 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });

    if (eyebrowEl) {
      timeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.5 });
    }
    if (headingEl) {
      timeline.to(headingEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");
    }
    if (carouselEl) {
      timeline.to(carouselEl, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");
    }

    timelineRef.current = timeline;

    const playTimeline = () => {
      if (hasAnimatedRef.current || !timelineRef.current) return;
      hasAnimatedRef.current = true;
      timelineRef.current.play();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          playTimeline();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#141b38] py-12 flex items-center overflow-x-hidden overflow-y-hidden"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-4 md:mb-6">
          <p
            ref={eyebrowRef}
            className="text-base uppercase tracking-[0.4em] text-[#00bef7] mb-2"
          >
            Technologies
          </p>
          <h2
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-2"
          >
            Our stack
          </h2>
        </div>

        {/* 3D Gallery Carousel - Full Width */}
        <div 
          ref={carouselRef}
          className="w-full mx-auto"
        >
          <TechnologyGalleryCarousel technologies={technologies} />
        </div>
      </div>
    </section>
  );
}
