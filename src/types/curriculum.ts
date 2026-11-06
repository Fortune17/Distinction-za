export type PhaseId = 'foundation' | 'intermediate' | 'senior' | 'fet';

export interface PhaseInfo {
  id: PhaseId;
  name: string;
  grades: number[];
  subtitle: string;
  themeColor: string;
  accentBg: string;
  description: string;
  focusAreas: string[];
}

export type SouthAfricanLanguage =
  | 'English'
  | 'isiZulu'
  | 'Afrikaans'
  | 'isiXhosa'
  | 'Sesotho'
  | 'Sepedi'
  | 'Setswana'
  | 'Xitsonga'
  | 'siSwati'
  | 'Tshivenda'
  | 'isiNdebele';

export interface Subject {
  id: string;
  name: string;
  code: string;
  phase: PhaseId;
  grades: number[];
  icon: string;
  color: string;
  description: string;
  isCore?: boolean;
}

export interface Topic {
  id: string;
  subjectId: string;
  grade: number;
  term: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  capsReference: string; // e.g., "DBE CAPS Section 3.1 - Functions"
  learningObjectives: string[];
  prerequisites?: string[]; // IDs or titles of prerequisite foundational concepts
  totalLessons?: number;
}

export interface WorkedExample {
  title: string;
  question: string;
  stepByStepSolution: string[];
  finalAnswer: string;
  examTip?: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  subjectId: string;
  grade: number;
  term: 1 | 2 | 3 | 4;
  title: string;
  estimatedMinutes: number;
  summary: string;
  theoryContent: string;
  visualDiagramType?: 'formula' | 'diagram' | 'chart' | 'phonics_card' | 'steps';
  visualDiagramData?: any;
  workedExamples: WorkedExample[];
  keyVocabulary: { term: string; definition: string }[];
  capsDocumentSource: string; // e.g. "Department of Basic Education CAPS Curriculum Grade 10-12 Mathematics"
  verifiedByEducator: boolean;
  audioNarrative?: string; // For Grade 1-3 accessibility
}

export type QuestionType = 'mcq' | 'numeric' | 'short-answer' | 'multipart';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'exam-standard';

export interface Question {
  id: string;
  topicId: string;
  lessonId?: string;
  subjectId: string;
  grade: number;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  prompt: string;
  audioPrompt?: string; // Text spoken by TTS for foundation phase
  options?: string[]; // For MCQ
  correctAnswer: string; // Stored answer
  numericTolerance?: number; // E.g., +/- 0.1
  explanation: string;
  hints: string[];
  prerequisiteGapTag?: string; // Flag if answered wrongly (e.g., "Grade 4 Decimals Gap")
  source: string; // e.g., "DBE NSC Exemplar 2023" or "CAPS Diagnostic Assessment"
  marks: number;
}

export interface PastPaperResource {
  id: string;
  subjectId: string;
  grade: 10 | 11 | 12;
  year: number;
  session: 'November' | 'June' | 'Trial/Preparatory';
  paper: 1 | 2 | 3;
  title: string;
  officialDbeLink: string;
  memoSummary: string;
  keyTopicsTested: string[];
  practiceQuestionIds?: string[];
}

export interface LearnerProfile {
  id: string;
  name: string;
  grade: number;
  phase: PhaseId;
  selectedSubjectIds: string[];
  preferredLanguage: SouthAfricanLanguage;
  learningGoal: string;
  currentMarks: Record<string, number>; // subjectId -> current %
  targetMarks: Record<string, number>; // subjectId -> target % (e.g. 80% for Distinction)
  studyStreakDays: number;
  lastActiveDate: string;
  guardianName?: string;
  guardianEmail?: string;
  guardianConsentGiven: boolean;
  schoolName?: string;
  province?: string;
  classCode?: string;
  lowDataMode: boolean;
  soundEnabled: boolean;
}

export interface QuizAttempt {
  id: string;
  topicId: string;
  subjectId: string;
  grade: number;
  date: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  isExamSimulation?: boolean;
  questionResults: {
    questionId: string;
    learnerAnswer: string;
    isCorrect: boolean;
    gapDetected?: string;
  }[];
}

export interface StudyPlanItem {
  id: string;
  topicId: string;
  subjectId: string;
  grade: number;
  title: string;
  reason: 'daily_goal' | 'foundation_gap' | 'exam_prep' | 'distinction_booster';
  status: 'pending' | 'in_progress' | 'completed';
  estimatedMinutes: number;
  dueDate: string;
}

export interface ClassGroup {
  id: string;
  code: string;
  name: string;
  grade: number;
  subjectId: string;
  teacherName: string;
  schoolName: string;
  learnerCount: number;
  assignedTopicIds: string[];
}
