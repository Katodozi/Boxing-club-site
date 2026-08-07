import RevealOnScroll from "@/components/RevealOnScroll";
import ScheduleTable from "@/components/ScheduleTable";

export const metadata = { title: "Schedule — Iron Bell Boxing Club" };

export default function SchedulePage() {
  return (
    <div className="pt-40 pb-28">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <RevealOnScroll className="mb-16 max-w-2xl">
          <p className="font-mono mb-4 text-xs text-brass-bright">Round 04 — Schedule</p>
          <h1 className="font-display mb-6 text-5xl leading-tight sm:text-6xl">
            This week&apos;s card.
          </h1>
          <p className="text-lg text-bone-dim">
            Classes run Sunday through Friday — two a day, back to back. Saturday is the club&apos;s
            weekly rest day. Drop in with a day pass, or lock in a weekly rhythm with membership.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <ScheduleTable />
        </RevealOnScroll>
      </div>
    </div>
  );
}
