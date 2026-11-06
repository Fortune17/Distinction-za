export type StudentStatus =
  | 'deep_focus'
  | 'practicing_quiz'
  | 'solving_paper'
  | 'reading_notes'
  | 'short_break';

export interface OnlineStudent {
  id: string;
  name: string;
  grade: number;
  school: string;
  province: string;
  subjectId: string;
  subjectName: string;
  status: StudentStatus;
  statusMessage: string;
  currentGoal: string;
  isGoalCompleted: boolean;
  streakDays: number;
  sessionMinutesDone: number;
  avatarColor: string;
  joinedMinutesAgo: number;
  isCurrentUser?: boolean;
}

export interface StudyCheer {
  id: string;
  fromStudentName: string;
  reaction: string;
  reactionEmoji: string;
  target?: string;
  timestamp: string;
}

export interface StudyRoomMessage {
  id: string;
  studentName: string;
  school?: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  badge?: string;
}

export interface FocusTimerPreset {
  id: string;
  name: string;
  focusMinutes: number;
  breakMinutes: number;
  description: string;
  iconName: string;
}

export interface StudyRoomSessionStats {
  totalFocusMinutes: number;
  sessionsCompletedToday: number;
  currentStreakDays: number;
  lastSessionDate: string;
}
