import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultTestimonials: Testimonial[] = testimonials.length > 0 ? testimonials : [
    {
      id: "1",
      name: "Maria Rios",
      title: "CEO",
      company: "TechCorp Inc",
      content: "Sanches is patient, responsive and helpful. I highly recommend and would be happy to use your service again, an efficient experience.",
      avatar: "",
      order: 1,
    },
    {
      id: "2",
      name: "John Anderson",
      title: "Product Manager",
      company: "StartupHub",
      content: "Working with Sanches was an absolute pleasure. The attention to detail and creative approach exceeded our expectations. Highly professional!",
      avatar: "",
      order: 2,
    },
    {
      id: "3",
      name: "Sarah Chen",
      title: "Design Director",
      company: "Creative Studio",
      content: "Outstanding work! The design process was smooth and collaborative. Sanches truly understands how to bring ideas to life with exceptional quality.",
      avatar: "",
      order: 3,
    },
  ];

  // --- Continuous scroll logic ---
  const shouldScroll = defaultTestimonials.length > 3;
  // Duplicate testimonials for seamless loop
  const scrollingTestimonials = shouldScroll
    ? [...defaultTestimonials, ...defaultTestimonials]
    : defaultTestimonials;

  // Ref for measuring total width
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate animation duration based on content width for smoothness
  const [duration, setDuration] = useState(40); // default duration

  useEffect(() => {
    if (shouldScroll && scrollRef.current) {
      // The width of one set of testimonials
      const container = scrollRef.current;
      const cards = Array.from(container.children) as HTMLElement[];
      let totalWidth = 0;
      for (let i = 0; i < cards.length / 2; i++) {
        totalWidth += cards[i].offsetWidth + 32; // 32px = gap-8
      }
      // Set duration proportional to width (adjust speed as needed)
      setDuration(Math.max(20, totalWidth / 40));
    }
  }, [shouldScroll, testimonials.length]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 md:py-32 relative overflow-x-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-white">
            CLIENT FEEDBACK
          </h2>
        </div>

        {shouldScroll ? (
          <div
            className="relative w-full overflow-x-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
          >
            <div
              ref={scrollRef}
              className="flex gap-8 animate-testimonials-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]"
              style={{
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {scrollingTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id + "-" + index}
                  data-testid={`card-testimonial-${index}`}
                  className="p-8 min-w-[320px] max-w-xs hover-elevate transition-all"
                >
                  <Quote className="h-10 w-10 text-primary/40 mb-6" />
                  <p className="text-base leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold" data-testid={`text-client-name-${index}`}>
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {defaultTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                data-testid={`card-testimonial-${index}`}
                className={`p-8 hover-elevate transition-all duration-700 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <Quote className="h-10 w-10 text-primary/40 mb-6" />
                <p className="text-base leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold" data-testid={`text-client-name-${index}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      {/* Add the animation keyframes in a style tag */}
      <style>{`
        @keyframes testimonials-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-testimonials-marquee {
          animation-name: testimonials-marquee;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
