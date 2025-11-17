import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import type { SocialLink } from "@shared/schema";

interface FooterProps {
  socialLinks?: SocialLink[];
}

export function Footer({ socialLinks = [] }: FooterProps) {
  const defaultSocialLinks = socialLinks.length > 0 ? socialLinks : [
    { id: "1", platform: "GitHub", url: "#", icon: "github", order: 1 },
    { id: "2", platform: "LinkedIn", url: "#", icon: "linkedin", order: 2 },
    { id: "3", platform: "Twitter", url: "#", icon: "twitter", order: 3 },
    { id: "4", platform: "Instagram", url: "#", icon: "instagram", order: 4 },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return Github;
      case "linkedin":
        return Linkedin;
      case "twitter":
        return Twitter;
      case "instagram":
        return Instagram;
      default:
        return Github;
    }
  };

  return (
    <footer className="border-t border-border py-12 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {defaultSocialLinks.map((link) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-${link.platform.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
