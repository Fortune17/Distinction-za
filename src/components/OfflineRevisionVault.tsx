import React, { useState, useEffect } from 'react';
import {
  X,
  Wifi,
  WifiOff,
  HardDrive,
  Download,
  Trash2,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Layers,
} from 'lucide-react';
import {
  OfflineCacheService,
  CachedLessonEntry,
} from '../services/offlineCacheService';
import { CurriculumStore } from '../services/curriculumStore';
import { ALL_SUBJECTS } from '../data/curriculumData';
import { Lesson, Topic } from '../types/curriculum';

interface OfflineRevisionVaultProps {
  isOpen: boolean;
  onClose: () => void;
  activeGrade: number;
  isSimulatedOffline: boolean;
  onToggleSimulateOffline: () => void;
  onOpenLesson: (lesson: Lesson, topic?: Topic) => void;
}

export const OfflineRevisionVault: React.FC<OfflineRevisionVaultProps> = ({
  isOpen,
  onClose,
  activeGrade,
  isSimulatedOffline,
  onToggleSimulateOffline,
  onOpenLesson,
}) => {
  const [cachedEntries, setCachedEntries] = useState<CachedLessonEntry[]>([]);
  const [stats, setStats] = useState({ count: 0, totalKilobytes: 0 });
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const isOnline = OfflineCacheService.isOnline() && !isSimulatedOffline;

  const refreshList = () => {
    setCachedEntries(OfflineCacheService.getCachedIndex());
    setStats(OfflineCacheService.getCacheStats());
  };

  useEffect(() => {
    if (isOpen) {
      refreshList();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter cached list
  const filteredEntries = cachedEntries.filter((item) => {
    if (subjectFilter !== 'all' && item.subjectId !== subjectFilter) return false;
    return true;
  });

  const handleCacheAllForGrade = () => {
    // Get all verified lessons for current grade
    const allGradeTopics = CurriculumStore.getTopics(activeGrade);
    const allLessonsToCache: Lesson[] = [];

    for (const topic of allGradeTopics) {
      const lessons = CurriculumStore.getLessons(topic.id);
      lessons.forEach((l) => allLessonsToCache.push(l));
    }

    if (allLessonsToCache.length === 0) {
      // If none explicitly tagged for this grade in initial seed, grab all default lessons
      const defaultLessons = CurriculumStore.getLessons();
      const count = OfflineCacheService.cacheBatch(defaultLessons);
      refreshList();
      setDownloadSuccessMessage(`Cached ${count} curriculum lessons for offline study!`);
    } else {
      const count = OfflineCacheService.cacheBatch(allLessonsToCache);
      refreshList();
      setDownloadSuccessMessage(`Cached ${count} Grade ${activeGrade} lessons for offline study!`);
    }

    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your offline cached lessons?')) {
      OfflineCacheService.clearAllCache();
      refreshList();
    }
  };

  const handleOpenCachedItem = (entry: CachedLessonEntry) => {
    const lesson = OfflineCacheService.getCachedLesson(entry.lessonId);
    if (lesson) {
      const topic = CurriculumStore.getTopicById(entry.topicId);
      onOpenLesson(lesson, topic);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-emerald-300 font-bold shadow-inner">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg">
                  Offline Revision Vault
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                    isOnline
                      ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
                      : 'bg-amber-500/30 text-amber-200 border-amber-400/40'
                  }`}
                >
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  <span>{isOnline ? 'Online' : 'Offline Mode Active'}</span>
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80">
                Local Storage Caching for Data-Free & Loadshedding Study
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Control Bar: Storage Stats & Simulation Toggle */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Cached Lessons</span>
              <span className="text-sm font-black text-slate-800">{stats.count} saved</span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Storage Used</span>
              <span className="text-sm font-black text-emerald-700">{stats.totalKilobytes} KB</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Simulate offline toggle for testing or rural connection simulation */}
            <button
              onClick={onToggleSimulateOffline}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isSimulatedOffline
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
              title="Simulate losing internet connection to verify offline cached notes"
            >
              {isSimulatedOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-700" /> : <Wifi className="w-3.5 h-3.5 text-slate-400" />}
              <span>{isSimulatedOffline ? 'Resume Online' : 'Simulate Offline Mode'}</span>
            </button>

            {stats.count > 0 && (
              <button
                onClick={handleClearAll}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Clear all offline cache"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Offline Notification / Feedback banner */}
        {downloadSuccessMessage && (
          <div className="mx-4 mt-3 p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Action Callout: One-Click Cache All for Grade */}
        <div className="mx-4 mt-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="font-bold text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Prepare Grade {activeGrade} for Offline Study</span>
            </h4>
            <p className="text-[11px] text-emerald-800">
              Downloads lesson theory, worked examples, and CAPS summaries into your phone's local storage so you can study without internet data.
            </p>
          </div>

          <button
            onClick={handleCacheAllForGrade}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 shrink-0"
          >
            Save All Grade {activeGrade} Lessons
          </button>
        </div>

        {/* Filter and Cached Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>Saved Offline Lessons ({filteredEntries.length})</span>
            {cachedEntries.length > 0 && (
              <select
                aria-label="Filter Offline Lessons by Subject"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold"
              >
                <option value="all">All Subjects</option>
                {ALL_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="font-bold text-slate-700 text-sm">
                No Lessons Cached Locally Yet
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Any lesson you open while connected is automatically saved to your device. You can also click "Save All Grade {activeGrade} Lessons" above!
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const subject = ALL_SUBJECTS.find((s) => s.id === entry.subjectId);
              return (
                <div
                  key={entry.lessonId}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                        Grade {entry.grade} • Term {entry.term}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        {subject?.name || entry.subjectId}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 text-[10px] font-mono">
                        {Math.round(entry.sizeBytes / 1024)} KB
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {entry.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {entry.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenCachedItem(entry)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Offline</span>
                    </button>
                    <button
                      onClick={() => {
                        OfflineCacheService.removeCachedLesson(entry.lessonId);
                        refreshList();
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Remove from offline storage"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Saved lessons use browser LocalStorage. Content remains accessible even without active mobile data or WiFi.
        </div>
      </div>
    </div>
  );
};
