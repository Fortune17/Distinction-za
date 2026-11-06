import { LearnerProfile, PhaseId, SouthAfricanLanguage } from '../types/curriculum';
import { getPhaseForGrade, ALL_SUBJECTS } from '../data/curriculumData';

const PROFILE_KEY = 'distinction_za_active_profile';
const USER_ROLE_KEY = 'distinction_za_current_role';

export type UserRole = 'learner' | 'parent' | 'teacher' | 'admin';

const DEFAULT_PROFILE: LearnerProfile = {
  id: 'learner_default_sa',
  name: 'Lethabo Ndlovu',
  grade: 12,
  phase: 'fet',
  selectedSubjectIds: ['fet_core_maths', 'fet_phys_sci', 'fet_life_sci', 'fet_accounting'],
  preferredLanguage: 'English',
  learningGoal: 'Achieve 4 Distinctions (Level 7) for University of Cape Town (UCT) Engineering Admission',
  currentMarks: {
    fet_core_maths: 72,
    fet_phys_sci: 68,
    fet_life_sci: 76,
    fet_accounting: 74,
  },
  targetMarks: {
    fet_core_maths: 85,
    fet_phys_sci: 82,
    fet_life_sci: 85,
    fet_accounting: 80,
  },
  studyStreakDays: 14,
  lastActiveDate: new Date().toISOString().split('T')[0],
  guardianName: 'Siphiwe Ndlovu',
  guardianEmail: 's.ndlovu@example.co.za',
  guardianConsentGiven: true,
  schoolName: 'Pretoria Boys High / Soweto High',
  province: 'Gauteng',
  lowDataMode: false,
  soundEnabled: true,
};

export class UserStore {
  static getProfile(): LearnerProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading learner profile', e);
    }
    return DEFAULT_PROFILE;
  }

  static saveProfile(profile: LearnerProfile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Error saving learner profile', e);
    }
  }

  static getRole(): UserRole {
    try {
      const role = localStorage.getItem(USER_ROLE_KEY);
      if (role) return role as UserRole;
    } catch (e) {}
    return 'learner';
  }

  static setRole(role: UserRole): void {
    localStorage.setItem(USER_ROLE_KEY, role);
  }

  static updateGrade(newGrade: number): LearnerProfile {
    const profile = this.getProfile();
    const newPhase: PhaseId = getPhaseForGrade(newGrade);
    
    // Auto-select valid subjects for this new grade/phase
    const validSubjects = ALL_SUBJECTS.filter((s) => s.grades.includes(newGrade));
    const newSelectedSubjectIds = validSubjects.filter((s) => s.isCore).map((s) => s.id);

    const updated: LearnerProfile = {
      ...profile,
      grade: newGrade,
      phase: newPhase,
      selectedSubjectIds: newSelectedSubjectIds.length > 0 ? newSelectedSubjectIds : validSubjects.slice(0, 4).map((s) => s.id),
    };

    this.saveProfile(updated);
    return updated;
  }

  static toggleLowDataMode(): boolean {
    const profile = this.getProfile();
    const nextVal = !profile.lowDataMode;
    this.saveProfile({ ...profile, lowDataMode: nextVal });
    return nextVal;
  }

  static toggleSound(): boolean {
    const profile = this.getProfile();
    const nextVal = !profile.soundEnabled;
    this.saveProfile({ ...profile, soundEnabled: nextVal });
    return nextVal;
  }

  static updateSubjectMarks(subjectId: string, current: number, target: number): void {
    const profile = this.getProfile();
    profile.currentMarks[subjectId] = current;
    profile.targetMarks[subjectId] = target;
    this.saveProfile(profile);
  }
}
