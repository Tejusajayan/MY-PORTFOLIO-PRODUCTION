import {
  type User,
  type InsertUser,
  type Project,
  type InsertProject,
  type Expertise,
  type InsertExpertise,
  type Testimonial,
  type InsertTestimonial,
  type Contact,
  type InsertContact,
  type UpdateContact,
  type SocialLink,
  type InsertSocialLink,
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { db } from "./db"; // <-- FIXED: import from server/db
import { users, contacts, testimonials, projects, expertise, socialLinks } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getAllExpertise(): Promise<Expertise[]>;
  getExpertise(id: string): Promise<Expertise | undefined>;
  createExpertise(expertise: InsertExpertise): Promise<Expertise>;
  updateExpertise(id: string, expertise: Partial<InsertExpertise>): Promise<Expertise | undefined>;
  deleteExpertise(id: string): Promise<boolean>;

  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  getAllContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, updates: UpdateContact): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;

  getAllSocialLinks(): Promise<SocialLink[]>;
  getSocialLink(id: string): Promise<SocialLink | undefined>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: string, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: string): Promise<boolean>;

  
  adminExists(): Promise<boolean>;
  authenticate(username: string, password: string): Promise<User | undefined>;
  registerAdmin(user: InsertUser): Promise<User>;
}

export class DbStorage implements IStorage {
  // --- USERS (already implemented) ---
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hash = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, password: hash, id: randomUUID() })
      .returning();
    return user;
  }

  async adminExists(): Promise<boolean> {
    const result = await db.select().from(users).limit(1);
    return result.length > 0;
  }

  async authenticate(username: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByUsername(username);
    if (!user) return undefined;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return undefined;
    return user;
  }

  async registerAdmin(user: InsertUser): Promise<User> {
    return this.createUser(user);
  }

  // --- PROJECTS ---
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.order);
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db
      .insert(projects)
      .values({
        ...project,
        id: randomUUID(),
        techStack: Array.isArray(project.techStack) ? project.techStack : [],
        features: Array.isArray(project.features) ? project.features : [],
        order: project.order ?? 0,
        techfield: project.techfield, // new field
      })
      .returning();
    return created;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const updateData: any = { ...project };
    if (updateData.techStack && !Array.isArray(updateData.techStack)) {
      updateData.techStack = [];
    }
    if (updateData.features && !Array.isArray(updateData.features)) {
      updateData.features = [];
    }
    // techfield can be updated as well
    const [updated] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  // --- EXPERTISE ---
  async getAllExpertise(): Promise<Expertise[]> {
    return await db.select().from(expertise).orderBy(expertise.order);
  }
  async getExpertise(id: string): Promise<Expertise | undefined> {
    const result = await db.select().from(expertise).where(eq(expertise.id, id));
    return result[0];
  }
  async createExpertise(data: InsertExpertise): Promise<Expertise> {
    const [created] = await db
      .insert(expertise)
      .values({
        ...data,
        id: randomUUID(),
        skills: Array.isArray(data.skills) ? data.skills : [],
        order: data.order ?? 0,
      })
      .returning();
    return created;
  }
  async updateExpertise(id: string, updates: Partial<InsertExpertise>): Promise<Expertise | undefined> {
    const updateData: any = { ...updates };
    if (updateData.skills && !Array.isArray(updateData.skills)) {
      updateData.skills = [];
    }
    const [updated] = await db
      .update(expertise)
      .set(updateData)
      .where(eq(expertise.id, id))
      .returning();
    return updated;
  }
  async deleteExpertise(id: string): Promise<boolean> {
    const result = await db.delete(expertise).where(eq(expertise.id, id)).returning();
    return result.length > 0;
  }

  // --- TESTIMONIALS ---
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(testimonials.order);
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return result[0];
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db
      .insert(testimonials)
      .values({
        ...testimonial,
        id: randomUUID(),
        order: testimonial.order ?? 0,
      })
      .returning();
    return created;
  }

  async updateTestimonial(id: string, updates: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set(updates)
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    return result.length > 0;
  }

  // --- CONTACTS ---
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async getContact(id: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id));
    return result[0];
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [created] = await db
      .insert(contacts)
      .values({
        ...contact,
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        read: false,
      })
      .returning();
    return created;
  }

  async updateContact(id: string, updates: UpdateContact): Promise<Contact | undefined> {
    const [updated] = await db
      .update(contacts)
      .set(updates)
      .where(eq(contacts.id, id))
      .returning();
    return updated;
  }

  async deleteContact(id: string): Promise<boolean> {
    const result = await db.delete(contacts).where(eq(contacts.id, id)).returning();
    return result.length > 0;
  }

  // --- SOCIAL LINKS ---
  async getAllSocialLinks(): Promise<SocialLink[]> {
    return await db.select().from(socialLinks).orderBy(socialLinks.order);
  }
  async getSocialLink(id: string): Promise<SocialLink | undefined> {
    const result = await db.select().from(socialLinks).where(eq(socialLinks.id, id));
    return result[0];
  }
  async createSocialLink(link: InsertSocialLink): Promise<SocialLink> {
    const [created] = await db
      .insert(socialLinks)
      .values({ ...link, id: randomUUID(), order: link.order ?? 0 })
      .returning();
    return created;
  }
  async updateSocialLink(id: string, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const [updated] = await db
      .update(socialLinks)
      .set(link)
      .where(eq(socialLinks.id, id))
      .returning();
    return updated;
  }
  async deleteSocialLink(id: string): Promise<boolean> {
    const result = await db.delete(socialLinks).where(eq(socialLinks.id, id)).returning();
    return result.length > 0;
  }

  // --- ABOUT ---
  
}

export const storage = new DbStorage();
