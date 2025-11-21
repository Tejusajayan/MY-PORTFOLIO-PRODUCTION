import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProjectsPage from "@/pages/admin/ProjectsPage";
import ExpertisePage from "@/pages/admin/ExpertisePage";
import TestimonialsAdminPage from "@/pages/admin/TestimonialsAdminPage";
import MessagesPage from "@/pages/admin/MessagesPage";
import SocialLinksPage from "@/pages/admin/SocialLinksPage";
import LoginPage from "@/pages/admin/LoginPage";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

function useAuthGuard() {
  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function check() {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setValid(false);
        setChecked(true);
        return;
      }
      try {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setValid(true);
        } else {
          // Clear invalid token
          localStorage.removeItem("admin_token");
          setValid(false);
        }
      } catch {
        // Clear token on network/auth errors
        localStorage.removeItem("admin_token");
        setValid(false);
      }
      setChecked(true);
    }
    check();
  }, []);

  return { checked, valid };
}

function Router() {
  function ProtectedRoute(Component: React.ComponentType<any>) {
    return (params: any) => {
      const { checked, valid } = useAuthGuard();
      if (!checked) return null;
      return valid ? <Component {...params} /> : <LoginPage />;
    };
  }

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/bugobugs/login" component={LoginPage} />
      <Route path="/bugobugs" component={ProtectedRoute(DashboardPage)} />
      <Route path="/bugobugs/projects" component={ProtectedRoute(ProjectsPage)} />
      <Route path="/bugobugs/expertise" component={ProtectedRoute(ExpertisePage)} />
      <Route path="/bugobugs/testimonials" component={ProtectedRoute(TestimonialsAdminPage)} />
      <Route path="/bugobugs/messages" component={ProtectedRoute(MessagesPage)} />
      <Route path="/bugobugs/social" component={ProtectedRoute(SocialLinksPage)} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
