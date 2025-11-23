import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectModal } from "@/components/ProjectModal";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { ResumeSection } from "@/components/ResumeSection";
import { Footer } from "@/components/Footer";
import type { Project, Expertise, Testimonial, About, SocialLink, Contact } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: about } = useQuery<About>({
    queryKey: ["/api/about"],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: expertise } = useQuery<Expertise[]>({
    queryKey: ["/api/expertise"],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: socialLinks } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { toast } = useToast();

  async function handleContactSubmit(data: Omit<Contact, "id" | "createdAt" | "read">) {
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast({ title: "Thank You For Contacting Me Will Be In Touch Soon!!" });
      } else {
        toast({ title: "Failed to send message", variant: "destructive" });
      }
    } catch {
      toast({ title: "Failed to send message", variant: "destructive" });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation socialLinks={socialLinks} email={about?.email} />
      
      <main>
        <HeroSection 
          name={about?.name}
          title={about?.title}
          bio={about?.bio}
        />
        
        <AboutSection 
          name={about?.name}
          bio={about?.bio}
          location={about?.location}
        />
        
        <ServicesSection expertise={expertise} />
        
        <ProjectsSection 
          projects={projects}
          onProjectClick={setSelectedProject}
        />
        
        <TestimonialsSection testimonials={testimonials} />
        
        <ResumeSection resumePdf={about?.resumePdf} />
        
        <ContactSection 
          email={about?.email}
          location={about?.location}
          onSubmit={handleContactSubmit}
        />
      </main>

      <Footer socialLinks={socialLinks} />

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
