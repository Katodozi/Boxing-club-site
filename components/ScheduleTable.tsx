import { WEEKLY_SCHEDULE, FIGHT_TEAM_NOTE, BASIC_PROGRAM_NOTE } from "@/lib/schedule";

const LEVEL_STYLES: Record<string, string> = {
  beginner: "border-corner-blue text-[#7fa3ba]",
  intermediate: "border-brass text-brass-bright",
  advanced: "border-corner-red text-[#e08279]",
  closed: "border-hairline text-bone-dim",
};

export default function ScheduleTable() {
  return (
    <div className="flex flex-col gap-10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="font-mono border-b border-brass px-4 py-3.5 text-left text-[11px] uppercase tracking-wide text-brass-bright">
                Day
              </th>
              <th className="font-mono border-b border-brass px-4 py-3.5 text-left text-[11px] uppercase tracking-wide text-brass-bright">
                Basic (4–5 PM)
              </th>
              <th className="font-mono border-b border-brass px-4 py-3.5 text-left text-[11px] uppercase tracking-wide text-brass-bright">
                Amateur / Sparring (5–6 PM)
              </th>
            </tr>
          </thead>
          <tbody>
            {WEEKLY_SCHEDULE.map((day) => {
              const [basic, second] = day.slots;
              const isClosed = basic.level === "closed";
              return (
                <tr key={day.day} className="border-b border-hairline transition-colors hover:bg-brass/5">
                  <td className="font-mono px-4 py-4 text-sm text-bone">{day.day}</td>
                  {isClosed ? (
                    <td colSpan={2} className="px-4 py-4 text-sm text-bone-dim">
                      <span className={`tag-pill ${LEVEL_STYLES.closed}`}>Gym Closed</span>{" "}
                      <span className="ml-2">{basic.note}</span>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-4 text-sm text-bone-dim">
                        <span className={`tag-pill mr-2 ${LEVEL_STYLES[basic.level]}`}>
                          {basic.level}
                        </span>
                        {basic.className}
                      </td>
                      <td className="px-4 py-4 text-sm text-bone-dim">
                        <span className={`tag-pill mr-2 ${LEVEL_STYLES[second.level]}`}>
                          {second.level}
                        </span>
                        {second.className}
                        {second.note && (
                          <span className="mt-1 block text-xs text-bone-dim/70">{second.note}</span>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="max-w-2xl text-sm text-bone-dim">{BASIC_PROGRAM_NOTE}</p>

      <div className="border border-brass/50 bg-[#241f14] p-8">
        <p className="font-mono mb-2 text-xs text-brass-bright">Flexible Access</p>
        <h3 className="font-display mb-3 text-2xl">{FIGHT_TEAM_NOTE.title}</h3>
        <p className="max-w-2xl text-sm text-bone-dim">{FIGHT_TEAM_NOTE.description}</p>
      </div>
    </div>
  );
}
