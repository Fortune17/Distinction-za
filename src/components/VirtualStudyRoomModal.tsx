import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Users,
  Clock,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Award,
  Send,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Filter,
  GraduationCap,
  Bell,
  Headphones,
  BookOpen,
  Share2,
} from 'lucide-react';
import { LearnerProfile } from '../types/curriculum';
import {
  OnlineStudent,
  StudyCheer,
  StudyRoomMessage,
  FocusTimerPreset,
  StudyRoomSessionStats,
} from '../types/studyRoom';
import {
  StudyRoomService,
  FOCUS_PRESETS,
  SOUTH_AFRICAN_CHEERS,
} from '../services/studyRoomService';
import { focusSounds } from '../utils/focusSoundService';

interface VirtualStudyRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onAskTutor?: (question: string) => void;
  onOpenQuiz?: (subjectId?: string) => void;
}

export const VirtualStudyRoomModal: React.FC<VirtualStudyRoomModalProps> = ({
  isOpen,
  onClose,
  profile,
  onAskTutor,
  onOpenQuiz,
}) => {
  // Timer State
  const [selectedPreset, setSelectedPreset] = useState<FocusTimerPreset>(FOCUS_PRESETS[0]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(FOCUS_PRESETS[0].focusMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionMode, setSessionMode] = useState<'focus' | 'break'>('focus');
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Audio & Ambience State
  const [isAmbientOn, setIsAmbientOn] = useState<boolean>(false);
  const [ambientVolume, setAmbientVolume] = useState<number>(0.3);
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState<boolean>(profile.soundEnabled);

  // Peer & Room State
  const [activeRoomFilter, setActiveRoomFilter] = useState<string>('all');
  const [students, setStudents] = useState<OnlineStudent[]>([]);
  const [messages, setMessages] = useState<StudyRoomMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [recentCheers, setRecentCheers] = useState<StudyCheer[]>([]);
  const [floatingCheer, setFloatingCheer] = useState<StudyCheer | null>(null);

  // User's Personal Goal
  const [userGoal, setUserGoal] = useState<string>('');
  const [isGoalCompleted, setIsGoalCompleted] = useState<boolean>(false);
  const [sessionStats, setSessionStats] = useState<StudyRoomSessionStats>(StudyRoomService.getSessionStats());

  // Active Tab inside Study Room Modal: 'students' | 'chat' | 'stats'
  const [activeTab, setActiveTab] = useState<'students' | 'chat' | 'stats'>('students');

  const timerRef = useRef<number | null>(null);

  // Initialize room data on open or grade change
  useEffect(() => {
    if (isOpen) {
      const peers = StudyRoomService.getOnlineStudents(profile.grade, profile);
      setStudents(peers);
      setMessages(StudyRoomService.getInitialMessages(profile.grade));
      setUserGoal(StudyRoomService.getSavedGoal() || profile.learningGoal || '');
      setSessionStats(StudyRoomService.getSessionStats());
    } else {
      // Pause ambient audio when closing
      if (isAmbientOn) {
        focusSounds.stopAmbientFocus();
        setIsAmbientOn(false);
      }
    }
  }, [isOpen, profile.grade, profile.name]);

  // Handle Focus Countdown Timer Interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, sessionMode, selectedPreset]);

  // Session Completed Transition
  const handleSessionComplete = () => {
    if (soundAlertsEnabled) {
      focusSounds.playSessionComplete();
    }

    if (sessionMode === 'focus') {
      // Transition to break
      const updatedStats = StudyRoomService.recordCompletedSession(selectedPreset.focusMinutes);
      setSessionStats(updatedStats);
      setCompletedCycles((c) => c + 1);
      setSessionMode('break');
      setTimeLeftSeconds(selectedPreset.breakMinutes * 60);

      // Add system message
      const cheerMsg: StudyRoomMessage = {
        id: `sys_break_${Date.now()}`,
        studentName: 'Study Lounge Clock',
        text: `Ding! 🎉 Focus block completed (${selectedPreset.focusMinutes}m). Take a ${selectedPreset.breakMinutes}-minute stretch & hydration break!`,
        timestamp: 'Just now',
        isSystem: true,
      };
      setMessages((prev) => [cheerMsg, ...prev]);
    } else {
      // Transition back to focus
      setSessionMode('focus');
      setTimeLeftSeconds(selectedPreset.focusMinutes * 60);
      if (soundAlertsEnabled) {
        focusSounds.playSessionStart();
      }
    }
  };

  const handleToggleTimer = () => {
    if (!isRunning) {
      if (soundAlertsEnabled) {
        focusSounds.playSessionStart();
      }
    }
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeftSeconds(
      sessionMode === 'focus'
        ? selectedPreset.focusMinutes * 60
        : selectedPreset.breakMinutes * 60
    );
  };

  const handleSkipSession = () => {
    if (sessionMode === 'focus') {
      setSessionMode('break');
      setTimeLeftSeconds(selectedPreset.breakMinutes * 60);
    } else {
      setSessionMode('focus');
      setTimeLeftSeconds(selectedPreset.focusMinutes * 60);
    }
    setIsRunning(false);
  };

  const handleSelectPreset = (preset: FocusTimerPreset) => {
    setSelectedPreset(preset);
    setIsRunning(false);
    setSessionMode('focus');
    setTimeLeftSeconds(preset.focusMinutes * 60);
  };

  const handleToggleAmbient = () => {
    if (isAmbientOn) {
      focusSounds.stopAmbientFocus();
      setIsAmbientOn(false);
    } else {
      focusSounds.startAmbientFocus(ambientVolume);
      setIsAmbientOn(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setAmbientVolume(newVol);
    focusSounds.setAmbientVolume(newVol);
  };

  const handleSendCheer = (reactionText: string, emoji: string, targetPeerName?: string) => {
    if (soundAlertsEnabled) {
      focusSounds.playCheerReaction();
    }

    const newCheer: StudyCheer = {
      id: `cheer_${Date.now()}`,
      fromStudentName: profile.name,
      reaction: reactionText,
      reactionEmoji: emoji,
      target: targetPeerName || `Grade ${profile.grade} Cohort`,
      timestamp: 'Just now',
    };

    setRecentCheers((prev) => [newCheer, ...prev.slice(0, 4)]);
    setFloatingCheer(newCheer);
    setTimeout(() => setFloatingCheer(null), 2500);

    // Also append to room message board
    const cheerMsg: StudyRoomMessage = {
      id: `msg_cheer_${Date.now()}`,
      studentName: profile.name,
      text: `${reactionText} ${targetPeerName ? `to ${targetPeerName}` : 'sent to the whole study lounge!'}`,
      timestamp: 'Just now',
      badge: 'Cheer',
    };
    setMessages((prev) => [cheerMsg, ...prev]);
  };

  const handleSaveGoal = () => {
    StudyRoomService.saveGoal(userGoal);
    // Update current user student in roster
    setStudents((prev) =>
      prev.map((s) => (s.isCurrentUser ? { ...s, currentGoal: userGoal } : s))
    );
  };

  const handleToggleGoalCompleted = () => {
    const nextVal = !isGoalCompleted;
    setIsGoalCompleted(nextVal);
    if (nextVal) {
      if (soundAlertsEnabled) {
        focusSounds.playSessionComplete();
      }
      handleSendCheer('Completed Study Goal! 🎯', '🎯');
    }
    setStudents((prev) =>
      prev.map((s) => (s.isCurrentUser ? { ...s, isGoalCompleted: nextVal } : s))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: StudyRoomMessage = {
      id: `msg_${Date.now()}`,
      studentName: `${profile.name} (You)`,
      school: profile.schoolName || 'Distinction ZA Scholar',
      text: chatInput.trim(),
      timestamp: 'Just now',
      badge: `Grade ${profile.grade}`,
    };

    setMessages((prev) => [newMsg, ...prev]);
    setChatInput('');
  };

  if (!isOpen) return null;

  // Format time display
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalCurrentSeconds =
    sessionMode === 'focus'
      ? selectedPreset.focusMinutes * 60
      : selectedPreset.breakMinutes * 60;
  const progressPercent = Math.max(
    0,
    Math.min(100, ((totalCurrentSeconds - timeLeftSeconds) / totalCurrentSeconds) * 100)
  );

  // Filter students
  const filteredStudents =
    activeRoomFilter === 'all'
      ? students
      : students.filter((s) => s.subjectId.includes(activeRoomFilter));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      {/* Floating Cheer Pop Animation */}
      {floatingCheer && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-60 pointer-events-none animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 text-white font-black text-sm px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white/60">
            <span className="text-xl">{floatingCheer.reactionEmoji}</span>
            <span>{floatingCheer.fromStudentName}: {floatingCheer.reaction}</span>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white shrink-0">
              <Users className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Virtual Study Lounge
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                  Grade {profile.grade} Cohort 🇿🇦
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium">
                  {students.length} South African learners actively studying right now
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambient Sound Controller */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <button
                onClick={handleToggleAmbient}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold ${
                  isAmbientOn
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Lo-Fi Alpha Focus Beats (100% offline & low-data)"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{isAmbientOn ? 'Lo-Fi On' : 'Focus Beats'}</span>
              </button>

              {isAmbientOn && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ambientVolume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-14 accent-emerald-500 h-1"
                  title="Ambience Volume"
                />
              )}
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title={soundAlertsEnabled ? 'Chime sound alerts on' : 'Chime sound alerts muted'}
            >
              {soundAlertsEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-white transition-colors"
              title="Close Study Lounge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Study Room Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. Synchronized Shared Focus Session Timer Card */}
          <div className="bg-gradient-to-br from-slate-800/90 via-slate-800/60 to-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-700/80 shadow-xl relative overflow-hidden">
            {/* Background subtle radial glow */}
            <div
              className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 ${
                sessionMode === 'focus' ? 'bg-emerald-500' : 'bg-cyan-500'
              }`}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left / Center: Circular Countdown Display */}
              <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                  {/* SVG Circular Progress Ring */}
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      className="stroke-slate-700/60"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      className={`transition-all duration-1000 ease-linear ${
                        sessionMode === 'focus' ? 'stroke-emerald-400' : 'stroke-cyan-400'
                      }`}
                      strokeWidth="7"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - progressPercent / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  {/* Inner Timer Digits */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className={`text-xs uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full mb-1 ${
                        sessionMode === 'focus'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {sessionMode === 'focus' ? '🎯 DEEP FOCUS' : '☕ REST BREAK'}
                    </span>
                    <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white">
                      {timeFormatted}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium mt-1">
                      Cycle {completedCycles + 1} of 4 • {selectedPreset.name}
                    </span>
                  </div>
                </div>

                {/* Primary Action Controls */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={handleResetTimer}
                    className="p-2.5 rounded-2xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleToggleTimer}
                    className={`px-6 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                      isRunning
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                        : sessionMode === 'focus'
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4 fill-slate-950" />
                        <span>Pause Session</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-slate-950" />
                        <span>{timeLeftSeconds === totalCurrentSeconds ? 'Start Session' : 'Resume'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSkipSession}
                    className="p-2.5 rounded-2xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95"
                    title={sessionMode === 'focus' ? 'Skip to Break' : 'Skip to Focus'}
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right: Presets & Focus Session Intent */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Select Focus Duration
                    </span>
                    <span className="text-[11px] text-slate-400">Synchronized for Grade {profile.grade}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {FOCUS_PRESETS.map((p) => {
                      const isSel = selectedPreset.id === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPreset(p)}
                          className={`p-3 rounded-2xl text-left border transition-all ${
                            isSel
                              ? 'bg-emerald-500/15 border-emerald-500/60 text-white shadow-xs'
                              : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs">{p.name}</span>
                            <span
                              className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                isSel ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {p.focusMinutes}m + {p.breakMinutes}m
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{p.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Session Goal Input */}
                <div className="bg-slate-900/70 p-3.5 rounded-2xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Your Target Goal for this Session:</span>
                    </span>
                    <button
                      onClick={handleToggleGoalCompleted}
                      className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg transition-colors ${
                        isGoalCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isGoalCompleted ? 'Goal Achieved! ✓' : 'Mark Completed'}</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userGoal}
                      onChange={(e) => setUserGoal(e.target.value)}
                      placeholder="e.g. Master Grade 12 Calculus Question 8 & 9 past paper"
                      className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={handleSaveGoal}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                    >
                      Update
                    </button>
                  </div>
                </div>

                {/* Co-Studying Quick Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-400">Quick Study Actions:</span>
                  {onOpenQuiz && (
                    <button
                      onClick={() => onOpenQuiz()}
                      className="px-2.5 py-1 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-400" />
                      <span>Practice Quiz</span>
                    </button>
                  )}
                  {onAskTutor && (
                    <button
                      onClick={() =>
                        onAskTutor(`I am currently studying in the Grade ${profile.grade} virtual study room. Can you give me 3 high-yield CAPS revision questions for my active session?`)
                      }
                      className="px-2.5 py-1 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Ask Tutor Zola</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. South African Co-Studying Cheer Bar */}
          <div className="bg-slate-800/40 rounded-2xl p-3 border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Send Instant Study Encouragement:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {SOUTH_AFRICAN_CHEERS.map((cheer) => (
                <button
                  key={cheer.text}
                  onClick={() => handleSendCheer(cheer.text, cheer.emoji)}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 hover:border-slate-600 transition-all active:scale-95 shadow-2xs"
                  title={cheer.label}
                >
                  {cheer.text}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Section Navigation Tabs: Active Learners vs Silent Chat & Tips vs Stats */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
                  activeTab === 'students'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Active Learners ({filteredStudents.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Motivation Wall & Tips</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
                  activeTab === 'stats'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Today’s Focus Stats</span>
              </button>
            </div>

            {/* Subject Filter (when viewing students tab) */}
            {activeTab === 'students' && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={activeRoomFilter}
                  onChange={(e) => setActiveRoomFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="all">All CAPS Subjects</option>
                  <option value="math">Mathematics</option>
                  <option value="phys">Physical Sciences</option>
                  <option value="life">Life Sciences</option>
                  <option value="accounting">Accounting</option>
                </select>
              </div>
            )}
          </div>

          {/* TAB 1: ACTIVE LEARNERS COHORT GRID */}
          {activeTab === 'students' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in">
              {filteredStudents.map((st) => (
                <div
                  key={st.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    st.isCurrentUser
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md shadow-emerald-950/30 ring-1 ring-emerald-500/40'
                      : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-11 h-11 rounded-2xl ${st.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md`}
                        >
                          {st.name.charAt(0)}
                        </div>
                        {/* Status Ping Dot */}
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{st.name}</span>
                          {st.isCurrentUser && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px]">
                              YOU
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-400 font-medium">
                          {st.school} • <span className="text-slate-300">{st.province}</span>
                        </div>

                        <div className="pt-1 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-700/80 text-[10px] font-bold text-amber-300">
                            {st.subjectName}
                          </span>
                          <span className="text-[11px] text-orange-400 font-bold flex items-center gap-0.5">
                            <Flame className="w-3 h-3 fill-orange-400" />
                            {st.streakDays}d streak
                          </span>
                        </div>
                      </div>
                    </div>

                    {!st.isCurrentUser && (
                      <button
                        onClick={() => handleSendCheer('Keep Pushing! 💪', '💪', st.name)}
                        className="px-2.5 py-1 rounded-xl bg-slate-700/60 hover:bg-emerald-600 hover:text-white text-slate-300 text-[11px] font-bold transition-all active:scale-95 shrink-0"
                        title="Send encouragement"
                      >
                        Cheer 👏
                      </button>
                    )}
                  </div>

                  {/* Student's Current Goal & Message */}
                  <div className="mt-3 pt-2.5 border-t border-slate-700/60 text-xs space-y-1">
                    <div className="text-slate-300 italic text-[11.5px] leading-relaxed">
                      "{st.statusMessage}"
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="text-slate-400 font-bold">Session Goal:</span>
                      <span className="text-slate-200 line-clamp-1">{st.currentGoal}</span>
                      {st.isGoalCompleted && (
                        <span className="text-emerald-400 font-bold ml-auto shrink-0">
                          ✓ Done
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: MOTIVATION WALL & SILENT CHAT */}
          {activeTab === 'chat' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-800/40 rounded-2xl p-3 border border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
                <span>
                  💬 Share encouragement, CAPS exam formulas, and quick study tips with Grade {profile.grade} peers.
                </span>
                <span className="font-bold text-emerald-400">Moderated & Focused</span>
              </div>

              {/* Message List */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3 rounded-2xl border ${
                      m.isSystem
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-800/70 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{m.studentName}</span>
                        {m.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-700 text-amber-300 text-[10px] font-bold">
                            {m.badge}
                          </span>
                        )}
                        {m.school && <span className="text-slate-400 hidden sm:inline">({m.school})</span>}
                      </div>
                      <span className="text-slate-500 text-[10px]">{m.timestamp}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Send Message Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Post a study tip, formula question, or word of motivation..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: FOCUS STATS & MILESTONES */}
          {activeTab === 'stats' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Focus Time
                  </span>
                  <div className="text-3xl font-black text-white font-mono">
                    {sessionStats.totalFocusMinutes} min
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold">Recorded Today</span>
                </div>

                <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Sessions Completed
                  </span>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    {sessionStats.sessionsCompletedToday + completedCycles}
                  </div>
                  <span className="text-[11px] text-slate-400">Pomodoros / Sprints</span>
                </div>

                <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Distinction Streak
                  </span>
                  <div className="text-3xl font-black text-orange-400 font-mono flex items-center justify-center gap-1">
                    <Flame className="w-6 h-6 fill-orange-400" />
                    <span>{profile.studyStreakDays} Days</span>
                  </div>
                  <span className="text-[11px] text-orange-300 font-bold">Keep the fire burning!</span>
                </div>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>How Group Study Boosts Matric Results:</span>
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>Shared Accountability:</strong> Studying alongside peers keeps you in the chair during difficult CAPS exercises.
                  </li>
                  <li>
                    <strong>Timed Sprints:</strong> Working in 25-minute or 45-minute blocks replicates the discipline needed in final 3-hour exam papers.
                  </li>
                  <li>
                    <strong>Low-Data Resilience:</strong> The virtual study room uses negligible mobile bandwidth so you can study even on limited data bundles.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900 px-5 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Study Room active • Grade {profile.grade} CAPS Cohort</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSendCheer('Distinction Loading 🚀', '🚀')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <span>Cheer Cohort 🚀</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
