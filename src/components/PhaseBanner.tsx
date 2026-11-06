import React from 'react';
import {
  Sparkles,
  Volume2,
  Calendar,
  Award,
  Target,
  FileText,
  AlertCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { LearnerProfile, PhaseId } from '../types/curriculum';
import { PHASES } from '../data/curriculumData';
import { SpeechService } from '../services/speechService';
import { calculateAPS, SubjectMark } from '../utils/apsCalculator';
import { ALL_SUBJECTS } from '../data/curriculumData';

interface PhaseBannerProps {
  profile: LearnerProfile;
  onOpenExamRoom?: () => void;
  onOpenGapAnalysis?: () => void;
  onOpenFoundationWidget?: () => void;
}

export const PhaseBanner: React.FC<PhaseBannerProps> = ({
  profile,
  onOpenExamRoom,
  onOpenGapAnalysis,
  onOpenFoundationWidget,
}) => {
  const currentPhase = PHASES.find((p) => p.id === profile.phase) || PHASES[0];

  // Foundation Phase (Grades 1-3)
  if (profile.phase === 'foundation') {
    const handleReadWelcome = () => {
      SpeechService.speak(
        `Welcome to Grade ${profile.grade}! You are a superstar learner. Today we have fun counting, phonics sounds, and stories for you. Let us learn together!`
      );
    };

    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-5 sm:p-6 text-white shadow-lg shadow-orange-500/15 mb-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Foundation Phase • Grade {profile.grade} Superstars</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-foundation">
              Welcome, {profile.name}! 🌟
            </h1>
            <p className="text-amber-50 text-sm max-w-xl">
              Learn numbers, letter sounds, and fun South African stories with big friendly pictures and audio guides.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleReadWelcome}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Listen to Welcome</span>
            </button>
            <button
              onClick={onOpenFoundationWidget}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-900/30 hover:bg-amber-900/40 text-white font-bold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-transform active:scale-95"
            >
              <span>🎮 Play Interactive Phonics & Math</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Intermediate Phase (Grades 4-6)
  if (profile.phase === 'intermediate') {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-5 sm:p-6 text-white shadow-lg shadow-emerald-600/15 mb-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-200" />
              <span>Intermediate Phase • Grade {profile.grade}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Build Your Strong Learning Foundation, {profile.name}!
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Master fractions, natural science experiments, South African geography, and reading comprehension step by step.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/15 backdrop-blur-xs p-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3 border-r border-white/20">
              <div className="text-lg font-bold text-amber-300">{profile.selectedSubjectIds.length}</div>
              <div className="text-[10px] text-emerald-100">Subjects</div>
            </div>
            <div className="text-center px-3">
              <div className="text-lg font-bold text-emerald-200">{profile.studyStreakDays} Days</div>
              <div className="text-[10px] text-emerald-100">Study Streak</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Senior Phase (Grades 7-9)
  if (profile.phase === 'senior') {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-5 sm:p-6 text-white shadow-lg shadow-indigo-700/15 mb-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-blue-300" />
              <span>Senior Phase (GET) • Grade {profile.grade}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Pre-High School Mastery & Diagnostic Gap Review
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              Strengthen algebra, EMS accounting, and natural sciences so you are fully prepared for Grade 10 subject choice.
            </p>
          </div>

          <button
            onClick={onOpenGapAnalysis}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-colors shrink-0"
          >
            <AlertCircle className="w-4 h-4 text-amber-300" />
            <span>Foundational Gap Check</span>
          </button>
        </div>
      </div>
    );
  }

  // Further Education & Training (FET / Grades 10-12 / Matric)
  const subjectMarks: SubjectMark[] = profile.selectedSubjectIds.map((subId) => {
    const s = ALL_SUBJECTS.find((sub) => sub.id === subId);
    return {
      subjectName: s?.name || subId,
      percentage: profile.currentMarks[subId] || 65,
      isLifeOrientation: s?.code === 'FET-LO',
    };
  });

  const aps = calculateAPS(subjectMarks);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 p-5 sm:p-7 text-white shadow-xl shadow-purple-900/20 mb-6 border border-purple-500/20">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Further Education & Training • Grade {profile.grade}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              <span>Matric Finals Countdown</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Target Your Distinctions & University APS, {profile.name}
          </h1>

          <p className="text-purple-200/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            CAPS-aligned exam preparation for South African high schoolers. Work through official DBE past papers, practice with step-by-step marking memorandums, and lock in your Bachelor Degree qualification.
          </p>
        </div>

        {/* Live APS & Distinction Snapshot */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center gap-4 w-full sm:w-auto">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Current APS</div>
              <div className="text-2xl font-black text-white flex items-baseline gap-1">
                {aps.totalAps} <span className="text-xs text-purple-300 font-normal">pts</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Distinctions</div>
              <div className="text-2xl font-black text-amber-300 flex items-baseline gap-1">
                {aps.distinctionsCount} <span className="text-xs text-amber-200 font-normal">Level 7s</span>
              </div>
            </div>
          </div>

          {onOpenExamRoom && (
            <button
              onClick={onOpenExamRoom}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>DBE Exam Room & Past Papers</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
