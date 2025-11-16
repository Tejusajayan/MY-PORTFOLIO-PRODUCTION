import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBackground from "@assets/generated_images/Hero_background_tech_pattern_5047ed95.png";

interface HeroSectionProps {
  name?: string;
  title?: string;
  bio?: string;
}

export function HeroSection({ 
  name = "TEJUS",
  title = "Tech Specialist",
  bio = "Delivering automation & full-stack solutions, IT support, with a strong focus on seamless user experiences. Showcasing diverse expertise across web development, cybersecurity, system administration, and workflow automation to help businesses operate smarter, secure and faster."
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-lines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-sm font-medium text-primary tracking-widest uppercase">My Portfolio</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block mb-2">
              HI<span className="inline-block w-8 md:w-12 h-1 bg-foreground mx-2 align-middle" />
              THERE
            </span>
            <span className="block mb-2">I'M {name}</span>
            <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              {title}
            </span>
          </h1>

          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {bio}
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleScrollToAbout}
            data-testid="button-discover"
            className="bg-primary/10 border border-primary/20 hover:bg-primary/20 backdrop-blur-sm"
          >
            Discover More
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full p-1">
          <div className="w-1.5 h-3 bg-primary/40 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
