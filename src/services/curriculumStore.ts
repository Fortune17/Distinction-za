import { Topic, Lesson, Question, QuizAttempt, PastPaperResource } from '../types/curriculum';
import { INITIAL_TOPICS, INITIAL_LESSONS, INITIAL_QUESTIONS, PAST_PAPER_RESOURCES } from '../data/curriculumData';

const TOPICS_KEY = 'distinction_za_topics';
const LESSONS_KEY = 'distinction_za_lessons';
const QUESTIONS_KEY = 'distinction_za_questions';
const ATTEMPTS_KEY = 'distinction_za_quiz_attempts';

export class CurriculumStore {
  private static load<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(`Failed to read ${key} from storage`, e);
    }
    return fallback;
  }

  private static save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed to write ${key} to storage`, e);
    }
  }

  static getTopics(grade?: number, subjectId?: string): Topic[] {
    const topics: Topic[] = this.load(TOPICS_KEY, INITIAL_TOPICS);
    return topics.filter((t) => {
      if (grade && t.grade !== grade) return false;
      if (subjectId && t.subjectId !== subjectId) return false;
      return true;
    });
  }

  static getTopicById(id: string): Topic | undefined {
    const topics: Topic[] = this.load(TOPICS_KEY, INITIAL_TOPICS);
    return topics.find((t) => t.id === id);
  }

  static addTopic(topic: Topic): void {
    const topics = this.load<Topic[]>(TOPICS_KEY, INITIAL_TOPICS);
    const existingIndex = topics.findIndex((t) => t.id === topic.id);
    if (existingIndex >= 0) {
      topics[existingIndex] = topic;
    } else {
      topics.push(topic);
    }
    this.save(TOPICS_KEY, topics);
  }

  static getLessons(topicId?: string): Lesson[] {
    const lessons: Lesson[] = this.load(LESSONS_KEY, INITIAL_LESSONS);
    if (topicId) {
      return lessons.filter((l) => l.topicId === topicId);
    }
    return lessons;
  }

  static getLessonById(id: string): Lesson | undefined {
    const lessons: Lesson[] = this.load(LESSONS_KEY, INITIAL_LESSONS);
    return lessons.find((l) => l.id === id);
  }

  static addLesson(lesson: Lesson): void {
    const lessons = this.load<Lesson[]>(LESSONS_KEY, INITIAL_LESSONS);
    const index = lessons.findIndex((l) => l.id === lesson.id);
    if (index >= 0) {
      lessons[index] = lesson;
    } else {
      lessons.push(lesson);
    }
    this.save(LESSONS_KEY, lessons);
  }

  static getQuestions(topicId?: string, grade?: number): Question[] {
    const stored: Question[] = this.load(QUESTIONS_KEY, INITIAL_QUESTIONS);
    // Merge any missing initial questions
    const idMap = new Map<string, Question>();
    INITIAL_QUESTIONS.forEach((q) => idMap.set(q.id, q));
    stored.forEach((q) => idMap.set(q.id, q));
    const all = Array.from(idMap.values());

    return all.filter((q) => {
      if (topicId && q.topicId !== topicId) return false;
      if (grade && q.grade !== grade) return false;
      return true;
    });
  }

  static getQuestionsByIds(ids: string[]): Question[] {
    const all = this.getQuestions();
    return all.filter((q) => ids.includes(q.id));
  }

  static addQuestion(question: Question): void {
    const questions = this.load<Question[]>(QUESTIONS_KEY, INITIAL_QUESTIONS);
    const index = questions.findIndex((q) => q.id === question.id);
    if (index >= 0) {
      questions[index] = question;
    } else {
      questions.push(question);
    }
    this.save(QUESTIONS_KEY, questions);
  }

  static recordQuizAttempt(attempt: QuizAttempt): void {
    const attempts = this.load<QuizAttempt[]>(ATTEMPTS_KEY, []);
    attempts.unshift(attempt);
    // Keep last 100 attempts
    if (attempts.length > 100) attempts.length = 100;
    this.save(ATTEMPTS_KEY, attempts);
  }

  static getQuizAttempts(): QuizAttempt[] {
    return this.load<QuizAttempt[]>(ATTEMPTS_KEY, []);
  }

  static getPastPapers(subjectId?: string, grade?: number, year?: number): PastPaperResource[] {
    return PAST_PAPER_RESOURCES.filter((p) => {
      if (subjectId && subjectId !== 'all' && p.subjectId !== subjectId) return false;
      if (grade && p.grade !== grade) return false;
      if (year && year !== 0 && p.year !== year) return false;
      return true;
    });
  }

  // Diagnostic Gap Analysis across past attempts
  static getDiagnosticKnowledgeGaps(): { gap: string; occurrences: number; subjectId: string; grade: number }[] {
    const attempts = this.getQuizAttempts();
    const gapMap: Record<string, { gap: string; count: number; subjectId: string; grade: number }> = {};

    for (const attempt of attempts) {
      for (const res of attempt.questionResults) {
        if (!res.isCorrect && res.gapDetected) {
          if (!gapMap[res.gapDetected]) {
            gapMap[res.gapDetected] = {
              gap: res.gapDetected,
              count: 0,
              subjectId: attempt.subjectId,
              grade: attempt.grade,
            };
          }
          gapMap[res.gapDetected].count++;
        }
      }
    }

    return Object.values(gapMap).map((g) => ({
      gap: g.gap,
      occurrences: g.count,
      subjectId: g.subjectId,
      grade: g.grade,
    }));
  }

  // Reset to default seed data if needed
  static resetToSeed(): void {
    localStorage.removeItem(TOPICS_KEY);
    localStorage.removeItem(LESSONS_KEY);
    localStorage.removeItem(QUESTIONS_KEY);
  }
}
