import { MembershipCategory } from "./types";

export interface PricingTier {
  category: MembershipCategory;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    category: "drop-in",
    name: "Drop-In",
    price: "NPR 500",
    period: "/ class",
    description: "For visitors and the curious. No commitment.",
    features: ["Access to any single class", "Glove & wrap rental included", "Valid for 1 visit"],
    ctaLabel: "Choose Drop-In",
  },
  {
    category: "monthly",
    name: "Monthly",
    price: "NPR 4,500",
    period: "/ month",
    description: "The standard membership. Train as often as you want.",
    features: [
      "Unlimited Basic & Amateur classes",
      "Locker & storage access",
      "1 guest pass / month",
      "10% off private coaching",
    ],
    featured: true,
    ctaLabel: "Choose Monthly",
  },
  {
    category: "fight-team",
    name: "Fight Team",
    price: "NPR 7,000",
    period: "/ month",
    description: "Invite-only, after a coach assessment.",
    features: [
      "Everything in Monthly",
      "Friday Sparring Session access",
      "Custom, flexible training hours",
      "Competition prep & corner support",
    ],
    ctaLabel: "Request Assessment",
  },
];
