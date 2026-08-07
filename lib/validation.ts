import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  category: z.enum(["drop-in", "monthly", "fight-team"]),
  experience: z.string().trim().max(2000).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const blogSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  authorId: z.string().trim().min(1, "Please choose an author."),
  authorName: z.string().trim().min(1),
  tag: z.string().trim().min(1, "Tag is required."),
  excerpt: z.string().trim().min(3, "Excerpt is required."),
  content: z.string().trim().min(10, "Content is required."),
  publishedAt: z.string().trim().min(1, "Publish date is required."),
  slug: z.string().trim().optional(),
});

export const newsSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  category: z.enum(["Event", "Notice", "Fight Announcement"]),
  excerpt: z.string().trim().min(3, "Excerpt is required."),
  content: z.string().trim().min(10, "Content is required."),
  eventDate: z.string().trim().optional().or(z.literal("")),
  publishedAt: z.string().trim().min(1, "Publish date is required."),
  slug: z.string().trim().optional(),
});

export const coachSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  role: z.string().trim().min(2, "Role is required."),
  corner: z.enum(["red", "blue"]),
  initials: z.string().trim().min(1).max(3),
  bio: z.string().trim().min(10, "Bio is required."),
  quote: z.string().trim().min(3, "Quote is required."),
});
