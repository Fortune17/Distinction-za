import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Clock,
  FileText,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Printer,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Check,
  Send,
  Calculator,
  PenTool,
} from 'lucide-react';
import { FullQuestionPaper, PaperQuestion, SubQuestion } from '../types/fullPaper';
import { CAPS_FORMULA_SHEET } from '../data/curriculumData';
import { DistinctionAppIcon } from './DistinctionAppIcon';

interface FullQuestionPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  paper: FullQuestionPaper | null;
  initialMode?: 'exam' | 'study' | 'print';
  onAskTutor: (context: string) => void;
}

export const FullQuestionPaperModal: React.FC<FullQuestionPaperModalProps> = ({
  isOpen,
  onClose,
  paper,
  initialMode = 'exam',
  onAskTutor,
}) => {
  const [activeMode, setActiveMode] = useState<'exam' | 'study' | 'print'>(initialMode);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);
  const [scratchpadText, setScratchpadText] = useState<string>('');

  // Exam Simulation Timer State
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(
    (paper?.timeAllowedMinutes || 180) * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);

  // Learner answers and bookmarks
  // Key: `${paper.id}_${questionNumber}_${subNumber}`
  const [learnerAnswers, setLearnerAnswers] = useState<Record<string, string>>({});
  const [bookmarkedSubs, setBookmarkedSubs] = useState<Record<string, boolean>>({});
  const [revealedMemos, setRevealedMemos] = useState<Record<string, boolean>>({});

  // Reset or initialize state when paper changes
  useEffect(() => {
    if (paper) {
      setTimeRemainingSeconds(paper.timeAllowedMinutes * 60);
      setIsTimerRunning(activeMode === 'exam');
      setIsExamSubmitted(false);
      setSelectedQuestionIndex(0);

      // Load any saved draft from localStorage
      try {
        const savedDraft = localStorage.getItem(`distinction_za_paper_draft_${paper.id}`);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          setLearnerAnswers(parsed.answers || {});
          setBookmarkedSubs(parsed.bookmarks || {});
          setScratchpadText(parsed.scratchpad || '');
        }
      } catch (e) {
        console.warn('Could not load draft', e);
      }
    }
  }, [paper, activeMode]);

  // Timer countdown hook
  useEffect(() => {
    if (!isOpen || activeMode !== 'exam' || !isTimerRunning || isExamSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, activeMode, isTimerRunning, isExamSubmitted]);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (!paper) return;
    try {
      localStorage.setItem(
        `distinction_za_paper_draft_${paper.id}`,
        JSON.stringify({
          answers: learnerAnswers,
          bookmarks: bookmarkedSubs,
          scratchpad: scratchpadText,
        })
      );
    } catch (e) {
      // ignore
    }
  }, [learnerAnswers, bookmarkedSubs, scratchpadText, paper]);

  if (!isOpen || !paper) return null;

  // Formatting helpers
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = paper.questions[selectedQuestionIndex] || paper.questions[0];

  // Calculate marks attempted
  let totalAttemptedMarks = 0;
  let totalAvailableMarks = paper.totalMarks;

  paper.questions.forEach((q) => {
    q.subQuestions.forEach((sq) => {
      const key = `${paper.id}_${q.questionNumber}_${sq.subNumber}`;
      if (learnerAnswers[key] && learnerAnswers[key].trim().length > 0) {
        totalAttemptedMarks += sq.marks;
      }
    });
  });

  const percentAttempted = Math.round((totalAttemptedMarks / totalAvailableMarks) * 100);

  // Toggle bookmark
  const toggleBookmark = (subKey: string) => {
    setBookmarkedSubs((prev) => ({
      ...prev,
      [subKey]: !prev[subKey],
    }));
  };

  // Toggle single memo reveal
  const toggleMemo = (subKey: string) => {
    setRevealedMemos((prev) => ({
      ...prev,
      [subKey]: !prev[subKey],
    }));
  };

  // Reveal all memos
  const revealAllMemos = () => {
    const all: Record<string, boolean> = {};
    paper.questions.forEach((q) => {
      q.subQuestions.forEach((sq) => {
        all[`${paper.id}_${q.questionNumber}_${sq.subNumber}`] = true;
      });
    });
    setRevealedMemos(all);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[95vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* =========================================================================
            1. TOP OFFICIAL DBE EXAM HEADER
           ========================================================================= */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <DistinctionAppIcon size={44} className="shrink-0" />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  {paper.officialCode}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300">
                  {paper.totalMarks} Marks • {paper.timeAllowedMinutes / 60} Hours
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-200">
                  Grade {paper.grade} NSC
                </span>
              </div>
              <p className="text-[11px] text-purple-200/80 line-clamp-1">{paper.subjectName}</p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Mode Selectors */}
            <div className="hidden sm:flex items-center bg-white/10 p-1 rounded-2xl border border-white/15">
              <button
                onClick={() => {
                  setActiveMode('exam');
                  setIsTimerRunning(true);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'exam'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                Timed Exam
              </button>
              <button
                onClick={() => {
                  setActiveMode('study');
                  setIsTimerRunning(false);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeMode === 'study'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                Study & Memos
              </button>
              <button
                onClick={() => setActiveMode('print')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  activeMode === 'print'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <Printer className="w-3 h-3" />
                <span>Printable</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              title="Close Question Paper"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. SECONDARY CONTROLS BAR (TIMER, MARKS ATTEMPTED, FORMULA SHEET TOGGLE)
           ========================================================================= */}
        <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Mode Badge & Timer */}
          <div className="flex items-center gap-4">
            {activeMode === 'exam' ? (
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-sm shadow-xs ${
                    timeRemainingSeconds <= 900
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-slate-900 text-amber-300'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeRemainingSeconds)}</span>
                </div>

                {!isExamSubmitted && (
                  <button
                    onClick={() => setIsTimerRunning((prev) => !prev)}
                    className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                    title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                  >
                    {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                )}

                {timeRemainingSeconds <= 900 && (
                  <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Under 15 minutes remaining!</span>
                  </span>
                )}
              </div>
            ) : activeMode === 'study' ? (
              <div className="flex items-center gap-2 text-purple-900 font-bold">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>Official Marking Guidelines & Memorandum Study Mode</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Printable Official DBE Exam Booklet Layout</span>
              </div>
            )}
          </div>

          {/* Progress / Tools */}
          <div className="flex items-center gap-3">
            {/* Marks Attempted Tracker */}
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-300 shadow-2xs">
              <span className="text-slate-500 font-medium">Marks Attempted:</span>
              <span className="font-extrabold text-slate-900">
                {totalAttemptedMarks} / {totalAvailableMarks}
              </span>
              <span className="px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black">
                {percentAttempted}%
              </span>
            </div>

            {/* Formula Sheet Drawer Trigger */}
            <button
              onClick={() => setShowFormulaSheet((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all ${
                showFormulaSheet
                  ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-purple-600" />
              <span>CAPS Formula Sheet</span>
            </button>

            {/* Scratchpad Toggle */}
            <button
              onClick={() => setShowScratchpad((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all ${
                showScratchpad
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-amber-600" />
              <span>Calculations Scratchpad</span>
            </button>

            {activeMode === 'study' && (
              <button
                onClick={revealAllMemos}
                className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 font-bold hover:bg-purple-100 transition-colors"
              >
                Reveal All Memorandums
              </button>
            )}

            {activeMode === 'exam' && !isExamSubmitted && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Ready to complete your examination? You have attempted ${totalAttemptedMarks}/${totalAvailableMarks} marks (${percentAttempted}%). This will reveal the complete marking memorandum and final solutions.`
                    )
                  ) {
                    setIsExamSubmitted(true);
                    setActiveMode('study');
                  }
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Submit & View Memo</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            3. MAIN CONTENT WORKSPACE (NAVIGATOR + QUESTIONS + DRAWERS)
           ========================================================================= */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* A. LEFT QUESTION NAVIGATOR SIDEBAR (EXAM & STUDY MODES) */}
          {activeMode !== 'print' && (
            <div className="w-64 border-r border-slate-200 bg-slate-50 p-4 overflow-y-auto shrink-0 flex flex-col justify-between hidden md:flex">
              <div className="space-y-4">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Examination Questions
                </div>

                <div className="space-y-2">
                  {paper.questions.map((q, idx) => {
                    const isSelected = selectedQuestionIndex === idx;

                    // Calculate attempted subquestions
                    const attemptedCount = q.subQuestions.filter((sq) => {
                      const k = `${paper.id}_${q.questionNumber}_${sq.subNumber}`;
                      return learnerAnswers[k] && learnerAnswers[k].trim().length > 0;
                    }).length;

                    return (
                      <button
                        key={q.questionNumber}
                        onClick={() => setSelectedQuestionIndex(idx)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-purple-700 text-white border-purple-800 shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>Question {q.questionNumber}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                              isSelected ? 'bg-purple-800 text-purple-200' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {q.totalMarks} Marks
                          </span>
                        </div>

                        <div
                          className={`text-[11px] truncate font-medium ${
                            isSelected ? 'text-purple-100' : 'text-slate-500'
                          }`}
                        >
                          {q.topicTag}
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className={isSelected ? 'text-purple-200' : 'text-slate-400'}>
                            {attemptedCount} / {q.subQuestions.length} answered
                          </span>
                          {attemptedCount === q.subQuestions.length && (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instructions Box */}
              <div className="mt-4 p-3 bg-purple-50/70 border border-purple-200/60 rounded-2xl text-[11px] text-purple-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>DBE Examination Rules</span>
                </span>
                <p className="text-purple-700 text-[10px] leading-relaxed">
                  Round off answers to TWO decimal places. Non-programmable calculators permitted. Show all formula steps!
                </p>
              </div>
            </div>
          )}

          {/* B. CENTER ACTIVE QUESTION VIEW (OR CONTINUOUS PRINT VIEW) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white">
            {/* 1. PRINTABLE / CONTINUOUS BOOKLET VIEW */}
            {activeMode === 'print' ? (
              <div className="max-w-4xl mx-auto space-y-10 print:space-y-6 text-slate-900 font-serif">
                {/* Print Controls Floating Header */}
                <div className="p-4 bg-slate-100 border border-slate-300 rounded-2xl flex items-center justify-between print:hidden">
                  <div>
                    <h4 className="font-bold text-slate-900 font-sans text-sm">Official Printable Exam Booklet</h4>
                    <p className="text-xs text-slate-600 font-sans">
                      Formatted according to the South African Government Printing Works DBE standard.
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-900 text-white font-sans font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>

                {/* DBE Exam Title Page Header */}
                <div className="border-b-2 border-slate-900 pb-6 text-center space-y-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
                    Republic of South Africa • Department of Basic Education
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
                    NATIONAL SENIOR CERTIFICATE
                  </h1>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-800">
                    GRADE 12
                  </h2>
                  <div className="text-base font-extrabold text-slate-900 pt-1">
                    {paper.subjectName.toUpperCase()}
                  </div>
                  <div className="flex items-center justify-center gap-6 text-sm font-bold pt-2">
                    <span>MARKS: {paper.totalMarks}</span>
                    <span>•</span>
                    <span>TIME: {paper.timeAllowedMinutes / 60} HOURS</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono pt-1">{paper.officialCode}</div>
                </div>

                {/* Instructions & Information */}
                <div className="space-y-2 text-xs leading-relaxed border border-slate-300 p-4 rounded-xl bg-slate-50">
                  <div className="font-bold uppercase tracking-wider text-slate-800 font-sans">
                    INSTRUCTIONS AND INFORMATION:
                  </div>
                  <ol className="list-decimal pl-5 space-y-1">
                    {paper.instructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ol>
                </div>

                {/* Continuous Questions List */}
                {paper.questions.map((q) => (
                  <div key={q.questionNumber} className="space-y-4 pt-6 border-t border-slate-300 page-break-inside-avoid">
                    <div className="flex items-baseline justify-between border-b border-slate-400 pb-2">
                      <h3 className="text-base font-black uppercase text-slate-900 tracking-wide">
                        {q.title}
                      </h3>
                      <span className="font-bold text-sm">[{q.totalMarks} MARKS]</span>
                    </div>

                    {q.contextPreamble && (
                      <p className="italic text-xs text-slate-700 leading-relaxed font-sans">
                        {q.contextPreamble}
                      </p>
                    )}

                    <div className="space-y-6">
                      {q.subQuestions.map((sq) => (
                        <div key={sq.subNumber} className="space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                              <span className="font-bold">{sq.subNumber}</span>
                              <div className="space-y-1">
                                <span className="font-serif">{sq.prompt}</span>
                                {sq.options && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 font-sans text-xs">
                                    {sq.options.map((opt, oIdx) => (
                                      <div key={oIdx} className="p-1 text-slate-700">
                                        {opt}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-slate-800 shrink-0 font-sans">
                              ({sq.marks})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="text-center font-bold text-xs uppercase tracking-widest py-8 border-t-2 border-slate-900">
                  GRAND TOTAL: {paper.totalMarks} MARKS • END OF EXAMINATION QUESTION PAPER
                </div>
              </div>
            ) : (
              /* 2. INTERACTIVE QUESTION-BY-QUESTION EXAM & STUDY WORKSPACE */
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Question Header & Navigation */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700">
                      Question {currentQuestion.questionNumber} of {paper.questions.length} • {currentQuestion.topicTag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                      {currentQuestion.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      disabled={selectedQuestionIndex === 0}
                      onClick={() => setSelectedQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                      title="Previous Question"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-500 px-2">
                      Q{currentQuestion.questionNumber}
                    </span>
                    <button
                      disabled={selectedQuestionIndex === paper.questions.length - 1}
                      onClick={() =>
                        setSelectedQuestionIndex((prev) =>
                          Math.min(paper.questions.length - 1, prev + 1)
                        )
                      }
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                      title="Next Question"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {currentQuestion.contextPreamble && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {currentQuestion.contextPreamble}
                  </div>
                )}

                {/* Sub-Questions Cards */}
                <div className="space-y-6">
                  {currentQuestion.subQuestions.map((sq) => {
                    const subKey = `${paper.id}_${currentQuestion.questionNumber}_${sq.subNumber}`;
                    const currentAnswer = learnerAnswers[subKey] || '';
                    const isBookmarked = bookmarkedSubs[subKey] || false;
                    const isMemoRevealed = revealedMemos[subKey] || activeMode === 'study';

                    return (
                      <div
                        key={sq.subNumber}
                        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4 hover:border-slate-300 transition-colors"
                      >
                        {/* Subquestion header with badges */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-900 font-extrabold text-xs flex items-center justify-center shrink-0">
                              {sq.subNumber}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              [{sq.marks} {sq.marks === 1 ? 'Mark' : 'Marks'}]
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {sq.cognitiveLevel}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleBookmark(subKey)}
                              className={`p-1.5 rounded-xl border transition-colors ${
                                isBookmarked
                                  ? 'bg-amber-100 border-amber-300 text-amber-700'
                                  : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                              }`}
                              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() =>
                                onAskTutor(
                                  `Help me understand this Grade 12 NSC question step by step without giving away the full answer right away:\nQuestion: ${sq.prompt}\nContext: ${currentQuestion.title}`
                                )
                              }
                              className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 text-[11px] font-bold flex items-center gap-1 transition-colors"
                              title="Ask AI Tutor Zola for a hint"
                            >
                              <Sparkles className="w-3 h-3 text-purple-600" />
                              <span>Ask Tutor</span>
                            </button>
                          </div>
                        </div>

                        {/* Prompt text */}
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                          {sq.prompt}
                        </div>

                        {/* MCQ Options (if type is MCQ) */}
                        {sq.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {sq.options.map((opt, oIdx) => {
                              const letter = opt.charAt(0);
                              const isSelected = currentAnswer === letter;

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() =>
                                    setLearnerAnswers((prev) => ({
                                      ...prev,
                                      [subKey]: letter,
                                    }))
                                  }
                                  className={`p-3 rounded-2xl text-xs font-semibold text-left border transition-all ${
                                    isSelected
                                      ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Working Space / Answer Textarea (Exam Mode or Practice) */}
                        {(!sq.options || sq.type !== 'mcq') && (
                          <div className="space-y-1.5 pt-1">
                            <label className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                              <span>Your Working & Answer:</span>
                              {sq.expectedShortAnswer && (
                                <span className="text-[10px] text-slate-400 font-normal">
                                  Auto-saved to draft
                                </span>
                              )}
                            </label>
                            <textarea
                              rows={3}
                              value={currentAnswer}
                              onChange={(e) =>
                                setLearnerAnswers((prev) => ({
                                  ...prev,
                                  [subKey]: e.target.value,
                                }))
                              }
                              placeholder="Type your mathematical steps or final value here (e.g. x = 6 or x = -2)..."
                              className="w-full p-3 rounded-2xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/50"
                            />
                          </div>
                        )}

                        {/* Examiner Tip */}
                        {sq.examinerTip && (
                          <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold">NSC Examiner Tip: </strong>
                              <span>{sq.examinerTip}</span>
                            </div>
                          </div>
                        )}

                        {/* Official Marking Guidelines & Memorandum Toggle */}
                        <div className="pt-2 border-t border-slate-100">
                          <button
                            onClick={() => toggleMemo(subKey)}
                            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 py-1"
                          >
                            {isMemoRevealed ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hide Marking Memorandum</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Show Official DBE Marking Guidelines ({sq.marks} Marks)</span>
                              </>
                            )}
                          </button>

                          {isMemoRevealed && (
                            <div className="mt-3 p-4 bg-purple-50/60 rounded-2xl border border-purple-200/80 space-y-3 animate-in fade-in">
                              <div className="flex items-center justify-between text-xs font-bold text-purple-900 border-b border-purple-200/70 pb-2">
                                <span>Official Department of Basic Education Marking Memorandum</span>
                                <span className="text-[11px] font-black text-purple-700">
                                  Total: {sq.marks} Marks
                                </span>
                              </div>

                              {/* Marks Tick Breakdown */}
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                                  Mark Allocation Rubric (Tick breakdown):
                                </span>
                                <ul className="space-y-1 text-xs text-purple-950 font-mono">
                                  {sq.markingGuidelines.map((guideline, gIdx) => (
                                    <li
                                      key={gIdx}
                                      className="flex items-start gap-2 bg-white/70 p-2 rounded-xl border border-purple-100"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                      <span>{guideline}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Complete Worked Solution */}
                              <div className="space-y-1 pt-1">
                                <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                                  Full Step-by-Step Worked Solution:
                                </span>
                                <pre className="p-3 bg-white rounded-xl border border-purple-200 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                                  {sq.fullWorkedSolution}
                                </pre>
                              </div>

                              {sq.formulaUsed && (
                                <div className="text-[11px] text-purple-800 bg-white/80 p-2 rounded-xl border border-purple-100 flex items-center gap-1.5 font-mono">
                                  <span className="font-bold">Formula Used:</span>
                                  <span>{sq.formulaUsed}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <button
                    disabled={selectedQuestionIndex === 0}
                    onClick={() => setSelectedQuestionIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>

                  <button
                    disabled={selectedQuestionIndex === paper.questions.length - 1}
                    onClick={() =>
                      setSelectedQuestionIndex((prev) =>
                        Math.min(paper.questions.length - 1, prev + 1)
                      )
                    }
                    className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              C. RIGHT SLIDE-OVER DRAWER 1: OFFICIAL FORMULA SHEET
             ========================================================================= */}
          {showFormulaSheet && (
            <div className="w-80 border-l border-slate-200 bg-slate-50 p-4 overflow-y-auto shrink-0 shadow-lg animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-purple-600" />
                  <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                    Official CAPS Formulas
                  </span>
                </div>
                <button
                  onClick={() => setShowFormulaSheet(false)}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 pt-3">
                {paper.formulaSheetCategory === 'maths' && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Algebra & Quadratic:
                      </span>
                      {CAPS_FORMULA_SHEET.mathematics.algebra.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Sequences & Series:
                      </span>
                      {CAPS_FORMULA_SHEET.mathematics.series.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Financial Mathematics:
                      </span>
                      {CAPS_FORMULA_SHEET.mathematics.finance.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Differential Calculus:
                      </span>
                      {CAPS_FORMULA_SHEET.mathematics.calculus.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Probability:
                      </span>
                      {CAPS_FORMULA_SHEET.mathematics.probability.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {paper.formulaSheetCategory === 'physics' && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Mechanics & Motion:
                      </span>
                      {CAPS_FORMULA_SHEET.physics.mechanics.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Waves & Doppler Effect:
                      </span>
                      {CAPS_FORMULA_SHEET.physics.waves.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Electricity & Circuits:
                      </span>
                      {CAPS_FORMULA_SHEET.physics.electricity.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
                        Matter & Photoelectric:
                      </span>
                      {CAPS_FORMULA_SHEET.physics.matter.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {paper.formulaSheetCategory === 'geography' && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                        Mapwork Calculations & Scale:
                      </span>
                      {CAPS_FORMULA_SHEET.geography.mapworkCalculations.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                        Climate & Synoptic Keys:
                      </span>
                      {CAPS_FORMULA_SHEET.geography.climatologyKeys.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {paper.formulaSheetCategory === 'lifesciences' && (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-pink-700 uppercase tracking-wider">
                        Genetics & Inheritance Rules:
                      </span>
                      {CAPS_FORMULA_SHEET.lifesciences.geneticsRules.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-pink-700 uppercase tracking-wider">
                        Calculations & Base Pairing:
                      </span>
                      {CAPS_FORMULA_SHEET.lifesciences.calculations.map((f, i) => (
                        <div key={i} className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                          {f}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              D. RIGHT SLIDE-OVER DRAWER 2: SCRATCHPAD FOR ROUGH WORK
             ========================================================================= */}
          {showScratchpad && (
            <div className="w-80 border-l border-slate-200 bg-amber-50/50 p-4 flex flex-col shrink-0 shadow-lg animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-amber-700" />
                  <span className="font-extrabold text-xs text-amber-950 uppercase tracking-wider">
                    Calculations Scratchpad
                  </span>
                </div>
                <button
                  onClick={() => setShowScratchpad(false)}
                  className="p-1 rounded-lg hover:bg-amber-100 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 text-[10px] text-amber-800">
                Use this rough workspace to draft steps, factors, derivatives, or check arithmetic.
              </div>

              <textarea
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                placeholder="Rough work:
f'(x) = 4x - 3
Δ = b² - 4ac = 25 - 4(2)(-1) = 33
n = 180 payments..."
                className="flex-1 mt-3 p-3 rounded-2xl border border-amber-300 text-xs font-mono bg-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Scratchpad auto-saves</span>
                <button
                  onClick={() => setScratchpadText('')}
                  className="text-amber-800 font-bold hover:underline"
                >
                  Clear Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
