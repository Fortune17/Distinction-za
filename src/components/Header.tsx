import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  User,
  Users,
  BookOpenCheck,
  Shield,
  ChevronDown,
  Award,
  HardDrive,
} from 'lucide-react';
import { LearnerProfile, PhaseId } from '../types/curriculum';
import { UserRole, UserStore } from '../services/userStore';
import { PHASES, getPhaseForGrade } from '../data/curriculumData';
import { DistinctionAppIcon } from './DistinctionAppIcon';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  profile: LearnerProfile;
  currentRole: UserRole;
  isOnline: boolean;
  cachedLessonsCount: number;
  onRoleChange: (role: UserRole) => void;
  onGradeChange: (grade: number) => void;
  onOpenProfile: () => void;
  onOpenAITutor: () => void;
  onOpenOfflineVault: () => void;
  onOpenStudyRoom?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentRole,
  isOnline,
  cachedLessonsCount,
  onRoleChange,
  onGradeChange,
  onOpenProfile,
  onOpenAITutor,
  onOpenOfflineVault,
  onOpenStudyRoom,
}) => {
  const [showGradeMenu, setShowGradeMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const currentPhase = PHASES.find((p) => p.id === profile.phase) || PHASES[3];
  const isFoundation = profile.grade <= 3;

  const handleToggleDataSaver = () => {
    UserStore.toggleLowDataMode();
    onOpenProfile(); // Trigger re-render
  };

  const handleToggleSound = () => {
    UserStore.toggleSound();
    onOpenProfile();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner for Low-Data or South African Identity */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-700 text-white text-xs py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium truncate">
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          ></span>
          <span className="truncate">Distinction ZA — South African CAPS Curriculum • Dac Technologies</span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Network & Offline Vault Indicator */}
          <button
            onClick={onOpenOfflineVault}
            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-bold transition-colors ${
              !isOnline
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-black/20 hover:bg-black/30 text-white'
            }`}
            title="Open Offline Revision Vault"
          >
            {!isOnline ? <WifiOff className="w-3 h-3 text-slate-950" /> : <HardDrive className="w-3 h-3 text-emerald-300" />}
            <span>{!isOnline ? 'Offline Mode' : `Offline Vault (${cachedLessonsCount})`}</span>
          </button>

          <button
            onClick={handleToggleDataSaver}
            title={profile.lowDataMode ? 'Low-Data Mode Active (Saving mobile data)' : 'Standard Data Mode'}
            className="flex items-center gap-1 text-[11px] bg-black/20 hover:bg-black/30 px-2 py-0.5 rounded-md transition-colors"
          >
            {profile.lowDataMode ? <WifiOff className="w-3 h-3 text-amber-300" /> : <Wifi className="w-3 h-3 text-emerald-300" />}
            <span className="hidden sm:inline">{profile.lowDataMode ? 'Low-Data (Active)' : 'Data Saver'}</span>
          </button>
          <button
            onClick={handleToggleSound}
            title={profile.soundEnabled ? 'Audio Narrations On' : 'Audio Narrations Muted'}
            className="p-1 hover:bg-black/20 rounded transition-colors"
          >
            {profile.soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-300" /> : <VolumeX className="w-3.5 h-3.5 text-slate-300" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <DistinctionAppIcon size={42} className="shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                Distinction <span className="text-amber-500 font-black">ZA</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                CAPS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden md:block">
              Learn Today. Improve Tomorrow. Achieve Your Distinction.
            </p>
          </div>
        </div>

        {/* Grade Selector & Phase Tag */}
        <div className="relative">
          <button
            onClick={() => setShowGradeMenu(!showGradeMenu)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all shadow-xs ${
              isFoundation
                ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                : profile.phase === 'fet'
                ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100'
                : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-left leading-tight">
              <div className="font-bold flex items-center gap-1">
                Grade {profile.grade}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[10px] font-medium text-slate-500 truncate max-w-[90px] sm:max-w-none">
                {currentPhase.name.replace(' Phase', '')}
              </div>
            </div>
          </button>

          {/* Grade Dropdown Menu */}
          {showGradeMenu && (
            <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                Select South African School Grade
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {PHASES.map((phase) => (
                  <div key={phase.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[11px] font-bold text-slate-600 mb-1 flex items-center justify-between">
                      <span>{phase.name}</span>
                      <span className="text-[10px] text-slate-400">{phase.subtitle}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {phase.grades.map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            onGradeChange(g);
                            setShowGradeMenu(false);
                          }}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                            profile.grade === g
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300'
                          }`}
                        >
                          Grade {g}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls: Streak, AI Tutor, Role, Profile */}
        <div className="flex items-center gap-2">
          {/* Study Streak */}
          <div
            title={`${profile.studyStreakDays} Day South African Study Streak! Keep going for your Distinction!`}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 text-xs font-bold shrink-0"
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
            <span>{profile.studyStreakDays}</span>
            <span className="hidden sm:inline text-[11px] font-medium text-orange-600">days</span>
          </div>

          {/* Webapp Install Button */}
          <PWAInstallButton variant="header" />

          {/* Virtual Study Room / Lounge Button */}
          {onOpenStudyRoom && (
            <button
              onClick={onOpenStudyRoom}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-700/20 transition-all transform active:scale-95"
              title={`Join Grade ${profile.grade} Virtual Study Lounge`}
            >
              <Users className="w-4 h-4 text-emerald-300" />
              <span className="hidden lg:inline">Study Lounge</span>
              <span className="lg:hidden">Lounge</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          )}

          {/* AI Tutor "Zola" Button */}
          <button
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Ask AI Tutor</span>
            <span className="sm:hidden">Zola AI</span>
          </button>

          {/* Role Portal Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              {currentRole === 'learner' && <User className="w-3.5 h-3.5 text-emerald-600" />}
              {currentRole === 'parent' && <Users className="w-3.5 h-3.5 text-blue-600" />}
              {currentRole === 'teacher' && <BookOpenCheck className="w-3.5 h-3.5 text-purple-600" />}
              {currentRole === 'admin' && <Shield className="w-3.5 h-3.5 text-rose-600" />}
              <span className="capitalize hidden md:inline">{currentRole}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Switch Portal View
                </div>
                {(['learner', 'parent', 'teacher', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                      currentRole === r ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {r === 'learner' && <User className="w-4 h-4 text-emerald-600" />}
                    {r === 'parent' && <Users className="w-4 h-4 text-blue-600" />}
                    {r === 'teacher' && <BookOpenCheck className="w-4 h-4 text-purple-600" />}
                    {r === 'admin' && <Shield className="w-4 h-4 text-rose-600" />}
                    <div>
                      <div className="capitalize">{r} Portal</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {r === 'learner' && 'Grades 1–12 Learning'}
                        {r === 'parent' && 'Guardian Oversight & POPIA'}
                        {r === 'teacher' && 'Class & Curriculum'}
                        {r === 'admin' && 'System Management'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile / Settings Button */}
          <button
            onClick={onOpenProfile}
            title="Learner Profile & Goals"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200 transition-colors shrink-0"
          >
            {profile.name.charAt(0)}
          </button>
        </div>
      </div>
    </header>
  );
};
