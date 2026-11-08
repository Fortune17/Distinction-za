import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  PlayCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Calculator,
  Compass,
  FileText,
  Calendar,
  Users,
  Flame,
} from 'lucide-react';
import { LearnerProfile, Topic, Lesson, Subject } from '../types/curriculum';
import { CurriculumStore } from '../services/curriculumStore';
import { ALL_SUBJECTS } from '../data/curriculumData';
import { StudyStreakHeatmap } from './StudyStreakHeatmap';
import { FullQuestionPaper } from '../types/fullPaper';
import { GRADE_12_FULL_PAPERS } from '../data/grade12FullPapers';
import { PWAInstallButton } from './PWAInstallButton';

interface LearnerDashboardProps {
  profile: LearnerProfile;
  onOpenLesson: (lesson: Lesson, topic?: Topic) => void;
  onStartQuiz: (topic: Topic) => void;
  onAskTutor: (context: string) => void;
  onOpenExamRoom?: () => void;
  onOpenFoundationWidget?: () => void;
  onOpenFullPaper?: (paper: FullQuestionPaper, mode?: 'exam' | 'study' | 'print') => void;
  onOpenStudyRoom?: () => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  profile,
  onOpenLesson,
  onStartQuiz,
  onAskTutor,
  onOpenExamRoom,
  onOpenFoundationWidget,
  onOpenFullPaper,
  onOpenStudyRoom,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    profile.selectedSubjectIds[0] || 'found_maths'
  );
  const [selectedTerm, setSelectedTerm] = useState<1 | 2 | 3 | 4>(1);

  // Available subjects for active grade
  const availableSubjects = ALL_SUBJECTS.filter((s) => s.grades.includes(profile.grade));
  const activeSubject =
    availableSubjects.find((s) => s.id === selectedSubjectId) || availableSubjects[0] || ALL_SUBJECTS[0];

  const topics = CurriculumStore.getTopics(profile.grade, activeSubject?.id);
  const attempts = CurriculumStore.getQuizAttempts().filter((a) => a.grade === profile.grade);
  const gaps = CurriculumStore.getDiagnosticKnowledgeGaps();

  // Calculate overall mastery
  const avgScore =
    attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.scorePercentage, 0) / attempts.length)
      : 74;

  const isFoundation = profile.grade <= 3;
  const isFET = profile.grade >= 10;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Daily Goal & Progress Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Goal Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Today’s Target Goal</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-base font-extrabold text-slate-900 leading-snug">
            {profile.learningGoal || 'Master Grade CAPS Content'}
          </div>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Daily Target Progress</span>
              <span className="text-emerald-700">65% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-600 h-2 rounded-full w-[65%]"></div>
            </div>
          </div>
        </div>

        {/* Assessment Mastery */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Overall Diagnostic Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">{avgScore}%</span>
            <span className="text-xs font-bold text-emerald-700">
              {avgScore >= 80 ? 'Distinction Level (Level 7) 🌟' : 'On Track to Distinction'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            {attempts.length > 0
              ? `Based on ${attempts.length} completed CAPS assessments`
              : 'Benchmark score based on baseline diagnostics'}
          </div>
        </div>

        {/* Personalised Recommendation Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-5 border border-emerald-200 shadow-2xs space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recommended Next Step</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm mt-1">
              {topics[0] ? topics[0].title : 'Continue CAPS Topic Revision'}
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              High-yield CAPS assessment topic for Term {selectedTerm}
            </div>
          </div>

          {topics[0] && (
            <button
              onClick={() => {
                const lessons = CurriculumStore.getLessons(topics[0].id);
                if (lessons[0]) onOpenLesson(lessons[0], topics[0]);
                else onStartQuiz(topics[0]);
              }}
              className="mt-2 text-xs font-black text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>Start recommended lesson</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Visual Study Streak & Mini-Calendar Heatmap Component */}
      <StudyStreakHeatmap grade={profile.grade} />

      {/* Virtual Study Room & Shared Focus Sessions Spotlight */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-5 sm:p-6 text-white border border-indigo-500/30 shadow-lg relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>VIRTUAL STUDY LOUNGE ACTIVE</span>
              </span>
              <span className="text-xs text-purple-200">Grade {profile.grade} Cohort 🇿🇦</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Co-Study with Fellow South African Students</span>
            </h3>

            <p className="text-xs text-purple-200/80 max-w-2xl leading-relaxed">
              Study alongside peers from across the country with a synchronized focus countdown timer (Pomodoro & Matric Exam Sprints), live peer encouragement cheers, and session goal accountability.
            </p>

            {/* Peer Preview Badges */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 border-2 border-slate-900 text-[11px] font-bold flex items-center justify-center text-white" title="Sipho (Pretoria Boys)">S</div>
                <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-slate-900 text-[11px] font-bold flex items-center justify-center text-white" title="Zanele (Durban Girls)">Z</div>
                <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-slate-900 text-[11px] font-bold flex items-center justify-center text-white" title="Keanu (Paul Roos)">K</div>
                <div className="w-7 h-7 rounded-full bg-amber-600 border-2 border-slate-900 text-[11px] font-bold flex items-center justify-center text-white" title="Anika (Afrikaanse Hoër)">A</div>
              </div>
              <span className="text-xs font-semibold text-emerald-300">
                +24 Grade {profile.grade} learners online now
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {onOpenStudyRoom && (
              <button
                onClick={onOpenStudyRoom}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Users className="w-4 h-4" />
                <span>Join Virtual Study Lounge</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Foundational Knowledge Gaps Alert (if any) */}
      {gaps.length > 0 && (
        <div className="bg-amber-50 rounded-3xl p-4 sm:p-5 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs sm:text-sm text-amber-950">
                Foundational Gap Alert: {gaps[0].gap}
              </div>
              <div className="text-xs text-amber-800">
                Our diagnostic engine flagged this prerequisite concept. Revisiting it before advanced topics will prevent mark loss!
              </div>
            </div>
          </div>
          <button
            onClick={() => onAskTutor(`I want to fix my foundational gap in: ${gaps[0].gap}. Can you explain it step by step with a South African example?`)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 shadow-xs"
          >
            Review Gap with Tutor Zola
          </button>
        </div>
      )}

      {/* Grade 12 Matric Examination Full Papers Spotlight (FET Phase) */}
      {isFET && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-purple-500/30 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                  ★ Grade 12 Matric Examination Suite
                </span>
                <span className="text-xs text-purple-200">Official 150-Mark Papers</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">
                Complete Full Question Papers with Marking Memorandums
              </h3>
              <p className="text-xs text-purple-200/80 max-w-2xl leading-relaxed">
                Take authentic 3-hour timed practice exams with real DBE mark allocations, integrated CAPS formula sheets, rough scratchpad, and tick-by-tick marking guidelines.
              </p>
            </div>

            {onOpenExamRoom && (
              <button
                onClick={onOpenExamRoom}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Open All Past Papers</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {GRADE_12_FULL_PAPERS.map((paper) => (
              <div
                key={paper.id}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/15 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-purple-300 font-bold mb-1">
                    <span>{paper.year} {paper.session}</span>
                    <span className="text-amber-300 font-black">{paper.totalMarks} Marks</span>
                  </div>
                  <div className="font-bold text-sm text-white leading-snug line-clamp-1">
                    {paper.subjectName.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-purple-200/70 font-mono mt-0.5">
                    {paper.questions.length} Questions • {paper.timeAllowedMinutes / 60}h Duration
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10">
                  <button
                    onClick={() => onOpenFullPaper && onOpenFullPaper(paper, 'exam')}
                    className="py-1.5 px-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs"
                  >
                    <Clock className="w-3 h-3" />
                    <span>Timed Exam</span>
                  </button>
                  <button
                    onClick={() => onOpenFullPaper && onOpenFullPaper(paper, 'study')}
                    className="py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Study Memo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Install Distinction ZA Webapp Banner */}
      <PWAInstallButton variant="banner" />

      {/* Subject Navigation Tabs for Active Grade */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Grade {profile.grade} CAPS Subjects:
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Only applicable subjects for Grade {profile.grade} are shown
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {availableSubjects.map((sub) => {
            const isSelected = sub.id === activeSubject?.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 transition-all shadow-2xs ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{sub.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {sub.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Term Selector & Topic Catalog */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{activeSubject?.name}</h3>
            <p className="text-xs text-slate-500 max-w-xl">{activeSubject?.description}</p>
          </div>

          {/* South African 4 School Terms */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl shrink-0">
            {([1, 2, 3, 4] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTerm(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTerm === t
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Term {t}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="space-y-4">
          {topics.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="font-bold text-slate-700 text-sm">
                No Topics Listed for Term {selectedTerm} in Grade {profile.grade}
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select another Term or use the AI Tutor to generate custom study plans and questions aligned with your syllabus.
              </p>
              <button
                onClick={() => onAskTutor(`Can you give me an overview of Grade ${profile.grade} ${activeSubject?.name} for Term ${selectedTerm}?`)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
              >
                Ask Zola for Term {selectedTerm} Syllabus
              </button>
            </div>
          ) : (
            topics.map((topic) => {
              const lessons = CurriculumStore.getLessons(topic.id);
              const questions = CurriculumStore.getQuestions(topic.id, profile.grade);

              return (
                <div
                  key={topic.id}
                  className="rounded-3xl border border-slate-200 p-5 hover:border-emerald-300 transition-all bg-white hover:shadow-xs space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                          Term {topic.term} • CAPS Verified
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {topic.capsReference}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {topic.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {topic.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {lessons.length > 0 ? (
                        <button
                          onClick={() => onOpenLesson(lessons[0], topic)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all transform active:scale-95"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Study Lesson</span>
                        </button>
                      ) : null}

                      <button
                        onClick={() => onStartQuiz(topic)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                      >
                        <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Practice Quiz</span>
                      </button>
                    </div>
                  </div>

                  {/* Learning Objectives Pills */}
                  {topic.learningObjectives.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                      <span className="text-[11px] font-bold text-slate-400 shrink-0 self-center">
                        Objectives:
                      </span>
                      {topic.learningObjectives.map((obj, oIdx) => (
                        <span
                          key={oIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px]"
                        >
                          ✓ {obj}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Prerequisites info */}
                  {topic.prerequisites && topic.prerequisites.length > 0 && (
                    <div className="text-[11px] text-amber-800 bg-amber-50/70 p-2 rounded-xl border border-amber-200/60 flex items-center gap-1.5">
                      <span className="font-bold">Prerequisite Knowledge:</span>
                      <span>{topic.prerequisites.join(', ')}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
