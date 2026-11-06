/**
 * South African National Senior Certificate (NSC) APS & Distinction Calculator
 * Used by Grade 10–12 learners for University Admission (UCT, Wits, UP, Stellenbosch, etc.)
 */

export interface SubjectMark {
  subjectName: string;
  percentage: number;
  isLifeOrientation?: boolean;
}

export interface APSResult {
  totalAps: number;
  qualificationLevel: 'Bachelor Degree Pass' | 'Diploma Pass' | 'Higher Certificate Pass' | 'Did Not Qualify';
  distinctionsCount: number; // 80%+ marks
  breakdown: {
    subjectName: string;
    percentage: number;
    level: number;
    apsPoints: number;
  }[];
  universityEligibilitySummary: string;
}

export function percentageToLevel(percentage: number): number {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
}

export function calculateAPS(marks: SubjectMark[]): APSResult {
  let totalAps = 0;
  let distinctionsCount = 0;
  let subjectsAbove50Count = 0;

  const breakdown = marks.map((m) => {
    const level = percentageToLevel(m.percentage);
    if (m.percentage >= 80) distinctionsCount++;
    if (m.percentage >= 50) subjectsAbove50Count++;

    // In most SA universities, Life Orientation earns max 2-4 points or is excluded from primary 6-subject APS
    const apsPoints = m.isLifeOrientation ? Math.min(level, 4) : level;
    totalAps += apsPoints;

    return {
      subjectName: m.subjectName,
      percentage: m.percentage,
      level,
      apsPoints,
    };
  });

  // CAPS minimum pass requirements:
  // Bachelor: At least 50% (Level 4) in 4 designated subjects + 40% in Home Language + 30% in 2 subjects
  let qualificationLevel: APSResult['qualificationLevel'] = 'Bachelor Degree Pass';
  if (subjectsAbove50Count >= 4 && totalAps >= 28) {
    qualificationLevel = 'Bachelor Degree Pass';
  } else if (totalAps >= 22) {
    qualificationLevel = 'Diploma Pass';
  } else if (totalAps >= 18) {
    qualificationLevel = 'Higher Certificate Pass';
  } else {
    qualificationLevel = 'Did Not Qualify';
  }

  let universityEligibilitySummary = '';
  if (totalAps >= 38) {
    universityEligibilitySummary = 'Competitive for Engineering, Medicine (MBChB), Actuarial Science, and Law at UCT, Wits, and Stellenbosch.';
  } else if (totalAps >= 32) {
    universityEligibilitySummary = 'Eligible for Computer Science, BCom Accounting, Health Sciences, and Humanities at major South African universities.';
  } else if (totalAps >= 28) {
    universityEligibilitySummary = 'Meets minimum Bachelor Degree admission for BEd, BA Arts, BAdmin, and Information Systems.';
  } else {
    universityEligibilitySummary = 'Targeting higher marks will unlock Bachelor Degree qualification and bursary opportunities (e.g. NSFAS / Funza Lushaka).';
  }

  return {
    totalAps,
    qualificationLevel,
    distinctionsCount,
    breakdown,
    universityEligibilitySummary,
  };
}
