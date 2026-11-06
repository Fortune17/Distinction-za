/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PhaseBanner } from './components/PhaseBanner';
import { LearnerDashboard } from './components/LearnerDashboard';
import { LessonDetailView } from './components/LessonDetailView';
import { PracticeQuizModal } from './components/PracticeQuizModal';
import { AITutorModal } from './components/AITutorModal';
import { FoundationInteractiveWidget } from './components/FoundationInteractiveWidget';
import { NSCExamRoom } from './components/NSCExamRoom';
import { ParentPortal } from './components/ParentPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { AdminPortal } from './components/AdminPortal';
import { OnboardingModal } from './components/OnboardingModal';

import { LearnerProfile, Lesson, Topic } from './types/curriculum';
import { UserRole, UserStore } from './services/userStore';
import { CurriculumStore } from './services/curriculumStore';
import { OfflineCacheService } from './services/offlineCacheService';
import { OfflineRevisionVault } from './components/OfflineRevisionVault';
import { FullQuestionPaper } from './types/fullPaper';
import { GRADE_12_FULL_PAPERS } from './data/grade12FullPapers';
import { FullQuestionPaperModal } from './components/FullQuestionPaperModal';
import { DistinctionAppIcon } from './components/DistinctionAppIcon';
import { VirtualStudyRoomModal } from './components/VirtualStudyRoomModal';

export default function App() {
  const [profile, setProfile] = useState<LearnerProfile>(() => UserStore.getProfile());
  const [currentRole, setCurrentRole] = useState<UserRole>(() => UserStore.getRole());
  const [isStudyRoomOpen, setIsStudyRoomOpen] = useState(false);

  // Offline Caching & Network State
  const [isSystemOnline, setIsSystemOnline] = useState<boolean>(() => OfflineCacheService.isOnline());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [isOfflineVaultOpen, setIsOfflineVaultOpen] = useState(false);
  const [cachedLessonsCount, setCachedLessonsCount] = useState<number>(() => OfflineCacheService.getCacheStats().count);

  // Effective online status
  const effectiveOnline = isSystemOnline && !isSimulatedOffline;

  // Listen to network status changes & pre-seed cache on initial mount
  useEffect(() => {
    const unsubscribe = OfflineCacheService.subscribeNetworkStatus((online) => {
      setIsSystemOnline(online);
    });

    // Automatically cache initial verified lessons if cache is empty
    if (OfflineCacheService.getCachedIndex().length === 0) {
      const initialLessons = CurriculumStore.getLessons();
      OfflineCacheService.cacheBatch(initialLessons);
      setCachedLessonsCount(initialLessons.length);
    } else {
      setCachedLessonsCount(OfflineCacheService.getCachedIndex().length);
    }

    return () => unsubscribe();
  }, []);

  // Navigation & Modals
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; topic?: Topic } | null>(null);
  const [quizTopic, setQuizTopic] = useState<Topic | null>(null);
  const [isExamModeQuiz, setIsExamModeQuiz] = useState(false);
  const [examQuestionIds, setExamQuestionIds] = useState<string[] | undefined>(undefined);
  const [examPaperTitle, setExamPaperTitle] = useState<string | undefined>(undefined);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<string>('');
  const [isFoundationWidgetOpen, setIsFoundationWidgetOpen] = useState(false);
  const [isNSCExamRoomOpen, setIsNSCExamRoomOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Full Question Papers (Grade 12 NSC 150-mark papers)
  const [selectedFullPaper, setSelectedFullPaper] = useState<FullQuestionPaper | null>(null);
  const [fullPaperMode, setFullPaperMode] = useState<'exam' | 'study' | 'print'>('exam');
  const [isFullPaperModalOpen, setIsFullPaperModalOpen] = useState(false);

  const handleOpenFullPaper = (paper: FullQuestionPaper, mode: 'exam' | 'study' | 'print' = 'exam') => {
    setSelectedFullPaper(paper);
    setFullPaperMode(mode);
    setIsFullPaperModalOpen(true);
  };

  // Sync profile changes to UserStore
  const handleUpdateProfile = (updated: LearnerProfile) => {
    setProfile(updated);
    UserStore.saveProfile(updated);
  };

  const handleGradeChange = (newGrade: number) => {
    const updated = UserStore.updateGrade(newGrade);
    setProfile(updated);
    setActiveLesson(null);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    UserStore.setRole(role);
    setActiveLesson(null);
  };

  const handleOpenLesson = (lesson: Lesson, topic?: Topic) => {
    setActiveLesson({ lesson, topic });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (topic: Topic, examMode = false) => {
    setQuizTopic(topic);
    setIsExamModeQuiz(examMode);
    setExamQuestionIds(undefined);
    setExamPaperTitle(undefined);
  };

  const handleAskTutor = (contextText: string) => {
    setTutorContext(contextText);
    setIsAITutorOpen(true);
  };

  const handleLaunchTimedExamFromNSC = (subjectId: string, questionIds?: string[], paperTitle?: string) => {
    const topics = CurriculumStore.getTopics(profile.grade, subjectId);
    if (topics.length > 0) {
      setQuizTopic(topics[0]);
    } else {
      // General grade question practice
      setQuizTopic(null);
    }
    setExamQuestionIds(questionIds);
    setExamPaperTitle(paperTitle);
    setIsExamModeQuiz(true);
    setIsNSCExamRoomOpen(false);
  };

  return (
    <div
      className={`min-h-screen bg-slate-100/80 text-slate-900 font-sans ${
        profile.lowDataMode ? 'transition-none' : ''
      }`}
    >
      {/* Global Header */}
      <Header
        profile={profile}
        currentRole={currentRole}
        isOnline={effectiveOnline}
        cachedLessonsCount={cachedLessonsCount}
        onRoleChange={handleRoleChange}
        onGradeChange={handleGradeChange}
        onOpenProfile={() => setIsOnboardingOpen(true)}
        onOpenAITutor={() => {
          setTutorContext('');
          setIsAITutorOpen(true);
        }}
        onOpenOfflineVault={() => setIsOfflineVaultOpen(true)}
        onOpenStudyRoom={() => setIsStudyRoomOpen(true)}
      />

      {/* Network Interruption Alert Banner */}
      {!effectiveOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping"></span>
              <span>
                {isSimulatedOffline
                  ? 'Simulated Offline Mode Active'
                  : 'Internet Connection Interrupted'}
                {' — '}
                Distinction ZA has switched to Offline Mode. You can continue reading your saved CAPS lessons and revision notes without data!
              </span>
            </div>
            <button
              onClick={() => setIsOfflineVaultOpen(true)}
              className="px-3 py-1 bg-slate-950 text-white rounded-lg text-[11px] font-black hover:bg-slate-900 transition-colors shrink-0"
            >
              Open Offline Vault ({cachedLessonsCount} Lessons)
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-5 pb-16">
        {/* LEARNER PORTAL VIEW */}
        {currentRole === 'learner' && (
          <div>
            {!activeLesson ? (
              <>
                {/* Phase & Grade Adaptive Banner */}
                <PhaseBanner
                  profile={profile}
                  onOpenExamRoom={() => setIsNSCExamRoomOpen(true)}
                  onOpenGapAnalysis={() => {
                    handleAskTutor(
                      `Please run a diagnostic foundational gap check for Grade ${profile.grade} curriculum.`
                    );
                  }}
                  onOpenFoundationWidget={() => setIsFoundationWidgetOpen(true)}
                />

                {/* Main Learner Dashboard */}
                <LearnerDashboard
                  profile={profile}
                  onOpenLesson={handleOpenLesson}
                  onStartQuiz={(topic) => handleStartQuiz(topic, false)}
                  onAskTutor={handleAskTutor}
                  onOpenExamRoom={() => setIsNSCExamRoomOpen(true)}
                  onOpenFoundationWidget={() => setIsFoundationWidgetOpen(true)}
                  onOpenFullPaper={handleOpenFullPaper}
                  onOpenStudyRoom={() => setIsStudyRoomOpen(true)}
                />
              </>
            ) : (
              /* Active Lesson Detail View */
              <LessonDetailView
                lesson={activeLesson.lesson}
                topic={activeLesson.topic}
                profile={profile}
                isOffline={!effectiveOnline}
                onBack={() => setActiveLesson(null)}
                onStartQuiz={(topicId) => {
                  const t = CurriculumStore.getTopicById(topicId);
                  if (t) handleStartQuiz(t, false);
                }}
                onAskTutor={handleAskTutor}
              />
            )}
          </div>
        )}

        {/* PARENT / GUARDIAN PORTAL VIEW */}
        {currentRole === 'parent' && (
          <ParentPortal profile={profile} onUpdateProfile={handleUpdateProfile} />
        )}

        {/* TEACHER PORTAL VIEW */}
        {currentRole === 'teacher' && <TeacherPortal />}

        {/* ADMINISTRATOR PORTAL VIEW */}
        {currentRole === 'admin' && <AdminPortal />}
      </main>

      {/* MODALS */}
      {/* 1. AI Tutor "Zola" Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        profile={profile}
        currentSubject={activeLesson?.lesson.subjectId}
        currentTopic={activeLesson?.topic?.title}
        contextLesson={tutorContext}
        isOffline={!effectiveOnline}
      />

      {/* 2. Practice & Assessment Quiz Modal */}
      <PracticeQuizModal
        isOpen={quizTopic !== null || isExamModeQuiz}
        onClose={() => {
          setQuizTopic(null);
          setIsExamModeQuiz(false);
          setExamQuestionIds(undefined);
          setExamPaperTitle(undefined);
        }}
        topic={quizTopic || undefined}
        grade={profile.grade}
        subjectId={quizTopic?.subjectId || 'fet_core_maths'}
        isExamMode={isExamModeQuiz}
        specificQuestionIds={examQuestionIds}
        customTitle={examPaperTitle}
        onAskTutorHint={(qText) => {
          setTutorContext(`Question: ${qText}`);
          setIsAITutorOpen(true);
        }}
      />

      {/* 3. Foundation Interactive Game Widget (Grades 1-3) */}
      <FoundationInteractiveWidget
        isOpen={isFoundationWidgetOpen}
        onClose={() => setIsFoundationWidgetOpen(false)}
        grade={profile.grade}
      />

      {/* 4. NSC Exam Room (Grades 10-12) */}
      <NSCExamRoom
        isOpen={isNSCExamRoomOpen}
        onClose={() => setIsNSCExamRoomOpen(false)}
        profile={profile}
        onLaunchTimedExam={handleLaunchTimedExamFromNSC}
        onOpenFullPaper={handleOpenFullPaper}
      />

      {/* 5. Onboarding & Profile Customization Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        profile={profile}
        onSaveProfile={handleUpdateProfile}
      />

      {/* 6. Offline Revision Vault Modal */}
      <OfflineRevisionVault
        isOpen={isOfflineVaultOpen}
        onClose={() => {
          setIsOfflineVaultOpen(false);
          setCachedLessonsCount(OfflineCacheService.getCacheStats().count);
        }}
        activeGrade={profile.grade}
        isSimulatedOffline={isSimulatedOffline}
        onToggleSimulateOffline={() => setIsSimulatedOffline((prev) => !prev)}
        onOpenLesson={handleOpenLesson}
      />

      {/* 7. Grade 12 Full Question Paper (150 Marks) Modal */}
      <FullQuestionPaperModal
        isOpen={isFullPaperModalOpen}
        onClose={() => setIsFullPaperModalOpen(false)}
        paper={selectedFullPaper}
        initialMode={fullPaperMode}
        onAskTutor={handleAskTutor}
      />

      {/* 8. Virtual Study Room (Focus Sessions & Peer Cohort) */}
      <VirtualStudyRoomModal
        isOpen={isStudyRoomOpen}
        onClose={() => setIsStudyRoomOpen(false)}
        profile={profile}
        onAskTutor={handleAskTutor}
        onOpenQuiz={(subjectId) => {
          setIsStudyRoomOpen(false);
          const topics = CurriculumStore.getTopics(profile.grade, subjectId);
          if (topics.length > 0) {
            handleStartQuiz(topics[0], false);
          } else {
            setIsExamModeQuiz(true);
          }
        }}
      />

      {/* Distinction ZA Official Footer */}
      <footer className="border-t border-slate-200 bg-white/90 py-8 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <DistinctionAppIcon size={38} className="shrink-0" />
            <div className="space-y-0.5">
              <div className="font-extrabold text-sm text-slate-900">
                Distinction <span className="text-amber-500 font-black">ZA</span> — South African Learning Platform, Grades 1–12
              </div>
              <p className="text-slate-500 text-[11px]">
                Developed by <strong>Dac Technologies</strong> • Tagline: Learn Today. Improve Tomorrow. Achieve Your Distinction.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <span>Official DBE CAPS Alignment</span>
            <span>•</span>
            <span>POPIA Child Privacy Compliant</span>
            <span>•</span>
            <span>Optimized for Low-Data Mobile Networks</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
