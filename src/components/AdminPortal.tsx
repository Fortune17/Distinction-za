import React, { useState } from 'react';
import {
  Shield,
  Plus,
  BookOpen,
  FileQuestion,
  CheckCircle,
  Database,
  Activity,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import { Topic, Lesson, Question } from '../types/curriculum';
import { CurriculumStore } from '../services/curriculumStore';
import { ALL_SUBJECTS } from '../data/curriculumData';

interface AuditLog {
  id: string;
  action: string;
  itemTitle: string;
  adminUser: string;
  timestamp: string;
}

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: '1',
    action: 'VERIFIED_CAPS_LESSON',
    itemTitle: 'Differential Calculus: Derivatives & Cubic Functions (Gr 12)',
    adminUser: 'dactech-admin@distinction.co.za',
    timestamp: '2026-10-18 09:30',
  },
  {
    id: '2',
    action: 'PUBLISHED_QUESTION_BANK',
    itemTitle: 'DBE NSC Nov 2023 Physics Mechanics Question Set',
    adminUser: 'curriculum-lead@distinction.co.za',
    timestamp: '2026-10-17 14:15',
  },
  {
    id: '3',
    action: 'UPDATED_PREREQUISITE_RULES',
    itemTitle: 'Fractions Diagnostic Mapping for Grade 5 & 8 Algebra',
    adminUser: 'diagnostic-engine@dactech.co.za',
    timestamp: '2026-10-16 11:00',
  },
];

export const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'audit_log' | 'system_stats'>('curriculum');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Topic Form
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicGrade, setNewTopicGrade] = useState(12);
  const [newTopicSubject, setNewTopicSubject] = useState('fet_core_maths');
  const [newTopicTerm, setNewTopicTerm] = useState<1 | 2 | 3 | 4>(1);
  const [newTopicCaps, setNewTopicCaps] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');

  // New Question Form
  const [newQPльPrompt, setNewQPrompt] = useState('');
  const [newQGrade, setNewQGrade] = useState(12);
  const [newQSubject, setNewQSubject] = useState('fet_core_maths');
  const [newQAnswer, setNewQAnswer] = useState('');
  const [newQExplanation, setNewQExplanation] = useState('');
  const [newQGapTag, setNewQGapTag] = useState('');

  const topics = CurriculumStore.getTopics();
  const lessons = CurriculumStore.getLessons();
  const questions = CurriculumStore.getQuestions();

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const topic: Topic = {
      id: `top_custom_${Date.now()}`,
      subjectId: newTopicSubject,
      grade: newTopicGrade,
      term: newTopicTerm,
      title: newTopicTitle.trim(),
      description: newTopicDesc.trim() || 'Verified CAPS Curriculum Topic',
      capsReference: newTopicCaps.trim() || `CAPS Grade ${newTopicGrade} Curriculum Statement`,
      learningObjectives: ['Master fundamental CAPS concepts for this section'],
      totalLessons: 1,
    };

    CurriculumStore.addTopic(topic);

    const log: AuditLog = {
      id: Date.now().toString(),
      action: 'CREATED_CAPS_TOPIC',
      itemTitle: topic.title,
      adminUser: 'admin@distinction.co.za',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setAuditLogs((prev) => [log, ...prev]);

    setShowAddTopicModal(false);
    setNewTopicTitle('');
    setNotification(`Successfully published topic: "${topic.title}" into curriculum database.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQPльPrompt.trim() || !newQAnswer.trim()) return;

    const q: Question = {
      id: `q_custom_${Date.now()}`,
      topicId: 'top_fet_g12_calculus',
      subjectId: newQSubject,
      grade: newQGrade,
      difficulty: 'exam-standard',
      type: 'short-answer',
      prompt: newQPльPrompt.trim(),
      correctAnswer: newQAnswer.trim(),
      explanation: newQExplanation.trim() || 'Verified step-by-step CAPS memorandum.',
      hints: ['Review your standard definitions and working steps.'],
      prerequisiteGapTag: newQGapTag.trim() || undefined,
      source: 'Educator Verified Assessment Bank',
      marks: 3,
    };

    CurriculumStore.addQuestion(q);

    const log: AuditLog = {
      id: Date.now().toString(),
      action: 'ADDED_ASSESSMENT_QUESTION',
      itemTitle: q.prompt.substring(0, 45) + '...',
      adminUser: 'admin@distinction.co.za',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setAuditLogs((prev) => [log, ...prev]);

    setShowAddQuestionModal(false);
    setNewQPrompt('');
    setNewQAnswer('');
    setNotification('Successfully added question to assessment bank!');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator & Content Review Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Curriculum Architecture & Content Management
          </h1>
          <p className="text-rose-100/80 text-xs sm:text-sm max-w-xl">
            Update CAPS topics, publish verified lessons, configure assessment questions without rewriting code, and audit administrative actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddTopicModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-rose-950 font-bold text-xs sm:text-sm shadow-md hover:bg-rose-50 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-rose-600" />
            <span>Add CAPS Topic</span>
          </button>
          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-800/60 hover:bg-rose-800/80 text-white font-bold text-xs sm:text-sm border border-rose-400/30 transition-colors shrink-0"
          >
            <FileQuestion className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 gap-2 shadow-2xs">
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'curriculum'
              ? 'bg-rose-50 text-rose-900 border border-rose-200'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4 text-rose-600" />
          <span>Curriculum Database ({topics.length} Topics, {lessons.length} Lessons)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit_log')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'audit_log'
              ? 'bg-rose-50 text-rose-900 border border-rose-200'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-4 h-4 text-rose-600" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Curriculum Management */}
      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Published Curriculum Topics (Grades 1–12):
            </h3>

            <div className="divide-y divide-slate-100">
              {topics.map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                        Grade {t.grade} • Term {t.term}
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-slate-800">{t.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{t.capsReference}</div>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                    Live in Production
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Audit Log */}
      {activeTab === 'audit_log' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Administrative Audit Trail (POPIA & CAPS Compliance):
          </h3>
          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800">
                    <span className="font-mono text-rose-700">{log.action}: </span>
                    {log.itemTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Authorised by {log.adminUser}</div>
                </div>
                <div className="font-mono text-slate-400 text-[11px] shrink-0">{log.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Topic */}
      {showAddTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add New CAPS Topic</h3>
            <form onSubmit={handleAddTopic} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Topic Title:</label>
                <input
                  type="text"
                  required
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="e.g. Euclidean Geometry: Circle Theorems"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Grade:</label>
                  <select
                    aria-label="Grade"
                    value={newTopicGrade}
                    onChange={(e) => setNewTopicGrade(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Subject:</label>
                  <select
                    aria-label="Subject"
                    value={newTopicSubject}
                    onChange={(e) => setNewTopicSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    {ALL_SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Term:</label>
                  <select
                    aria-label="Term"
                    value={newTopicTerm}
                    onChange={(e) => setNewTopicTerm(parseInt(e.target.value) as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    <option value={1}>Term 1</option>
                    <option value={2}>Term 2</option>
                    <option value={3}>Term 3</option>
                    <option value={4}>Term 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">CAPS Reference Citation:</label>
                <input
                  type="text"
                  value={newTopicCaps}
                  onChange={(e) => setNewTopicCaps(e.target.value)}
                  placeholder="e.g. DBE CAPS Mathematics Statement Section 3.4"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTopicModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Publish Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Question */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Assessment Question</h3>
            <form onSubmit={handleAddQuestion} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Question Prompt:</label>
                <textarea
                  required
                  rows={2}
                  value={newQPльPrompt}
                  onChange={(e) => setNewQPrompt(e.target.value)}
                  placeholder="e.g. Calculate the derivative of f(x) = 4x^3 - 2x + 5"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Correct Answer:</label>
                  <input
                    type="text"
                    required
                    value={newQAnswer}
                    onChange={(e) => setNewQAnswer(e.target.value)}
                    placeholder="e.g. 12x^2 - 2"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Prerequisite Gap Tag:</label>
                  <input
                    type="text"
                    value={newQGapTag}
                    onChange={(e) => setNewQGapTag(e.target.value)}
                    placeholder="e.g. Power Rule Exponents"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Memorandum Explanation:</label>
                <textarea
                  rows={2}
                  value={newQExplanation}
                  onChange={(e) => setNewQExplanation(e.target.value)}
                  placeholder="Step by step derivation per DBE marking guidelines."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
