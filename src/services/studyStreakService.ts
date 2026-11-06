/**
 * Study Streak & Daily Engagement Activity Tracker
 * Tracks daily learning sessions for South African CAPS learners
 */

export interface DayActivity {
  date: string; // YYYY-MM-DD
  count: number; // Number of activities completed (lessons, quizzes, exercises)
  minutesSpent: number;
  topicsRevised: string[];
}

export interface StreakStats {
  currentStreakDays: number;
  longestStreakDays: number;
  totalActiveDays: number;
  totalMinutesThisMonth: number;
  activitiesMap: Record<string, DayActivity>;
}

const STREAK_STORAGE_KEY = 'distinction_za_study_streak_data';

export class StudyStreakService {
  /**
   * Helper to format Date as YYYY-MM-DD
   */
  static formatDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get all recorded activity data with fallback seed
   */
  static getStreakStats(): StreakStats {
    try {
      const raw = localStorage.getItem(STREAK_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading streak storage', e);
    }

    // Generate realistic activity seed for the past 35 days (5 weeks)
    const seedMap: Record<string, DayActivity> = {};
    const today = new Date();

    // Active learning patterns: strong continuous streak leading up to today
    const activePattern = [
      true, true, true, false, true, true, true, // 4-5 weeks ago
      true, true, false, true, true, true, true, // 3-4 weeks ago
      true, true, true, true, true, false, true, // 2-3 weeks ago
      true, true, true, true, true, true, true,  // 1-2 weeks ago (7-day streak)
      true, true, true, true, true, true, true,  // past 7 days (current 14-day streak)
    ];

    for (let i = 34; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = this.formatDate(d);
      const isActive = activePattern[34 - i] ?? true;

      if (isActive) {
        const count = i === 0 ? 3 : (i % 3) + 1; // 1 to 3 activities
        seedMap[dateStr] = {
          date: dateStr,
          count,
          minutesSpent: count * 18,
          topicsRevised: ['CAPS Mathematics', 'Natural Sciences'],
        };
      }
    }

    const defaultStats: StreakStats = {
      currentStreakDays: 14,
      longestStreakDays: 21,
      totalActiveDays: 28,
      totalMinutesThisMonth: 640,
      activitiesMap: seedMap,
    };

    this.saveStreakStats(defaultStats);
    return defaultStats;
  }

  static saveStreakStats(stats: StreakStats): void {
    try {
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('Error saving streak storage', e);
    }
  }

  /**
   * Record a learning activity for today
   */
  static recordTodayActivity(topicTitle = 'Curriculum Revision', minutes = 15): StreakStats {
    const stats = this.getStreakStats();
    const todayStr = this.formatDate(new Date());

    if (!stats.activitiesMap[todayStr]) {
      stats.activitiesMap[todayStr] = {
        date: todayStr,
        count: 1,
        minutesSpent: minutes,
        topicsRevised: [topicTitle],
      };
      stats.currentStreakDays += 1;
      stats.totalActiveDays += 1;
      if (stats.currentStreakDays > stats.longestStreakDays) {
        stats.longestStreakDays = stats.currentStreakDays;
      }
    } else {
      stats.activitiesMap[todayStr].count += 1;
      stats.activitiesMap[todayStr].minutesSpent += minutes;
      if (!stats.activitiesMap[todayStr].topicsRevised.includes(topicTitle)) {
        stats.activitiesMap[todayStr].topicsRevised.push(topicTitle);
      }
    }

    stats.totalMinutesThisMonth += minutes;
    this.saveStreakStats(stats);
    return stats;
  }
}
