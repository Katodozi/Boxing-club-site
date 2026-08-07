export interface Program {
  id: string;
  icon: "glove" | "target" | "kettlebell" | "fists";
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  description: string;
  longDescription: string;
  idealFor: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "fundamentals",
    icon: "glove",
    title: "Boxing Fundamentals",
    level: "Beginner",
    duration: "60 min",
    description: "Stance, footwork, guard, and the jab-cross. Where every member starts.",
    longDescription:
      "A structured 21-day program covering stance, footwork, guard position, and the jab-cross before anything else. No pad work with real power until your defense is second nature.",
    idealFor: "Complete beginners, or anyone returning to boxing after time away.",
  },
  {
    id: "technique",
    icon: "target",
    title: "Technique & Pad Work",
    level: "Intermediate",
    duration: "60 min",
    description: "Combinations, angles, and defense on the mitts.",
    longDescription:
      "For members who've passed their Basic assessment. Focused mitt work building 3- and 4-punch combinations, lateral movement, and counter-punching under a coach's direct pads.",
    idealFor: "Graduates of the Fundamentals program looking to sharpen technique.",
  },
  {
    id: "conditioning",
    icon: "kettlebell",
    title: "Strength & Conditioning",
    level: "All Levels",
    duration: "45 min",
    description: "Circuit-based training built around a fighter's engine.",
    longDescription:
      "Circuit-based conditioning built around what boxing actually demands — rotational power, short-burst output, and the ability to keep your hands up in round three. Scaled to your level.",
    idealFor: "Anyone in any program who wants to build a bigger gas tank.",
  },
  {
    id: "sparring",
    icon: "fists",
    title: "Sparring Club",
    level: "Advanced",
    duration: "90 min",
    description: "Controlled, coached rounds for cleared members.",
    longDescription:
      "Controlled, coach-supervised sparring rounds every Friday. Headgear is mandatory and pairings are matched by coaches for size and experience — this is training, not a tryout.",
    idealFor: "Amateur-level members cleared by a head coach, and Fight Team.",
  },
];
