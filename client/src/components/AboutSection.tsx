import { useEffect, useRef, useState } from "react";
import workspaceImage from "@assets/generated_images/About_me_workspace_photo_4bdd2349.png";

interface AboutSectionProps {
  name?: string;
  bio?: string;
  location?: string;
}

export function AboutSection({ 
  name = "Tejus",
  bio = "Driven by curiosity and a strong passion for problem-solving, I work across web development, IT solutions, and workflow automation. I enjoy creating smooth, efficient digital experiences — whether it’s building a full-stack application, optimizing systems, or automating everyday processes. Through this portfolio, I share my work, my process, and the skills that shape my journey as a growing tech professional.",
  location = "Dubai, UAE"
}: AboutSectionProps) {
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

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div 
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="mb-8">
              <span className="text-sm font-medium text-primary tracking-widest uppercase">About Me</span>
              <h2 className="text-white text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-white leading-tight">
                DISCOVER THE<br />
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  PROFESSIONAL
                </span ><br />
                JOURNEY OF A<br />
                TECH DEVELOPER.
              </h2>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {bio}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Based in</span>
                <p className="font-medium text-white">{location}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <span className="text-muted-foreground">Experience</span>
                <p className="font-medium text-white">4+ Years Of Learning Experience</p>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-25 group-hover:opacity-40 blur transition-opacity" />
              <img
                src={workspaceImage}
                alt="Professional workspace"
                className="relative w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
