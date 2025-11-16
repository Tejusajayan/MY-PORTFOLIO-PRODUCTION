import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { FolderKanban, Award, MessageSquare, Mail } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import type { Project, Expertise, Testimonial, Contact } from "@shared/schema";
import { useLocation } from "wouter";

export default function DashboardPage() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: expertise = [] } = useQuery<Expertise[]>({
    queryKey: ["/api/expertise"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const unreadMessages = contacts.filter(c => !c.read).length;

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Expertise Areas",
      value: expertise.length,
      icon: Award,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Testimonials",
      value: testimonials.length,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Unread Messages",
      value: unreadMessages,
      icon: Mail,
      color: "from-orange-500 to-red-500",
    },
  ];

  const [, setLocation] = useLocation();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    setLocation("/admin/login");
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold" data-testid="text-page-title">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Overview of your portfolio content
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-destructive text-white hover:bg-destructive/80 transition"
            data-testid="button-logout"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6" data-testid={`card-stat-${index}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} opacity-20 flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-display font-bold" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm font-medium truncate">{project.title}</span>
                  <span className="text-xs text-muted-foreground">{project.techStack.length} techs</span>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-muted-foreground">No projects yet</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
            <div className="space-y-3">
              {contacts.slice(0, 5).map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{contact.subject}</p>
                  </div>
                  {!contact.read && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-sm text-muted-foreground">No messages yet</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
