import React, { useState } from 'react';
import {
  Users,
  Shield,
  FileText,
  Clock,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  Lock,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { LearnerProfile } from '../types/curriculum';
import { CurriculumStore } from '../services/curriculumStore';
import { ALL_SUBJECTS } from '../data/curriculumData';

interface ParentPortalProps {
  profile: LearnerProfile;
  onUpdateProfile: (p: LearnerProfile) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [popiaConsent, setPopiaConsent] = useState(profile.guardianConsentGiven);
  const [reportGenerated, setReportGenerated] = useState(false);

  const attempts = CurriculumStore.getQuizAttempts();
  const gaps = CurriculumStore.getDiagnosticKnowledgeGaps();

  const handleToggleConsent = () => {
    const nextVal = !popiaConsent;
    setPopiaConsent(nextVal);
    onUpdateProfile({ ...profile, guardianConsentGiven: nextVal });
  };

  const handleDownloadReport = () => {
    setReportGenerated(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Portal Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Parent & Guardian Oversight Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Supporting {profile.name}’s Academic Journey
          </h1>
          <p className="text-blue-100/80 text-xs sm:text-sm max-w-xl">
            Track daily study habits, review topic mastery, and monitor foundational knowledge gaps in compliance with South African POPIA child privacy standards.
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-950 font-bold text-xs sm:text-sm shadow-md hover:bg-blue-50 transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>Export School Progress Report</span>
        </button>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Grade</div>
          <div className="text-2xl font-black text-slate-900 mt-1">Grade {profile.grade}</div>
          <div className="text-[11px] text-slate-500 capitalize">{profile.phase} Phase</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Study Streak</div>
          <div className="text-2xl font-black text-orange-600 mt-1">{profile.studyStreakDays} Days</div>
          <div className="text-[11px] text-orange-600 font-medium">Consecutive learning</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quizzes Completed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{attempts.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium">CAPS assessments</div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Child Privacy</div>
          <div className="text-2xl font-black text-blue-600 mt-1">POPIA</div>
          <div className="text-[11px] text-blue-600 font-medium">Consent Active</div>
        </div>
      </div>

      {/* Foundational Knowledge Gap Alert for Parents */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Identified Prerequisite Gaps (Recommended for Home Revision)</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Personalised Diagnostic Engine</span>
        </div>

        {gaps.length === 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No recurring foundational knowledge gaps detected! {profile.name} is performing solidly across prerequisites.</span>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-slate-600">
              When {profile.name} completed assessments, our diagnostic system flagged these foundational concepts needing reinforcement:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {gaps.map((g, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start justify-between"
                >
                  <div>
                    <div className="font-bold text-amber-900">{g.gap}</div>
                    <div className="text-[11px] text-amber-700 mt-0.5">
                      Flagged {g.occurrences} time{g.occurrences > 1 ? 's' : ''} during assessments
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                    Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subject Performance & Target Marks */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span>Subject Performance & Target Marks (Distinction Path)</span>
        </h3>

        <div className="space-y-3">
          {profile.selectedSubjectIds.map((subId) => {
            const subject = ALL_SUBJECTS.find((s) => s.id === subId);
            const current = profile.currentMarks[subId] || 65;
            const target = profile.targetMarks[subId] || 80;

            return (
              <div key={subId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-800">{subject?.name || subId}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">
                      Current: <strong className="text-slate-900">{current}%</strong>
                    </span>
                    <span className="text-emerald-700 font-bold">
                      Target: <strong>{target}%</strong>
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${Math.min(current, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPIA South African Privacy Controls */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900">
            Protection of Personal Information Act (POPIA) Guardian Controls
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          In strict compliance with the South African Protection of Personal Information Act (POPIA, Act 4 of 2013), Distinction ZA protects children's personal records. We do not collect unnecessary personal information from learners, and parents/guardians maintain full control over consent and progress visibility.
        </p>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-800">
              Parent/Guardian Consent for Educational Assessment
            </div>
            <div className="text-[11px] text-slate-500">
              Authorises Distinction ZA to track quiz performance and generate personalised study recommendations.
            </div>
          </div>

          <button
            onClick={handleToggleConsent}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              popiaConsent
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {popiaConsent ? 'Consent Granted' : 'Consent Revoked'}
          </button>
        </div>
      </div>
    </div>
  );
};
