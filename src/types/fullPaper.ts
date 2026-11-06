export type CognitiveLevel =
  | 'Knowledge'
  | 'Routine Procedures'
  | 'Complex Procedures'
  | 'Problem Solving';

export interface SubQuestion {
  subNumber: string; // e.g. "1.1.1", "1.2", "2.1"
  prompt: string;
  marks: number;
  type: 'step-by-step' | 'numeric' | 'mcq' | 'choice';
  options?: string[];
  expectedShortAnswer?: string;
  markingGuidelines: string[]; // e.g. ["✓ standard form", "✓ factors", "✓ both x-values"]
  fullWorkedSolution: string;
  cognitiveLevel: CognitiveLevel;
  examinerTip: string;
  formulaUsed?: string;
}

export interface PaperQuestion {
  questionNumber: number; // e.g. 1, 2, 3...
  title: string; // e.g. "QUESTION 1: ALGEBRA, EQUATIONS AND INEQUALITIES"
  topicTag: string;
  totalMarks: number;
  contextPreamble?: string; // e.g. "Given the quadratic sequence: 3; 7; 15; 27; ..."
  diagramSvg?: string;
  subQuestions: SubQuestion[];
}

export interface FullQuestionPaper {
  id: string;
  subjectId: string;
  subjectName: string;
  grade: 12;
  year: number;
  session: 'November NSC' | 'June NSC' | 'Preparatory Exemplar' | '2025 Practice Exam';
  paperNumber: 1 | 2;
  totalMarks: number; // 150 marks
  timeAllowedMinutes: number; // 180 min (3 hours) or 150 min (2.5 hours)
  officialCode: string; // e.g. "DBE/November 2024 NSC"
  instructions: string[];
  formulaSheetCategory: 'maths' | 'physics' | 'accounting' | 'geography' | 'lifesciences';
  questions: PaperQuestion[];
}
