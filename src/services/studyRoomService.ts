import {
  OnlineStudent,
  StudyCheer,
  StudyRoomMessage,
  FocusTimerPreset,
  StudyRoomSessionStats,
} from '../types/studyRoom';
import { LearnerProfile } from '../types/curriculum';

const STATS_KEY = 'distinction_za_study_room_stats';
const ACTIVE_GOAL_KEY = 'distinction_za_study_room_goal';

export const FOCUS_PRESETS: FocusTimerPreset[] = [
  {
    id: 'pomodoro_25',
    name: 'Standard Pomodoro',
    focusMinutes: 25,
    breakMinutes: 5,
    description: '25 min deep CAPS study + 5 min water/stretch break',
    iconName: 'Timer',
  },
  {
    id: 'matric_sprint_45',
    name: 'Matric Exam Sprint',
    focusMinutes: 45,
    breakMinutes: 10,
    description: '45 min past paper question sprint + 10 min break',
    iconName: 'Zap',
  },
  {
    id: 'quick_drill_15',
    name: 'Speed Diagnostic Drill',
    focusMinutes: 15,
    breakMinutes: 3,
    description: '15 min focused practice quiz or formula review',
    iconName: 'Flame',
  },
  {
    id: 'deep_immersion_50',
    name: 'Deep CAPS Immersion',
    focusMinutes: 50,
    breakMinutes: 10,
    description: '50 min uninterrupted study on complex procedures',
    iconName: 'Compass',
  },
];

// Authentic South African student profiles by grade band
const SA_PEER_TEMPLATES: Record<
  number,
  Array<{
    name: string;
    school: string;
    province: string;
    subjectId: string;
    subjectName: string;
    status: OnlineStudent['status'];
    statusMessage: string;
    currentGoal: string;
    streakDays: number;
    avatarColor: string;
  }>
> = {
  12: [
    {
      name: 'Sipho Khumalo',
      school: 'Pretoria Boys High',
      province: 'Gauteng',
      subjectId: 'fet_core_maths',
      subjectName: 'Mathematics',
      status: 'solving_paper',
      statusMessage: 'Grinding 2024 Nov Paper 1 Calculus questions 📐',
      currentGoal: 'Score 100% on Question 8 & 9 Cubic Functions',
      streakDays: 21,
      avatarColor: 'bg-emerald-600',
    },
    {
      name: 'Zanele Mthembu',
      school: 'Durban Girls’ College',
      province: 'KwaZulu-Natal',
      subjectId: 'fet_phys_sci',
      subjectName: 'Physical Sciences',
      status: 'deep_focus',
      statusMessage: 'Newton’s 2nd Law on inclined planes with friction ⚡',
      currentGoal: 'Derive tension formula for connected bodies',
      streakDays: 18,
      avatarColor: 'bg-purple-600',
    },
    {
      name: 'Keanu Van Der Merwe',
      school: 'Paul Roos Gimnasium',
      province: 'Western Cape',
      subjectId: 'fet_accounting',
      subjectName: 'Accounting',
      status: 'deep_focus',
      statusMessage: 'Cash Flow Statements & Financial Indicators 📊',
      currentGoal: 'Reconcile Debtors Ledger with trial balance',
      streakDays: 14,
      avatarColor: 'bg-blue-600',
    },
    {
      name: 'Lesedi Moloi',
      school: 'St Stithians College',
      province: 'Gauteng',
      subjectId: 'fet_life_sci',
      subjectName: 'Life Sciences',
      status: 'reading_notes',
      statusMessage: 'DNA Replication & Meiosis crossing-over diagrams 🧬',
      currentGoal: 'Memorize endocrine gland hormone triggers',
      streakDays: 9,
      avatarColor: 'bg-rose-600',
    },
    {
      name: 'Lungile Dlamini',
      school: 'Westville Boys’ High',
      province: 'KwaZulu-Natal',
      subjectId: 'fet_core_maths',
      subjectName: 'Mathematics',
      status: 'practicing_quiz',
      statusMessage: 'Trigonometry general solutions & identities ✍️',
      currentGoal: 'Solve 6 double-angle past paper problems',
      streakDays: 12,
      avatarColor: 'bg-teal-600',
    },
    {
      name: 'Anika Pretorius',
      school: 'Afrikaanse Hoër Meisieskool',
      province: 'Gauteng',
      subjectId: 'fet_phys_sci',
      subjectName: 'Physical Sciences',
      status: 'solving_paper',
      statusMessage: 'Work, Energy & Power conservation laws 🚀',
      currentGoal: 'Complete Question 5 from 2023 DBE Exemplar',
      streakDays: 25,
      avatarColor: 'bg-amber-600',
    },
    {
      name: 'Farai Moyo',
      school: 'Grey College',
      province: 'Free State',
      subjectId: 'fet_core_maths',
      subjectName: 'Mathematics',
      status: 'deep_focus',
      statusMessage: 'Financial Maths: Annuities, sinking funds & balance 💰',
      currentGoal: 'Master deferred payments without losing marks',
      streakDays: 16,
      avatarColor: 'bg-indigo-600',
    },
    {
      name: 'Nandi Sithole',
      school: 'Rondebosch Boys’ / Herschel',
      province: 'Western Cape',
      subjectId: 'fet_life_sci',
      subjectName: 'Life Sciences',
      status: 'short_break',
      statusMessage: 'Stretching & grabbing rooibos tea ☕',
      currentGoal: 'Reflex arc diagram labeling completed!',
      streakDays: 30,
      avatarColor: 'bg-cyan-600',
    },
  ],
  11: [
    {
      name: 'Thabo Mokoena',
      school: 'Glenwood High',
      province: 'KwaZulu-Natal',
      subjectId: 'fet_core_maths',
      subjectName: 'Mathematics',
      status: 'deep_focus',
      statusMessage: 'Quadratic inequalities and number lines 📈',
      currentGoal: 'Solve 10 algebraic equations without mistakes',
      streakDays: 11,
      avatarColor: 'bg-emerald-600',
    },
    {
      name: 'Carla De Villiers',
      school: 'Bloemhof Hoër Meisieskool',
      province: 'Western Cape',
      subjectId: 'fet_phys_sci',
      subjectName: 'Physical Sciences',
      status: 'reading_notes',
      statusMessage: 'Intermolecular forces and hydrogen bonding 💧',
      currentGoal: 'Prepare Term 3 Chemistry summary',
      streakDays: 15,
      avatarColor: 'bg-violet-600',
    },
    {
      name: 'Kagiso Radebe',
      school: 'Jeppe High School for Boys',
      province: 'Gauteng',
      subjectId: 'fet_core_maths',
      subjectName: 'Mathematics',
      status: 'practicing_quiz',
      statusMessage: 'Sine & Cosine rule triangle problems 📐',
      currentGoal: 'Complete 3D trigonometry quiz',
      streakDays: 8,
      avatarColor: 'bg-amber-600',
    },
    {
      name: 'Ayanda Cele',
      school: 'Clarendon High School for Girls',
      province: 'Eastern Cape',
      subjectId: 'fet_life_sci',
      subjectName: 'Life Sciences',
      status: 'solving_paper',
      statusMessage: 'Human nutrition & digestive enzymes 🧪',
      currentGoal: 'Review villi structure and absorption',
      streakDays: 19,
      avatarColor: 'bg-rose-600',
    },
  ],
  10: [
    {
      name: 'Bandile Zuma',
      school: 'Maritzburg College',
      province: 'KwaZulu-Natal',
      subjectId: 'fet_core_maths',
      subjectName: 'Mathematics',
      status: 'deep_focus',
      statusMessage: 'Factorisation of trinomials and grouping 🔢',
      currentGoal: 'Master diff of two squares & cubic factors',
      streakDays: 7,
      avatarColor: 'bg-teal-600',
    },
    {
      name: 'Mia Du Plessis',
      school: 'Hoërskool Menlopark',
      province: 'Gauteng',
      subjectId: 'fet_phys_sci',
      subjectName: 'Physical Sciences',
      status: 'practicing_quiz',
      statusMessage: 'Transverse waves, frequency & wavelength 🌊',
      currentGoal: 'Wave equation v = f * lambda calculations',
      streakDays: 14,
      avatarColor: 'bg-blue-600',
    },
    {
      name: 'Tshepo Nkosi',
      school: 'St Albans College',
      province: 'Gauteng',
      subjectId: 'fet_life_sci',
      subjectName: 'Life Sciences',
      status: 'reading_notes',
      statusMessage: 'Cell structure & organelle functions 🔬',
      currentGoal: 'Draw and label plant vs animal cell',
      streakDays: 12,
      avatarColor: 'bg-emerald-600',
    },
  ],
};

// Generic fallback template for other grades
const GENERIC_PEERS = [
  {
    name: 'Siphesihle Nkosi',
    school: 'Bishops Diocesan College',
    province: 'Western Cape',
    subjectId: 'snr_maths',
    subjectName: 'Mathematics',
    status: 'deep_focus' as const,
    statusMessage: 'Working on CAPS practice exercises 📚',
    currentGoal: 'Master algebraic fractions step-by-step',
    streakDays: 10,
    avatarColor: 'bg-indigo-600',
  },
  {
    name: 'Lindiwe Dube',
    school: 'St Andrews School',
    province: 'Free State',
    subjectId: 'snr_nat_sci',
    subjectName: 'Natural Sciences',
    status: 'reading_notes' as const,
    statusMessage: 'Reviewing periodic table elements & atoms ⚛️',
    currentGoal: 'Complete end of chapter summary',
    streakDays: 13,
    avatarColor: 'bg-emerald-600',
  },
  {
    name: 'Liam Botha',
    school: 'Grey High School',
    province: 'Eastern Cape',
    subjectId: 'snr_maths',
    subjectName: 'Mathematics',
    status: 'practicing_quiz' as const,
    statusMessage: 'Geometry angles and parallel line proofs 📐',
    currentGoal: 'Score above 80% on practice quiz',
    streakDays: 16,
    avatarColor: 'bg-amber-600',
  },
];

export const SOUTH_AFRICAN_CHEERS = [
  { text: 'Halala! 🎉', emoji: '🎉', label: 'Celebrate achievement' },
  { text: 'Distinction Loading 🚀', emoji: '🚀', label: 'Matric distinction vibes' },
  { text: 'Keep Pushing! 💪', emoji: '💪', label: 'Study resilience' },
  { text: 'Focus Mode 🔥', emoji: '🔥', label: 'Deep concentration' },
  { text: 'Sharp Sharp 👍', emoji: '👍', label: 'All good / sharp' },
  { text: 'High Five ✋', emoji: '✋', label: 'Study partner fist bump' },
];

export class StudyRoomService {
  /**
   * Get active online students for the specified grade
   */
  static getOnlineStudents(grade: number, profile?: LearnerProfile): OnlineStudent[] {
    const templates = SA_PEER_TEMPLATES[grade] || (SA_PEER_TEMPLATES[12] ?? GENERIC_PEERS);

    const peers: OnlineStudent[] = templates.map((t, idx) => ({
      id: `peer_${grade}_${idx}_${t.name.toLowerCase().replace(/\s+/g, '_')}`,
      name: t.name,
      grade,
      school: t.school,
      province: t.province,
      subjectId: t.subjectId,
      subjectName: t.subjectName,
      status: t.status,
      statusMessage: t.statusMessage,
      currentGoal: t.currentGoal,
      isGoalCompleted: idx === 3 || idx === 7,
      streakDays: t.streakDays,
      sessionMinutesDone: 15 + ((idx * 7) % 35),
      avatarColor: t.avatarColor,
      joinedMinutesAgo: 5 + idx * 8,
      isCurrentUser: false,
    }));

    // If profile is provided, prepend the current learner
    if (profile) {
      const savedGoal = this.getSavedGoal();
      peers.unshift({
        id: `user_${profile.id}`,
        name: `${profile.name} (You)`,
        grade: profile.grade,
        school: profile.schoolName || 'Distinction ZA Scholar',
        province: profile.province || 'South Africa',
        subjectId: profile.selectedSubjectIds[0] || 'core_maths',
        subjectName: 'Active Session',
        status: 'deep_focus',
        statusMessage: 'Focusing on CAPS mastery with the cohort',
        currentGoal: savedGoal || profile.learningGoal || 'Achieve Level 7 Distinction',
        isGoalCompleted: false,
        streakDays: profile.studyStreakDays,
        sessionMinutesDone: 0,
        avatarColor: 'bg-emerald-600 ring-2 ring-amber-400',
        joinedMinutesAgo: 1,
        isCurrentUser: true,
      });
    }

    return peers;
  }

  /**
   * Initial study room encouragement messages
   */
  static getInitialMessages(grade: number): StudyRoomMessage[] {
    return [
      {
        id: 'msg_welcome',
        studentName: 'Zola (AI CAPS Mentor)',
        text: `Welcome to the Grade ${grade} Virtual Study Lounge! Set your session goal, keep your head down, and let’s push for those distinctions together! 🇿🇦✨`,
        timestamp: 'Just now',
        isSystem: true,
        badge: 'CAPS Mentor',
      },
      {
        id: 'msg_1',
        studentName: 'Sipho Khumalo',
        school: 'Pretoria Boys High',
        text: 'Exam tip: In Paper 1 Calculus, remember dy/dx of any constant is zero! Don’t lose easy marks on polynomial expansion.',
        timestamp: '8 mins ago',
        badge: 'Grade 12 Peer',
      },
      {
        id: 'msg_2',
        studentName: 'Zanele Mthembu',
        school: 'Durban Girls’ College',
        text: 'Starting my 45-min Physical Sciences sprint. Let’s do this! 💪🔥',
        timestamp: '14 mins ago',
        badge: 'Study Partner',
      },
      {
        id: 'msg_3',
        studentName: 'Keanu Van Der Merwe',
        school: 'Paul Roos Gimnasium',
        text: 'Remember to stay hydrated between cycles. 25 mins deep focus, then 5 min stretch.',
        timestamp: '22 mins ago',
        badge: 'Study Partner',
      },
    ];
  }

  /**
   * Load session stats
   */
  static getSessionStats(): StudyRoomSessionStats {
    try {
      const data = localStorage.getItem(STATS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}

    return {
      totalFocusMinutes: 75,
      sessionsCompletedToday: 3,
      currentStreakDays: 14,
      lastSessionDate: new Date().toISOString().split('T')[0],
    };
  }

  /**
   * Save recorded focus session
   */
  static recordCompletedSession(minutes: number): StudyRoomSessionStats {
    const stats = this.getSessionStats();
    const today = new Date().toISOString().split('T')[0];

    const isNewDay = stats.lastSessionDate !== today;
    const updated: StudyRoomSessionStats = {
      totalFocusMinutes: stats.totalFocusMinutes + minutes,
      sessionsCompletedToday: isNewDay ? 1 : stats.sessionsCompletedToday + 1,
      currentStreakDays: isNewDay ? stats.currentStreakDays + 1 : stats.currentStreakDays,
      lastSessionDate: today,
    };

    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(updated));
    } catch (e) {}

    return updated;
  }

  /**
   * Goal management
   */
  static getSavedGoal(): string {
    try {
      return localStorage.getItem(ACTIVE_GOAL_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  static saveGoal(goal: string): void {
    try {
      localStorage.setItem(ACTIVE_GOAL_KEY, goal);
    } catch (e) {}
  }
}
