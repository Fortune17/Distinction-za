import React, { useState } from 'react';
import {
  BookOpenCheck,
  Plus,
  Users,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
  BarChart3,
  Award,
  ChevronRight,
  FilePlus,
} from 'lucide-react';
import { ClassGroup, Topic, Lesson, Question } from '../types/curriculum';
import { CurriculumStore } from '../services/curriculumStore';
import { ALL_SUBJECTS } from '../data/curriculumData';

const INITIAL_CLASSES: ClassGroup[] = [
  {
    id: 'cls_1',
    code: 'GR12-MATHS-2026',
    name: 'Grade 12A Core Mathematics',
    grade: 12,
    subjectId: 'fet_core_maths',
    teacherName: 'Mr. K. Sithole',
    schoolName: 'Pretoria Technical High School',
    learnerCount: 38,
    assignedTopicIds: ['top_fet_g12_calculus', 'top_fet_g12_fin_maths'],
  },
  {
    id: 'cls_2',
    code: 'GR12-PHYS-2026',
    name: 'Grade 12B Physical Sciences',
    grade: 12,
    subjectId: 'fet_phys_sci',
    teacherName: 'Mrs. N. Dlamini',
    schoolName: 'Soweto Secondary School',
    learnerCount: 32,
    assignedTopicIds: ['top_fet_g12_physics_newton', 'top_fet_g12_organic_chem'],
  },
  {
    id: 'cls_3',
    code: 'GR5-MATHS-2026',
    name: 'Grade 5C Mathematics',
    grade: 5,
    subjectId: 'inter_maths',
    teacherName: 'Ms. A. van der Merwe',
    schoolName: 'Gauteng Primary Academy',
    learnerCount: 29,
    assignedTopicIds: ['top_int_g5_fractions'],
  },
];

export const TeacherPortal: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>(INITIAL_CLASSES);
  const [selectedClass, setSelectedClass] = useState<ClassGroup>(INITIAL_CLASSES[0]);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignedNotice, setAssignedNotice] = useState<string | null>(null);

  // New Class Form State
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState(12);
  const [newClassSubject, setNewClassSubject] = useState('fet_core_maths');
  const [newClassSchool, setNewClassSchool] = useState('');

  // Selected topic to assign
  const [topicToAssign, setTopicToAssign] = useState('');

  const topics = CurriculumStore.getTopics(selectedClass.grade, selectedClass.subjectId);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const code = `GR${newClassGrade}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newCls: ClassGroup = {
      id: Date.now().toString(),
      code,
      name: newClassName.trim(),
      grade: newClassGrade,
      subjectId: newClassSubject,
      teacherName: 'Educator Account',
      schoolName: newClassSchool || 'South African CAPS School',
      learnerCount: 1,
      assignedTopicIds: [],
    };

    setClasses((prev) => [newCls, ...prev]);
    setSelectedClass(newCls);
    setShowCreateClassModal(false);
    setNewClassName('');
  };

  const handleAssignTask = (topicId: string) => {
    if (!selectedClass.assignedTopicIds.includes(topicId)) {
      const updated = {
        ...selectedClass,
        assignedTopicIds: [...selectedClass.assignedTopicIds, topicId],
      };
      setSelectedClass(updated);
      setClasses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setAssignedNotice(`Assigned topic to ${selectedClass.name}! Learners will see this in their study plan.`);
      setTimeout(() => setAssignedNotice(null), 4000);
    }
    setShowAssignModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>South African Teacher & Educator Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Curriculum Class Management & Assignments
          </h1>
          <p className="text-purple-100/80 text-xs sm:text-sm max-w-xl">
            Create learner classes, assign CAPS lessons and topic quizzes, and identify collective knowledge bottlenecks across your school.
          </p>
        </div>

        <button
          onClick={() => setShowCreateClassModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-purple-950 font-bold text-xs sm:text-sm shadow-md hover:bg-purple-50 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 text-purple-600" />
          <span>Create New Class</span>
        </button>
      </div>

      {assignedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{assignedNotice}</span>
        </div>
      )}

      {/* Class Selector Bar */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {classes.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClass(cls)}
            className={`p-4 rounded-2xl border text-left shrink-0 min-w-[240px] transition-all ${
              selectedClass.id === cls.id
                ? 'bg-purple-50 border-purple-400 shadow-xs'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-purple-700">Grade {cls.grade}</span>
              <span className="font-mono text-slate-400 text-[10px]">{cls.code}</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm truncate">{cls.name}</div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
              <span>{cls.learnerCount} Learners</span>
              <span>{cls.assignedTopicIds.length} Assigned</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Class Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Overview & Assignments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedClass.name}</h3>
                <p className="text-xs text-slate-500">
                  {selectedClass.schoolName} • Class Code: <span className="font-mono font-bold text-purple-700">{selectedClass.code}</span>
                </p>
              </div>

              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Assign Lesson / Quiz</span>
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Currently Assigned Curriculum Tasks ({selectedClass.assignedTopicIds.length}):
              </div>

              {selectedClass.assignedTopicIds.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-xs text-slate-400">
                  No topics assigned yet. Click "Assign Lesson / Quiz" above to assign work to learners.
                </div>
              ) : (
                selectedClass.assignedTopicIds.map((tId) => {
                  const topic = CurriculumStore.getTopicById(tId);
                  return (
                    <div
                      key={tId}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-slate-800 text-xs sm:text-sm">
                          {topic ? topic.title : tId}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {topic?.capsReference || 'CAPS Core Topic'}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Active Homework
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Class Analytics Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Class Performance Analytics</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="text-xs font-bold text-purple-800">Class Average Score</div>
                <div className="text-2xl font-black text-purple-900 font-mono mt-0.5">71.4%</div>
                <div className="text-[11px] text-purple-700 mt-1">Target: 80% (Distinction Level)</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800">Homework Submission Rate</div>
                <div className="text-2xl font-black text-emerald-900 font-mono mt-0.5">88%</div>
                <div className="text-[11px] text-emerald-700 mt-1">28 of 32 learners submitted</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="text-xs font-bold text-amber-800">Top Identified Class Gap</div>
                <div className="font-bold text-amber-950 text-xs mt-1">
                  Algebraic Fractions & Negative Signs
                </div>
                <div className="text-[11px] text-amber-800 mt-0.5">
                  6 learners made recurring sign errors.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Create Class */}
      {showCreateClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Create New Class</h3>
            <form onSubmit={handleCreateClass} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Class Name:</label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. Grade 11A Mathematics"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Grade:</label>
                  <select
                    aria-label="Grade"
                    value={newClassGrade}
                    onChange={(e) => setNewClassGrade(parseInt(e.target.value))}
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
                    value={newClassSubject}
                    onChange={(e) => setNewClassSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    {ALL_SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">School Name:</label>
                <input
                  type="text"
                  value={newClassSchool}
                  onChange={(e) => setNewClassSchool(e.target.value)}
                  placeholder="e.g. Soweto Secondary School"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateClassModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Assign Lesson / Quiz */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Assign Topic to {selectedClass.name}
            </h3>
            <p className="text-xs text-slate-500">
              Select a verified CAPS curriculum topic from Grade {selectedClass.grade}:
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {topics.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-2xl border border-slate-200 hover:bg-purple-50 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-bold text-slate-800 text-xs">{t.title}</div>
                    <div className="text-[10px] text-slate-500">{t.capsReference}</div>
                  </div>
                  <button
                    onClick={() => handleAssignTask(t.id)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 shrink-0"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
