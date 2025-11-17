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

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/bugobugs/login" component={LoginPage} />
      <Route path="/bugobugs">
        {(params) =>
          localStorage.getItem("admin_token") ? (
            <DashboardPage {...params} />
          ) : (
            <LoginPage />
          )
        }
      </Route>
      <Route path="/bugobugs/projects">
        {(params) =>
          localStorage.getItem("admin_token") ? (
            <ProjectsPage {...params} />
          ) : (
            <LoginPage />
          )
        }
      </Route>
      <Route path="/bugobugs/expertise">
        {(params) =>
          localStorage.getItem("admin_token") ? (
            <ExpertisePage {...params} />
          ) : (
            <LoginPage />
          )
        }
      </Route>
      <Route path="/bugobugs/testimonials">
        {(params) =>
          localStorage.getItem("admin_token") ? (
            <TestimonialsAdminPage {...params} />
          ) : (
            <LoginPage />
          )
        }
      </Route>
      <Route path="/bugobugs/messages">
        {(params) =>
          localStorage.getItem("admin_token") ? (
            <MessagesPage {...params} />
          ) : (
            <LoginPage />
          )
        }
      </Route>
      <Route path="/bugobugs/social">
        {(params) =>
          localStorage.getItem("admin_token") ? (
            <SocialLinksPage {...params} />
          ) : (
            <LoginPage />
          )
        }
      </Route>
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
