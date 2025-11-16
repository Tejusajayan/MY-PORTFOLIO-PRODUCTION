import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import {
  insertProjectSchema,
  insertExpertiseSchema,
  insertTestimonialSchema,
  insertContactSchema,
  updateContactSchema,
  insertSocialLinkSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid project data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const data = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, data);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid project data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const success = await storage.deleteProject(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  app.get("/api/expertise", async (_req, res) => {
    try {
      const expertise = await storage.getAllExpertise();
      res.json(expertise);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch expertise" });
    }
  });

  app.get("/api/expertise/:id", async (req, res) => {
    try {
      const expertise = await storage.getExpertise(req.params.id);
      if (!expertise) {
        return res.status(404).json({ error: "Expertise not found" });
      }
      res.json(expertise);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch expertise" });
    }
  });

  app.post("/api/expertise", async (req, res) => {
    try {
      const data = insertExpertiseSchema.parse(req.body);
      const expertise = await storage.createExpertise(data);
      res.status(201).json(expertise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid expertise data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create expertise" });
    }
  });

  app.patch("/api/expertise/:id", async (req, res) => {
    try {
      const data = insertExpertiseSchema.partial().parse(req.body);
      const expertise = await storage.updateExpertise(req.params.id, data);
      if (!expertise) {
        return res.status(404).json({ error: "Expertise not found" });
      }
      res.json(expertise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid expertise data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update expertise" });
    }
  });

  app.delete("/api/expertise/:id", async (req, res) => {
    try {
      const success = await storage.deleteExpertise(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Expertise not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete expertise" });
    }
  });

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.getTestimonial(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonial" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const data = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(data);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid testimonial data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  app.patch("/api/testimonials/:id", async (req, res) => {
    try {
      const data = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, data);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid testimonial data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const success = await storage.deleteTestimonial(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(data);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create contact" });
    }
  });

  // PATCH /api/contacts/:id/read for marking as read
  app.patch("/api/contacts/:id/read", async (req, res) => {
    try {
      const contact = await storage.updateContact(req.params.id, { read: true });
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact" });
    }
  });

  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      const success = await storage.deleteContact(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  app.get("/api/social-links", async (_req, res) => {
    try {
      const links = await storage.getAllSocialLinks();
      res.json(links);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch social links" });
    }
  });

  app.get("/api/social-links/:id", async (req, res) => {
    try {
      const link = await storage.getSocialLink(req.params.id);
      if (!link) {
        return res.status(404).json({ error: "Social link not found" });
      }
      res.json(link);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch social link" });
    }
  });

  app.post("/api/social-links", async (req, res) => {
    try {
      const data = insertSocialLinkSchema.parse(req.body);
      const link = await storage.createSocialLink(data);
      res.status(201).json(link);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid social link data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create social link" });
    }
  });

  app.patch("/api/social-links/:id", async (req, res) => {
    try {
      const data = insertSocialLinkSchema.partial().parse(req.body);
      const link = await storage.updateSocialLink(req.params.id, data);
      if (!link) {
        return res.status(404).json({ error: "Social link not found" });
      }
      res.json(link);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid social link data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update social link" });
    }
  });

  app.delete("/api/social-links/:id", async (req, res) => {
    try {
      const success = await storage.deleteSocialLink(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Social link not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete social link" });
    }
  });

  app.get("/api/admin-exists", async (_req, res) => {
    const exists = await storage.adminExists();
    res.json(exists);
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.authenticate(username, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Set a simple token (for demo, use JWT in production)
    res.json({ token: "admin_token" });
  });

  app.post("/api/register", async (req, res) => {
    console.log("[/api/register] body:", req.body);
    const exists = await storage.adminExists();
    console.log("[/api/register] adminExists:", exists);
    if (exists) {
      return res.status(403).json({ error: "Admin already exists" });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const user = await storage.registerAdmin({ username, password });
    console.log("[/api/register] created user:", user);
    if (!user.id) {
      console.error("[/api/register] No user.id after registration!", user);
      return res.status(500).json({ error: "Failed to create user" });
    }
    res.status(201).json({ id: user.id, username: user.username });
  });

  // Add this route if you want to support server-side logout (optional)
  app.post("/api/logout", (_req, res) => {
    // For stateless JWT/localStorage, nothing to do here.
    // For session-based auth, destroy the session here.
    res.status(204).send();
  });

  app.get("/api/projects/by-techfield/:techfield", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      const filtered = projects.filter(p => p.techfield === req.params.techfield);
      res.json(filtered);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects by techfield" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
