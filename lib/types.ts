export type Corner = "red" | "blue";

export interface Coach {
  id: string;
  name: string;
  role: string;
  corner: Corner;
  initials: string;
  bio: string;
  quote: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  authorId: string; // a Coach id, or the literal string "owner"
  authorName: string;
  tag: string;
  excerpt: string;
  content: string; // paragraphs separated by blank lines (\n\n)
  publishedAt: string; // ISO date, e.g. "2026-07-01"
}

export type NewsCategory = "Event" | "Notice" | "Fight Announcement";

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  excerpt: string;
  content: string;
  eventDate?: string; // ISO date, relevant for Event / Fight Announcement
  publishedAt: string;
}

export type MembershipCategory = "drop-in" | "monthly" | "fight-team";

export type RegistrationStatus = "new" | "contacted" | "enrolled";

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: MembershipCategory;
  experience?: string;
  message?: string;
  status: RegistrationStatus;
  createdAt: string; // ISO datetime
}
