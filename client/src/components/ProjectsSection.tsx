import { useEffect, useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Expertise, Project } from "@shared/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import financeApp from "@assets/generated_images/Project_screenshot_finance_app_24e440e7.png";
import realEstate from "@assets/generated_images/Project_screenshot_real_estate_28217e6e.png";
import courseApp from "@assets/generated_images/Project_screenshot_course_app_f47228e1.png";
import creativeStudio from "@assets/generated_images/Project_screenshot_creative_studio_d9eb9c41.png";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectsSectionProps {
  projects?: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectsSection({ projects = [], onProjectClick }: ProjectsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTechfield, setSelectedTechfield] = useState<string | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch expertise for modal tabs
  const { data: expertiseList = [] } = useQuery<Expertise[]>({
    queryKey: ["/api/expertise"],
  });

  // Filter projects for modal
  const filteredProjects = selectedTechfield
    ? projects.filter((p) => p.techfield === selectedTechfield)
    : projects;

  // Show only first 3 projects on main page
  const visibleProjects = projects.slice(0, 3);

  const defaultProjects: Project[] = projects.length > 0 ? projects : [
    {
      id: "1",
      title: "Creative Studio Website",
      description: "A modern portfolio website for a creative agency showcasing their best work",
      image: creativeStudio,
      techStack: ["React", "Tailwind CSS", "Framer Motion"],
      features: ["Smooth animations", "Responsive design", "Portfolio showcase"],
      liveUrl: "#",
      githubUrl: "",
      order: 1,
      techfield: null,
    },
    {
      id: "2",
      title: "Course App",
      description: "E-learning platform with video courses and interactive content",
      image: courseApp,
      techStack: ["Next.js", "TypeScript", "PostgreSQL"],
      features: ["Video streaming", "Progress tracking", "Interactive quizzes"],
      liveUrl: "#",
      githubUrl: "",
      order: 2,
      techfield: null,
    },
    {
      id: "3",
      title: "Money Management App",
      description: "Personal finance tracking app with beautiful data visualizations",
      image: financeApp,
      techStack: ["React Native", "Chart.js", "Node.js"],
      features: ["Budget tracking", "Expense analytics", "Goal setting"],
      liveUrl: "#",
      githubUrl: "",
      order: 3,
      techfield: null,
    },
    {
      id: "4",
      title: "Real Estate App",
      description: "Property listing platform with advanced search and filtering",
      image: realEstate,
      techStack: ["Vue.js", "Express", "MongoDB"],
      features: ["Property search", "Virtual tours", "Agent dashboard"],
      liveUrl: "#",
      githubUrl: "",
      order: 4,
      techfield: null,
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="project-lines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#project-lines)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            SELECTED WORKS
          </h2>
        </div>

        <div className="space-y-6">
          {visibleProjects.map((project, index) => (
            <Card
              key={project.id}
              data-testid={`card-project-${index}`}
              onClick={() => onProjectClick(project)}
              className={`group hover-elevate cursor-pointer transition-all duration-700 delay-${index * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-6 flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-card border border-card-border">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0"
                  data-testid={`button-view-project-${index}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
          {projects.length > 3 && (
            <div className="flex justify-center mt-8">
              <Button onClick={() => setModalOpen(true)} data-testid="button-see-more-projects">
                See More Projects
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for all projects by expertise */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl w-full max-h-[80vh] p-0">
          <div className="p-6 pb-0">
            <h2 className="text-2xl font-bold mb-4">Projects by Area of Expertise</h2>
            <Tabs
              value={selectedTechfield || (expertiseList[0]?.id ?? "")}
              onValueChange={setSelectedTechfield}
              className="w-full"
            >
              <TabsList className="flex gap-2 overflow-x-auto mb-6">
                {expertiseList.map((exp) => (
                  <TabsTrigger key={exp.id} value={exp.id} className="whitespace-nowrap">
                    {exp.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollArea className="h-[50vh] pr-2">
                {expertiseList.map((exp) => (
                  <TabsContent key={exp.id} value={exp.id} className="w-full">
                    <div className="grid md:grid-cols-2 gap-6">
                      {projects.filter((p) => p.techfield === exp.id).map((project, idx) => (
                        <Card
                          key={project.id}
                          data-testid={`modal-card-project-${idx}`}
                          onClick={() => onProjectClick(project)}
                          className="group hover-elevate cursor-pointer transition-all"
                        >
                          <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-start gap-6 flex-1">
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-card border border-card-border">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl md:text-2xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {project.techStack.slice(0, 3).map((tech, techIndex) => (
                                    <Badge
                                      key={techIndex}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0"
                            >
                              <ArrowUpRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                      {projects.filter((p) => p.techfield === exp.id).length === 0 && (
                        <div className="text-center text-muted-foreground col-span-2 py-8">
                          No projects for this area yet.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
