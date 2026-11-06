import React, { useState } from 'react';
import {
  X,
  FileText,
  Award,
  BookOpen,
  Clock,
  ExternalLink,
  Download,
  CheckCircle,
  HelpCircle,
  Calculator,
  ChevronDown,
  Sparkles,
  Printer,
} from 'lucide-react';
import { PastPaperResource, LearnerProfile } from '../types/curriculum';
import { PAST_PAPER_RESOURCES, ALL_SUBJECTS } from '../data/curriculumData';
import { calculateAPS, SubjectMark } from '../utils/apsCalculator';
import { FullQuestionPaper } from '../types/fullPaper';
import { GRADE_12_FULL_PAPERS } from '../data/grade12FullPapers';
import { DistinctionAppIcon } from './DistinctionAppIcon';

interface NSCExamRoomProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onLaunchTimedExam: (subjectId: string, questionIds?: string[], paperTitle?: string) => void;
  onOpenFullPaper?: (paper: FullQuestionPaper, mode?: 'exam' | 'study' | 'print') => void;
}

export const NSCExamRoom: React.FC<NSCExamRoomProps> = ({
  isOpen,
  onClose,
  profile,
  onLaunchTimedExam,
  onOpenFullPaper,
}) => {
  const [activeTab, setActiveTab] = useState<'full_papers' | 'past_papers' | 'formula_sheet' | 'aps_calculator'>('full_papers');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const [showFormulaSheetCategory, setShowFormulaSheetCategory] = useState<'maths' | 'physics'>('maths');

  // Dynamic APS calculator adjustments in state
  const [simulatedMarks, setSimulatedMarks] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    profile.selectedSubjectIds.forEach((id) => {
      initial[id] = profile.currentMarks[id] || 70;
    });
    return initial;
  });

  if (!isOpen) return null;

  const pastPapers = PAST_PAPER_RESOURCES.filter((p) => {
    if (selectedSubjectFilter !== 'all' && p.subjectId !== selectedSubjectFilter) return false;
    if (selectedYearFilter !== 'all' && p.year !== parseInt(selectedYearFilter)) return false;
    return true;
  });

  // Calculate simulated APS
  const subjectMarksForAPS: SubjectMark[] = profile.selectedSubjectIds.map((subId) => {
    const s = ALL_SUBJECTS.find((sub) => sub.id === subId);
    return {
      subjectName: s?.name || subId,
      percentage: simulatedMarks[subId] || 70,
      isLifeOrientation: s?.code === 'FET-LO',
    };
  });
  const apsResult = calculateAPS(subjectMarksForAPS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <DistinctionAppIcon size={42} className="shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg">
                  National Senior Certificate (NSC) Exam Room
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-200">
                  Grade 10–12 Matric
                </span>
              </div>
              <p className="text-[11px] text-purple-200/80">
                Official Department of Basic Education (DBE) Past Papers & Formulas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 gap-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('full_papers')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 shrink-0 transition-colors ${
              activeTab === 'full_papers'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span className="font-extrabold">Full 150-Mark Papers</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-black px-1.5 py-0.5 rounded-full border border-amber-300">
              Grade 12
            </span>
          </button>

          <button
            onClick={() => setActiveTab('past_papers')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 shrink-0 transition-colors ${
              activeTab === 'past_papers'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-600" />
            <span>DBE Past Papers & Memos</span>
          </button>

          <button
            onClick={() => setActiveTab('formula_sheet')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 shrink-0 transition-colors ${
              activeTab === 'formula_sheet'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Official CAPS Formula Sheets</span>
          </button>

          <button
            onClick={() => setActiveTab('aps_calculator')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 shrink-0 transition-colors ${
              activeTab === 'aps_calculator'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Target APS & Distinction Tracker</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50">
          {/* TAB 0: FULL 150-MARK EXAMINATION PAPERS */}
          {activeTab === 'full_papers' && (
            <div className="space-y-5">
              {/* Featured Banner */}
              <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-purple-500/30 shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                        ★ Authentic Matric Standard
                      </span>
                      <span className="text-xs text-purple-200">150 Marks • 3 Hours</span>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight">
                      Complete Grade 12 National Senior Certificate (NSC) Question Papers
                    </h3>
                    <p className="text-xs text-purple-200/80 max-w-2xl leading-relaxed">
                      Practice with full 150-mark papers exactly as administered by the Department of Basic Education (DBE). Features realistic 3-hour exam timing, integrated CAPS formula sheets, rough scratchpad, and tick-by-tick marking memorandums!
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenFullPaper && onOpenFullPaper(GRADE_12_FULL_PAPERS[0], 'exam')}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Take 2024 Maths P1 Exam</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Question Papers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {GRADE_12_FULL_PAPERS.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between hover:border-purple-400 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200 text-[11px]">
                          {paper.year} {paper.session}
                        </span>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                          {paper.totalMarks} Marks
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                          {paper.subjectName}
                        </h4>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          {paper.officialCode}
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Questions:</span>
                          <span className="text-slate-900 font-bold">{paper.questions.length} Full Questions</span>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                          <span>Exam Duration:</span>
                          <span className="text-slate-900 font-bold">{paper.timeAllowedMinutes / 60} Hours</span>
                        </div>
                        <div className="flex items-center justify-between font-semibold">
                          <span>Formula Sheet:</span>
                          <span className="text-emerald-700 font-bold capitalize">Included ({paper.formulaSheetCategory})</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        <span className="font-bold text-slate-600 block mb-1">Key Curriculum Topics:</span>
                        <div className="flex flex-wrap gap-1">
                          {paper.questions.slice(0, 4).map((q) => (
                            <span
                              key={q.questionNumber}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                            >
                              {q.topicTag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => onOpenFullPaper && onOpenFullPaper(paper, 'exam')}
                        className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Start Timed Exam ({paper.timeAllowedMinutes / 60}h)</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onOpenFullPaper && onOpenFullPaper(paper, 'study')}
                          className="py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Study Memo</span>
                        </button>

                        <button
                          onClick={() => onOpenFullPaper && onOpenFullPaper(paper, 'print')}
                          className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Print Paper</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: PAST PAPERS & MEMORANDUMS */}
          {activeTab === 'past_papers' && (
            <div className="space-y-4">
              {/* Year Filters & Subject Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
                {/* Year Pill Filters */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'All Years (2023–2025)', count: PAST_PAPER_RESOURCES.length },
                    { id: '2025', label: '2025 Practice', count: PAST_PAPER_RESOURCES.filter(p => p.year === 2025).length },
                    { id: '2024', label: '2024 NSC', count: PAST_PAPER_RESOURCES.filter(p => p.year === 2024).length },
                    { id: '2023', label: '2023 NSC', count: PAST_PAPER_RESOURCES.filter(p => p.year === 2023).length },
                  ].map((yr) => (
                    <button
                      key={yr.id}
                      onClick={() => setSelectedYearFilter(yr.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedYearFilter === yr.id
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {yr.label} ({yr.count})
                    </button>
                  ))}
                </div>

                {/* Filter by Subject */}
                <select
                  aria-label="Filter Past Papers by Subject"
                  value={selectedSubjectFilter}
                  onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 shrink-0"
                >
                  <option value="all">All Subjects</option>
                  <option value="fet_core_maths">Mathematics (Core)</option>
                  <option value="fet_phys_sci">Physical Sciences</option>
                  <option value="fet_life_sci">Life Sciences</option>
                  <option value="fet_accounting">Accounting</option>
                  <option value="fet_math_lit">Mathematical Literacy</option>
                  <option value="fet_business">Business Studies</option>
                </select>
              </div>

              {/* Past Papers List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastPapers.map((paper) => {
                  const subject = ALL_SUBJECTS.find((s) => s.id === paper.subjectId);
                  const qCount = paper.practiceQuestionIds?.length || 0;

                  return (
                    <div
                      key={paper.id}
                      className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-purple-300 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200">
                            {subject?.name || 'CAPS Subject'}
                          </span>
                          <span
                            className={`font-black text-[11px] px-2 py-0.5 rounded-md ${
                              paper.year === 2025
                                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                : paper.year === 2024
                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}
                          >
                            {paper.year} {paper.session}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {paper.title}
                        </h4>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {paper.memoSummary}
                        </p>

                        <div className="pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            High-Yield Topics Tested:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {paper.keyTopicsTested.map((topic, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        {qCount > 0 && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>{qCount} Exam Practice Questions Ready</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                        <a
                          href={paper.officialDbeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-800 py-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>DBE Official Portal</span>
                        </a>

                        <button
                          onClick={() => onLaunchTimedExam(paper.subjectId, paper.practiceQuestionIds, paper.title)}
                          className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Practice {paper.year} Exam Questions</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CAPS FORMULA SHEETS */}
          {activeTab === 'formula_sheet' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFormulaSheetCategory('maths')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    showFormulaSheetCategory === 'maths'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  📐 Mathematics Paper 1 & 2 Information Sheet
                </button>
                <button
                  onClick={() => setShowFormulaSheetCategory('physics')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    showFormulaSheetCategory === 'physics'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  ⚡ Physical Sciences Data & Formula Tables
                </button>
              </div>

              {showFormulaSheetCategory === 'maths' ? (
                <div className="space-y-4">
                  {/* Algebra & Calculus */}
                  <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-3">
                    <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                      Algebra, Series & Differential Calculus (Paper 1)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Quadratic Formula:</div>
                        <div>x = (-b ± √(b² - 4ac)) / (2a)</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Calculus First Principles:</div>
                        <div>f'(x) = lim[h→0] (f(x+h) - f(x)) / h</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Geometric Series Sum to Infinity:</div>
                        <div>S_∞ = a / (1 - r),  for -1 &lt; r &lt; 1</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Future Value Annuity (Sinking Fund):</div>
                        <div>F = x [((1 + i)ⁿ - 1) / i]</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Present Value Annuity (Bond Loan):</div>
                        <div>P = x [(1 - (1 + i)⁻ⁿ) / i]</div>
                      </div>
                    </div>
                  </div>

                  {/* Trigonometry & Analytical Geometry */}
                  <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-3">
                    <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                      Analytical Geometry & Trigonometry (Paper 2)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Circle with centre (a, b):</div>
                        <div>(x - a)² + (y - b)² = r²</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Compound Angles:</div>
                        <div>cos(α ± β) = cos α cos β ∓ sin α sin β</div>
                        <div>sin(α ± β) = sin α cos β ± cos α sin β</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Double Angles:</div>
                        <div>sin 2α = 2 sin α cos α</div>
                        <div>cos 2α = cos²α - sin²α = 2cos²α - 1 = 1 - 2sin²α</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                    Physical Sciences Constants & Formulas (Paper 1 Physics)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-500 mb-1">Newton's Laws & Friction:</div>
                      <div>F_net = m·a</div>
                      <div>f_k = μ_k · N</div>
                      <div>w = m·g (where g = 9.8 m/s²)</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-500 mb-1">Work, Energy & Power:</div>
                      <div>W = F · Δx · cos θ</div>
                      <div>W_net = ΔE_k = 1/2 m v_f² - 1/2 m v_i²</div>
                      <div>P_ave = F · v_ave</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-500 mb-1">Doppler Effect:</div>
                      <div>f_L = ((v ± v_L) / (v ∓ v_s)) · f_s</div>
                      <div>(v_sound in air ≈ 340 m/s)</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-500 mb-1">Electric Circuits:</div>
                      <div>V = I · R</div>
                      <div>emf (ε) = I(R_ext + r_int)</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TARGET APS & DISTINCTION TRACKER */}
          {activeTab === 'aps_calculator' && (
            <div className="space-y-6">
              <div className="p-5 bg-purple-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-purple-300">
                    Calculated Admission Point Score
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-1">
                    {apsResult.totalAps} Points
                  </div>
                  <div className="text-xs text-purple-200 font-semibold mt-1">
                    Qualification: {apsResult.qualificationLevel} • {apsResult.distinctionsCount} Distinctions (Level 7)
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-2xl border border-white/20 text-xs max-w-sm">
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>South African University Eligibility:</span>
                  </div>
                  <p className="text-purple-100">{apsResult.universityEligibilitySummary}</p>
                </div>
              </div>

              {/* Subject Mark Adjusters */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-800">
                  Simulate Target Marks (See how higher percentages boost your APS):
                </h4>

                <div className="space-y-3">
                  {profile.selectedSubjectIds.map((subId) => {
                    const subject = ALL_SUBJECTS.find((s) => s.id === subId);
                    const currentVal = simulatedMarks[subId] || 70;
                    return (
                      <div
                        key={subId}
                        className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {subject?.name || subId}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            CAPS Code: {subject?.code}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="30"
                            max="100"
                            value={currentVal}
                            onChange={(e) =>
                              setSimulatedMarks((prev) => ({
                                ...prev,
                                [subId]: parseInt(e.target.value),
                              }))
                            }
                            className="w-36 sm:w-48 accent-purple-600 cursor-pointer"
                          />
                          <div className="text-right w-16">
                            <span
                              className={`text-base font-black font-mono ${
                                currentVal >= 80 ? 'text-amber-600' : 'text-slate-800'
                              }`}
                            >
                              {currentVal}%
                            </span>
                            <span className="block text-[10px] text-slate-400 font-bold">
                              {currentVal >= 80 ? 'Distinction!' : `Level ${Math.floor(currentVal / 10)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
