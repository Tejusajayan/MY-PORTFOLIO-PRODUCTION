import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Projects
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  techStack: text("tech_stack").array().notNull(),
  features: text("features").array().notNull(),
  liveUrl: text("live_url").notNull().default(""),
  githubUrl: text("github_url").notNull().default(""),
  order: integer("order").notNull().default(0),
  techfield: varchar("techfield").references(() => expertise.id), // FK to expertise.id
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true }).extend({
  liveUrl: z.string().default(""),
  githubUrl: z.string().default(""),
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Expertise/Skills
export const expertise = pgTable("expertise", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  skills: text("skills").array().notNull(),
  order: integer("order").notNull().default(0),
});

export const insertExpertiseSchema = createInsertSchema(expertise).omit({ id: true });
export type InsertExpertise = z.infer<typeof insertExpertiseSchema>;
export type Expertise = typeof expertise.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  avatar: text("avatar").notNull().default(""),
  order: integer("order").notNull().default(0),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true }).extend({
  avatar: z.string().default(""),
});
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, read: true, createdAt: true });
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export const updateContactSchema = z.object({
  read: z.boolean().optional(),
});
export type UpdateContact = z.infer<typeof updateContactSchema>;

// Social links
export const socialLinks = pgTable("social_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull().default(0),
});

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({ id: true });
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;



// Admin user
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
