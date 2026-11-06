import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Award,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, Topic, QuizAttempt, LearnerProfile } from '../types/curriculum';
import { CurriculumStore } from '../services/curriculumStore';
import { SpeechService } from '../services/speechService';
import { StudyStreakService } from '../services/studyStreakService';

interface PracticeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: Topic;
  grade: number;
  subjectId: string;
  isExamMode?: boolean;
  specificQuestionIds?: string[];
  customTitle?: string;
  onAskTutorHint?: (questionText: string) => void;
  onRevisionRecommend?: (gap: string) => void;
}

export const PracticeQuizModal: React.FC<PracticeQuizModalProps> = ({
  isOpen,
  onClose,
  topic,
  grade,
  subjectId,
  isExamMode = false,
  specificQuestionIds,
  customTitle,
  onAskTutorHint,
  onRevisionRecommend,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load questions
  useEffect(() => {
    if (isOpen) {
      if (specificQuestionIds && specificQuestionIds.length > 0) {
        const specificQs = CurriculumStore.getQuestionsByIds(specificQuestionIds);
        setQuestions(specificQs.length > 0 ? specificQs : CurriculumStore.getQuestions(undefined, grade));
      } else {
        const qs = CurriculumStore.getQuestions(topic?.id, grade);
        // If none for this specific topic, fallback to questions of this grade
        const finalQuestions = qs.length > 0 ? qs : CurriculumStore.getQuestions(undefined, grade);
        setQuestions(finalQuestions);
      }
      setCurrentIndex(0);
      setSelectedAnswers({});
      setRevealedHints({});
      setIsCompleted(false);
      setSecondsElapsed(0);
    }
  }, [isOpen, topic?.id, grade, specificQuestionIds]);

  // Timer
  useEffect(() => {
    if (!isOpen || isCompleted) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    } , 1000);
    return () => clearInterval(interval);
  }, [isOpen, isCompleted]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = (ans: string) => {
    if (isCompleted || !currentQ) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: ans,
    }));
  };

  const handleSpeakQuestion = () => {
    if (!currentQ) return;
    if (isSpeaking) {
      SpeechService.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const text = currentQ.audioPrompt || currentQ.prompt;
      SpeechService.speak(text, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleShowHint = () => {
    if (!currentQ || !currentQ.hints || currentQ.hints.length === 0) return;
    setRevealedHints((prev) => {
      const currentHintCount = prev[currentQ.id] || 0;
      return {
        ...prev,
        [currentQ.id]: Math.min(currentHintCount + 1, currentQ.hints.length),
      };
    });
  };

  const handleSubmitQuiz = () => {
    setIsCompleted(true);

    // Calculate score
    let correct = 0;
    const results = questions.map((q) => {
      const userAns = (selectedAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();
      let isCorrect = false;

      if (q.type === 'numeric' && q.numericTolerance !== undefined) {
        const uNum = parseFloat(userAns);
        const cNum = parseFloat(correctAns);
        if (!isNaN(uNum) && !isNaN(cNum)) {
          isCorrect = Math.abs(uNum - cNum) <= q.numericTolerance;
        }
      } else {
        isCorrect = userAns === correctAns;
      }

      if (isCorrect) correct++;

      return {
        questionId: q.id,
        learnerAnswer: selectedAnswers[q.id] || 'Not answered',
        isCorrect,
        gapDetected: !isCorrect ? q.prerequisiteGapTag : undefined,
      };
    });

    const scorePct = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      topicId: topic?.id || 'general_topic',
      subjectId,
      grade,
      date: new Date().toISOString(),
      totalQuestions: questions.length,
      correctCount: correct,
      scorePercentage: scorePct,
      timeSpentSeconds: secondsElapsed,
      isExamSimulation: isExamMode,
      questionResults: results,
    };

    CurriculumStore.recordQuizAttempt(attempt);
    StudyStreakService.recordTodayActivity(topic?.title || 'Diagnostic Assessment', Math.max(Math.round(secondsElapsed / 60), 5));

    // If Distinction level (80%+), celebrate with confetti!
    if (scorePct >= 80) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
      SpeechService.speak('Congratulations! You achieved a Distinction on this quiz!');
    }
  };

  // Score stats for completed view
  let totalScore = 0;
  let correctCount = 0;
  const detectedGaps: string[] = [];

  if (isCompleted) {
    questions.forEach((q) => {
      const userAns = (selectedAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();
      let isCorrect = false;

      if (q.type === 'numeric' && q.numericTolerance !== undefined) {
        const uNum = parseFloat(userAns);
        const cNum = parseFloat(correctAns);
        if (!isNaN(uNum) && !isNaN(cNum)) {
          isCorrect = Math.abs(uNum - cNum) <= q.numericTolerance;
        }
      } else {
        isCorrect = userAns === correctAns;
      }

      if (isCorrect) correctCount++;
      else if (q.prerequisiteGapTag && !detectedGaps.includes(q.prerequisiteGapTag)) {
        detectedGaps.push(q.prerequisiteGapTag);
      }
    });
    totalScore = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg">
                {customTitle || (isExamMode ? 'CAPS Timed Exam Simulation' : 'CAPS Practice & Assessment')}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-emerald-100">
                Grade {grade}
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 truncate">
              {customTitle ? 'Official DBE National Senior Certificate Questions' : topic ? topic.title : 'Diagnostic Assessment'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-xl text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {questions.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Assessment Questions Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our curriculum educators are adding verified questions for this topic. Use the AI Tutor to generate custom questions in the meantime!
              </p>
            </div>
          ) : !isCompleted ? (
            <div className="space-y-6">
              {/* Progress Bar & Question Info */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="capitalize px-2 py-0.5 rounded-md bg-slate-200/60 text-slate-700">
                  {currentQ?.difficulty} • {currentQ?.marks} mark{currentQ?.marks > 1 ? 's' : ''}
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {currentQ?.prompt}
                  </h3>
                  <button
                    onClick={handleSpeakQuestion}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0"
                    title="Read question out loud"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>

                {/* Question Types: MCQ */}
                {currentQ?.type === 'mcq' && currentQ.options && (
                  <div className="space-y-2 pt-2">
                    {currentQ.options.map((option, idx) => {
                      const isSelected = selectedAnswers[currentQ.id] === option;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(option)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{option}</span>
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-slate-300 text-slate-400'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Numeric / Short-Answer Input */}
                {(currentQ?.type === 'numeric' || currentQ?.type === 'short-answer') && (
                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500">Your Answer:</label>
                    <input
                      type={currentQ.type === 'numeric' ? 'number' : 'text'}
                      value={selectedAnswers[currentQ.id] || ''}
                      onChange={(e) => handleSelectAnswer(e.target.value)}
                      placeholder={currentQ.type === 'numeric' ? 'Enter numerical value (e.g. 10)' : 'Type answer here'}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                    />
                  </div>
                )}

                {/* Hints Drawer */}
                {currentQ?.hints && currentQ.hints.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleShowHint}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>
                          Need a Hint? ({(revealedHints[currentQ.id] || 0)}/{currentQ.hints.length} unlocked)
                        </span>
                      </button>

                      {onAskTutorHint && (
                        <button
                          onClick={() => onAskTutorHint(currentQ.prompt)}
                          className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ask Zola for Guided Hint</span>
                        </button>
                      )}
                    </div>

                    {(revealedHints[currentQ.id] || 0) > 0 && (
                      <div className="space-y-1.5">
                        {currentQ.hints.slice(0, revealedHints[currentQ.id]).map((h, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 animate-in fade-in"
                          >
                            <span className="font-bold">Hint {i + 1}:</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold disabled:opacity-40"
                >
                  Previous
                </button>

                {!isLastQuestion ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-md shadow-emerald-600/20"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* COMPLETED ASSESSMENT VIEW */
            <div className="space-y-6 animate-in fade-in">
              {/* Score Header Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 text-center border border-slate-200 shadow-sm space-y-3">
                <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center shadow-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {totalScore >= 80
                      ? 'Outstanding! Level 7 Distinction 🏆'
                      : totalScore >= 60
                      ? 'Good Effort! Substantial Achievement'
                      : 'Revision Needed — Let us strengthen your concepts!'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Completed in {formatTime(secondsElapsed)} • CAPS Diagnostic Assessment
                  </p>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-emerald-600 font-mono">
                  {totalScore}%
                </div>

                <div className="text-xs font-bold text-slate-600">
                  {correctCount} out of {questions.length} questions correct
                </div>
              </div>

              {/* Foundational Knowledge Gap Alert */}
              {detectedGaps.length > 0 && (
                <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Foundational Knowledge Gaps Identified</span>
                  </div>
                  <p className="text-xs text-amber-800">
                    Our diagnostic engine noticed you missed questions linked to earlier prerequisite concepts. Revisiting these will unlock higher marks:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {detectedGaps.map((gap, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs"
                      >
                        ⚠️ {gap}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Question-by-Question Detailed Review */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Detailed Marking Breakdown & Memorandum:
                </h4>

                {questions.map((q, idx) => {
                  const userAns = (selectedAnswers[q.id] || '').trim();
                  const isCorrect = userAns.toLowerCase() === q.correctAnswer.trim().toLowerCase();

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs sm:text-sm font-bold text-slate-800">
                          Q{idx + 1}. {q.prompt}
                        </div>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs shrink-0">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Correct</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-600 font-bold text-xs shrink-0">
                            <XCircle className="w-4 h-4 text-rose-500" />
                            <span>Incorrect</span>
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-400 font-medium">Your Answer: </span>
                          <span className="font-bold text-slate-800">{userAns || 'None'}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                          <span className="text-emerald-700 font-medium">Official Memo: </span>
                          <span className="font-bold text-emerald-900">{q.correctAnswer}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 leading-relaxed">
                        <span className="font-bold text-slate-800">Memorandum Explanation: </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Retry & Close Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setRevealedHints({});
                    setIsCompleted(false);
                    setCurrentIndex(0);
                    setSecondsElapsed(0);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reattempt Quiz</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
