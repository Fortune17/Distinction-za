import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
  ShieldCheck,
  PlayCircle,
  ExternalLink,
  HardDrive,
  Check,
  WifiOff,
} from 'lucide-react';
import { Lesson, Topic, LearnerProfile } from '../types/curriculum';
import { SpeechService } from '../services/speechService';
import { OfflineCacheService } from '../services/offlineCacheService';

interface LessonDetailViewProps {
  lesson: Lesson;
  topic?: Topic;
  profile: LearnerProfile;
  isOffline?: boolean;
  onBack: () => void;
  onStartQuiz: (topicId: string) => void;
  onAskTutor: (context: string) => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lesson,
  topic,
  profile,
  isOffline = false,
  onBack,
  onStartQuiz,
  onAskTutor,
}) => {
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCached, setIsCached] = useState<boolean>(() => OfflineCacheService.isLessonCached(lesson.id));
  const [cacheNotice, setCacheNotice] = useState<string | null>(null);

  // Automatically cache lesson in local storage for offline resilience
  useEffect(() => {
    const success = OfflineCacheService.cacheLesson(lesson);
    if (success) {
      setIsCached(true);
    }
  }, [lesson]);

  const handleToggleCache = () => {
    if (isCached) {
      OfflineCacheService.removeCachedLesson(lesson.id);
      setIsCached(false);
      setCacheNotice('Removed from offline cache');
    } else {
      const ok = OfflineCacheService.cacheLesson(lesson);
      if (ok) {
        setIsCached(true);
        setCacheNotice('Saved to local storage for offline access');
      }
    }
    setTimeout(() => setCacheNotice(null), 3000);
  };

  const toggleSolution = (index: number) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      SpeechService.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = lesson.audioNarrative || `${lesson.title}. ${lesson.summary}`;
      SpeechService.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Topics</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Offline Cache Button */}
          <button
            onClick={handleToggleCache}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isCached
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
            title="Save this lesson locally to read without internet data"
          >
            {isCached ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>{isCached ? 'Cached Offline' : 'Save Offline'}</span>
          </button>

          <button
            onClick={handleReadAloud}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isSpeaking
                ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Read Aloud'}</span>
          </button>

          <button
            onClick={() => onAskTutor(`Lesson: ${lesson.title}\nSummary: ${lesson.summary}\nTheory: ${lesson.theoryContent}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-sm hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ask Tutor Zola</span>
          </button>
        </div>
      </div>

      {cacheNotice && (
        <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{cacheNotice}</span>
        </div>
      )}

      {isOffline && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Offline Mode: Viewing verified CAPS revision notes from your local storage. No data used!</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider bg-amber-200 px-2 py-0.5 rounded-md text-amber-900">
            Local Cache
          </span>
        </div>
      )}

      {/* Lesson Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            Grade {lesson.grade} • Term {lesson.term}
          </span>
          {topic && (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              {topic.title}
            </span>
          )}
          <span className="flex items-center gap-1 text-slate-400 text-[11px] ml-auto">
            <Clock className="w-3.5 h-3.5" />
            {lesson.estimatedMinutes} min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {lesson.title}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {lesson.summary}
        </p>

        {/* CAPS Source Citation Pill */}
        <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 border-t border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate">
            <strong>Official Source:</strong> {lesson.capsDocumentSource}
          </span>
          {lesson.verifiedByEducator && (
            <span className="shrink-0 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
              Verified CAPS
            </span>
          )}
        </div>
      </div>

      {/* Visual Diagram or Phonics Card if available */}
      {lesson.visualDiagramType === 'phonics_card' && lesson.visualDiagramData?.items && (
        <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-200">
          <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Picture Cards</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {lesson.visualDiagramData.items.map((item: any, idx: number) => (
              <button
                key={idx}
                onClick={() => SpeechService.speak(item.word)}
                className="bg-white p-3 rounded-2xl border border-amber-300 text-center shadow-xs hover:scale-105 transition-transform"
              >
                <div className="text-3xl sm:text-4xl mb-1">{item.emoji}</div>
                <div className="font-extrabold text-xs sm:text-sm text-slate-800">{item.word}</div>
                <div className="text-[10px] text-amber-600 font-bold">Tap to hear</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Theory Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Curriculum Theory & Notes</span>
        </h2>

        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line font-normal">
          {lesson.theoryContent}
        </div>
      </div>

      {/* Key Vocabulary */}
      {lesson.keyVocabulary.length > 0 && (
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Key CAPS Terminology:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lesson.keyVocabulary.map((v, i) => (
              <div key={i} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="font-bold text-emerald-800 text-xs sm:text-sm mb-1">{v.term}</div>
                <div className="text-slate-600 text-xs leading-relaxed">{v.definition}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-Step Worked Examples */}
      {lesson.workedExamples.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Worked Examples with DBE Marking Breakdown</span>
          </h2>

          {lesson.workedExamples.map((ex, idx) => {
            const isRevealed = revealedSolutions[idx] || false;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Example {idx + 1}: {ex.title}
                  </div>
                  <div className="font-semibold text-slate-800 text-sm sm:text-base">
                    {ex.question}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  {!isRevealed ? (
                    <button
                      onClick={() => toggleSolution(idx)}
                      className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>Reveal Step-by-Step Solution & Working</span>
                    </button>
                  ) : (
                    <div className="space-y-3 animate-in fade-in">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Step-by-Step Working:
                      </div>
                      <div className="space-y-2">
                        {ex.stepByStepSolution.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 text-slate-700 text-xs sm:text-sm font-mono leading-relaxed"
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-sm flex items-center justify-between">
                        <span>Final Answer:</span>
                        <span className="font-mono text-emerald-800">{ex.finalAnswer}</span>
                      </div>

                      {ex.examTip && (
                        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                          <span className="font-bold shrink-0">💡 DBE Examiner Tip:</span>
                          <span>{ex.examTip}</span>
                        </div>
                      )}

                      <button
                        onClick={() => toggleSolution(idx)}
                        className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
                      >
                        Hide solution
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Call to Action: Start Practice Quiz */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-emerald-600/20">
        <div>
          <h3 className="text-xl font-bold">Ready to test what you learned?</h3>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Take a quick CAPS practice quiz for this topic. Get instant feedback and identify foundational gaps.
          </p>
        </div>
        <button
          onClick={() => onStartQuiz(lesson.topicId)}
          className="px-6 py-3.5 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-black text-sm shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          <PlayCircle className="w-5 h-5 text-emerald-600" />
          <span>Launch Practice Quiz</span>
        </button>
      </div>
    </div>
  );
};
