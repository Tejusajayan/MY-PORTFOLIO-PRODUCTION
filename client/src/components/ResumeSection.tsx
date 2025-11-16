import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import resumePdf from "@assets/RESUME - TEJUS.pdf";

interface ResumeSectionProps {
  resumePdf?: string;
}

export function ResumeSection({ resumePdf: resumePdfProp }: ResumeSectionProps) {
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
    <section id="resume" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Resume</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            MY EXPERIENCE
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div 
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold">Resume</h3>
                  <p className="text-sm text-muted-foreground">Download my full resume</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="font-semibold mb-2">Key Highlights</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Expertise in Automation(n8n),React, TypeScript, Node.js, PostgreSQL, and network/security tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Successfully built and deployed full-stack web applications, automation systems, and internal company tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Strong foundation in networking, cloud, cybersecurity basics, and Microsoft 365 administration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Proven ability to manage IT infrastructure, troubleshoot complex issues, and streamline business workflows through automation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Experience supporting teams across multiple regions (India, Dubai, Africa) with reliable and scalable IT solutions</span>
                    </li>
                  </ul>
                </div>
              </div>

              {(
                <Button
                  size="lg"
                  asChild
                  data-testid="button-download-resume"
                >
                  <a
                    href={resumePdfProp || resumePdf}
                    download="RESUME - TEJUS.pdf"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              )}
            </Card>
          </div>

          <div 
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <Card className="p-8 h-full">
              <h3 className="text-xl font-display font-bold mb-6">Experience</h3>
              
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-primary/20 pb-6 last:pb-0">
                  <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="mb-2">
                    <h4 className="font-semibold">IT Support</h4>
                    <p className="text-sm text-muted-foreground">Fastcfs Cargo Services • 2025 - Present</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ensuring secure and optimized IT environments, implementing best practices for reliability and performance.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
