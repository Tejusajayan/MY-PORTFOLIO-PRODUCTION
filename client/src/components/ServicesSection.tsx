import { useEffect, useRef, useState } from "react";
import { Cpu, Cloud, FileCode, Bot, Code, Palette, Rocket, Zap, GlobeLock, AppWindow } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Expertise } from "@shared/schema";

interface ServicesSectionProps {
  expertise?: Expertise[];
}

export function ServicesSection({ expertise = [] }: ServicesSectionProps) {
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

  const defaultExpertise = expertise.length > 0 ? expertise : [
    {
      id: "1",
      title: "Design",
      description: "Design services are focused on transforming the essence of your brand into a visually appealing and intuitive experience.",
      icon: "palette",
      skills: ["UI/UX Design", "Prototyping", "User Research", "Design Systems"],
      order: 1,
    },
    {
      id: "2",
      title: "Development",
      description: "Design services transform your brand into a visually appealing and intuitive experience that resonates with your audience.",
      icon: "code",
      skills: ["React/Next.js", "TypeScript", "Responsive Design", "Performance Optimization"],
      order: 2,
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "palette":
        return Palette;
      case "code":
        return Code;
      case "rocket":
        return Rocket;
      case "zap":
        return Zap;
      case "globe-lock":
        return GlobeLock;
      case "app-window":
        return AppWindow;
      case "bot":
        return Bot;
      case "file-code":
        return FileCode;
      case "cloud":
        return Cloud;
      case "cpu":
        return Cpu;
      default:
        return Code;
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 relative overflow-x-hidden bg-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">What I Do</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-white">
            SERVICES
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 w-full">
          {defaultExpertise.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <Card
                key={item.id}
                data-testid={`card-service-${index}`}
                className={`w-full p-4 md:p-8 hover-elevate transition-all duration-700 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-display font-bold">{item.title}</h3>
                      
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
