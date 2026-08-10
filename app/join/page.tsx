"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import PageBanner from "@/components/PageBanner";
import { useJoinModal } from "@/components/JoinModalProvider";
import { PRICING_TIERS } from "@/lib/pricing";

const FAQS = [
  {
    q: "Do I need experience to start?",
    a: "No. Every member — regardless of fitness background — starts in the 21-day Basic program.",
  },
  {
    q: "What should I bring to my first class?",
    a: "Just workout clothes and water. We provide loaner gloves and wraps for trial classes.",
  },
  {
    q: "Can I cancel my membership anytime?",
    a: "Yes, Drop-In and Monthly have no contract. Fight Team is reviewed with your coach directly.",
  },
];

export default function JoinPage() {
  const { openModal } = useJoinModal();

  return (
    <div className="pt-28">
      <PageBanner round="05" tone="red" imageSrc="/banners/joins.jpg"/>
      <div className="pb-28 pt-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <RevealOnScroll className="mb-16 max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Round 05 — Join</p>
          <h1 className="font-display mb-6 text-5xl leading-tight sm:text-6xl">
            Pick your membership.
          </h1>
          <p className="text-lg text-bone-dim">
            No contracts on Drop-In or Monthly. Cancel anytime at the front desk.
          </p>
        </RevealOnScroll>

        <div className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <RevealOnScroll
              key={tier.category}
              delay={i * 0.1}
              className={`relative flex flex-col border p-9 transition-transform duration-300 hover:-translate-y-1.5 ${
                tier.featured ? "border-brass bg-[#241f14]" : "border-hairline bg-canvas-alt"
              }`}
            >
              {tier.featured && (
                <span className="font-mono absolute -top-px right-6 bg-brass px-3 py-1.5 text-[10px] uppercase tracking-wide text-canvas">
                  Most Popular
                </span>
              )}
              <p className="font-mono mb-3 text-xs text-brass-bright">{tier.name}</p>
              <div className="font-display mb-1 text-4xl">
                {tier.price}
                <span className="font-mono ml-1.5 text-xs normal-case tracking-normal text-bone-dim">
                  {tier.period}
                </span>
              </div>
              <p className="mb-6 border-b border-hairline pb-6 text-sm text-bone-dim">
                {tier.description}
              </p>
              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-bone-dim">
                    <span className="text-brass-bright">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openModal(tier.category)}
                className={tier.featured ? "btn-primary" : "btn-ghost"}
              >
                {tier.ctaLabel}
              </button>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mb-24 grid grid-cols-1 items-center gap-10 border border-hairline bg-gradient-to-br from-corner-red-dim to-canvas-alt p-10 sm:p-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display mb-4 text-4xl leading-tight sm:text-5xl">
              Your first round is free.
            </h2>
            <p className="max-w-md text-bone-dim">
              Show up to any Fundamentals class this week, no gear or experience required.
              We&apos;ll lend you gloves and wraps — you bring the willingness to get corrected.
            </p>
            <button onClick={() => openModal("drop-in")} className="btn-primary mt-8">
              Book Your Free Class
            </button>
          </div>
          <div className="font-mono flex flex-col gap-5 text-sm text-bone-dim">
            <div>
              <strong className="mb-1 block text-[11px] uppercase tracking-wide text-bone">
                Address
              </strong>
              Thamel Marg, Kathmandu 44600, Nepal
            </div>
            <div>
              <strong className="mb-1 block text-[11px] uppercase tracking-wide text-bone">
                Hours
              </strong>
              Sun–Fri, 4:00 PM – 7:00 PM · Sat Closed
            </div>
            <div>
              <strong className="mb-1 block text-[11px] uppercase tracking-wide text-bone">
                Phone
              </strong>
              +977 1-455-0192
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Questions</p>
          <div className="flex flex-col gap-px bg-hairline">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-canvas-alt p-6">
                <p className="mb-2 text-base text-bone">{faq.q}</p>
                <p className="text-sm text-bone-dim">{faq.a}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
      </div>
    </div>
  );
}