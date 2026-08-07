export interface DaySchedule {
  day: string;
  slots: {
    time: string;
    className: string;
    level: "beginner" | "intermediate" | "advanced" | "closed";
    note?: string;
  }[];
}

/**
 * Sunday through Friday, two classes a day:
 *  - Basic (21-Day Fundamentals): 4:00–5:00 PM, every day
 *  - Amateur (post-assessment): 5:00–6:00 PM, Sun–Thu
 *  - Friday's second slot is Sparring instead of a regular Amateur class
 * Saturday is the club's weekly rest day (no group classes).
 * Fight Team / Professional training is intentionally NOT a fixed slot —
 * see FIGHT_TEAM_NOTE below, rendered as its own card on the Schedule page.
 */
export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: "Sunday",
    slots: [
      { time: "4:00 – 5:00 PM", className: "Basic (Fundamentals)", level: "beginner" },
      { time: "5:00 – 6:00 PM", className: "Amateur", level: "intermediate" },
    ],
  },
  {
    day: "Monday",
    slots: [
      { time: "4:00 – 5:00 PM", className: "Basic (Fundamentals)", level: "beginner" },
      { time: "5:00 – 6:00 PM", className: "Amateur", level: "intermediate" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { time: "4:00 – 5:00 PM", className: "Basic (Fundamentals)", level: "beginner" },
      { time: "5:00 – 6:00 PM", className: "Amateur", level: "intermediate" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { time: "4:00 – 5:00 PM", className: "Basic (Fundamentals)", level: "beginner" },
      { time: "5:00 – 6:00 PM", className: "Amateur", level: "intermediate" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { time: "4:00 – 5:00 PM", className: "Basic (Fundamentals)", level: "beginner" },
      { time: "5:00 – 6:00 PM", className: "Amateur", level: "intermediate" },
    ],
  },
  {
    day: "Friday",
    slots: [
      { time: "4:00 – 5:00 PM", className: "Basic (Fundamentals)", level: "beginner" },
      {
        time: "5:00 – 6:00 PM",
        className: "Sparring Session",
        level: "advanced",
        note: "Coach-supervised, headgear mandatory. Amateur & Fight Team only.",
      },
    ],
  },
  {
    day: "Saturday",
    slots: [{ time: "—", className: "Gym Closed", level: "closed", note: "Weekly rest day." }],
  },
];

export const FIGHT_TEAM_NOTE = {
  title: "Fight Team / Professional",
  description:
    "Fight Team members don't follow a fixed class slot. Training times are custom and coordinated directly with your assigned coach — including early mornings, split sessions, and fight-camp scheduling around a confirmed bout.",
};

export const BASIC_PROGRAM_NOTE =
  "Basic is a 21-day program. After your 21st day, your coach will assess you for a move up to Amateur.";
