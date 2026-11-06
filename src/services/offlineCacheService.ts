/**
 * Distinction ZA — Offline Local Storage Caching Service
 * Allows South African learners to cache curriculum lessons, revision notes,
 * and worked examples to access them without data or during network interruptions.
 */

import { Lesson, Topic } from '../types/curriculum';

export interface CachedLessonEntry {
  lessonId: string;
  topicId: string;
  subjectId: string;
  grade: number;
  term: number;
  title: string;
  summary: string;
  theoryContent: string;
  workedExamplesCount: number;
  cachedAt: string; // ISO date string
  sizeBytes: number;
}

const CACHED_LESSONS_STORE_KEY = 'distinction_za_cached_lessons_data';
const CACHED_INDEX_KEY = 'distinction_za_cached_lessons_index';
const AUTO_CACHE_PREF_KEY = 'distinction_za_auto_cache_enabled';

export class OfflineCacheService {
  private static listeners: Array<(isOnline: boolean) => void> = [];

  /**
   * Check if browser is currently online
   */
  static isOnline(): boolean {
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      return navigator.onLine;
    }
    return true;
  }

  /**
   * Subscribe to network connection state changes
   */
  static subscribeNetworkStatus(callback: (isOnline: boolean) => void): () => void {
    this.listeners.push(callback);

    const onlineHandler = () => {
      this.listeners.forEach((cb) => cb(true));
    };

    const offlineHandler = () => {
      this.listeners.forEach((cb) => cb(false));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('online', onlineHandler);
      window.addEventListener('offline', offlineHandler);
    }

    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', onlineHandler);
        window.removeEventListener('offline', offlineHandler);
      }
    };
  }

  /**
   * Save a lesson and its full content into local storage
   */
  static cacheLesson(lesson: Lesson): boolean {
    try {
      // 1. Get full cached data dictionary
      const fullData = this.getAllCachedData();
      fullData[lesson.id] = lesson;

      // 2. Compute approximate size
      const jsonString = JSON.stringify(lesson);
      const sizeBytes = new Blob([jsonString]).size;

      // 3. Update index for quick listing without parsing all lesson blobs
      const index = this.getCachedIndex();
      const existingIdx = index.findIndex((item) => item.lessonId === lesson.id);

      const entry: CachedLessonEntry = {
        lessonId: lesson.id,
        topicId: lesson.topicId,
        subjectId: lesson.subjectId,
        grade: lesson.grade,
        term: lesson.term,
        title: lesson.title,
        summary: lesson.summary,
        theoryContent: lesson.theoryContent,
        workedExamplesCount: lesson.workedExamples?.length || 0,
        cachedAt: new Date().toISOString(),
        sizeBytes,
      };

      if (existingIdx >= 0) {
        index[existingIdx] = entry;
      } else {
        index.unshift(entry);
      }

      // Persist to localStorage
      localStorage.setItem(CACHED_LESSONS_STORE_KEY, JSON.stringify(fullData));
      localStorage.setItem(CACHED_INDEX_KEY, JSON.stringify(index));
      return true;
    } catch (err) {
      console.warn('Failed to cache lesson in localStorage (storage might be full)', err);
      return false;
    }
  }

  /**
   * Check if a specific lesson is already cached
   */
  static isLessonCached(lessonId: string): boolean {
    const index = this.getCachedIndex();
    return index.some((item) => item.lessonId === lessonId);
  }

  /**
   * Retrieve cached lesson content by ID
   */
  static getCachedLesson(lessonId: string): Lesson | null {
    try {
      const fullData = this.getAllCachedData();
      return fullData[lessonId] || null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Get list of all cached lesson entries metadata
   */
  static getCachedIndex(): CachedLessonEntry[] {
    try {
      const raw = localStorage.getItem(CACHED_INDEX_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }

  /**
   * Remove a specific lesson from cache
   */
  static removeCachedLesson(lessonId: string): void {
    try {
      const fullData = this.getAllCachedData();
      delete fullData[lessonId];
      localStorage.setItem(CACHED_LESSONS_STORE_KEY, JSON.stringify(fullData));

      const index = this.getCachedIndex().filter((i) => i.lessonId !== lessonId);
      localStorage.setItem(CACHED_INDEX_KEY, JSON.stringify(index));
    } catch (e) {}
  }

  /**
   * Clear all offline cached lessons
   */
  static clearAllCache(): void {
    localStorage.removeItem(CACHED_LESSONS_STORE_KEY);
    localStorage.removeItem(CACHED_INDEX_KEY);
  }

  /**
   * Get total estimated cache storage size
   */
  static getCacheStats(): { count: number; totalKilobytes: number } {
    const index = this.getCachedIndex();
    const totalBytes = index.reduce((sum, item) => sum + item.sizeBytes, 0);
    return {
      count: index.length,
      totalKilobytes: Math.round(totalBytes / 1024),
    };
  }

  /**
   * Cache multiple lessons (e.g., entire grade curriculum package)
   */
  static cacheBatch(lessons: Lesson[]): number {
    let successCount = 0;
    for (const lesson of lessons) {
      if (this.cacheLesson(lesson)) {
        successCount++;
      }
    }
    return successCount;
  }

  private static getAllCachedData(): Record<string, Lesson> {
    try {
      const raw = localStorage.getItem(CACHED_LESSONS_STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  }
}
