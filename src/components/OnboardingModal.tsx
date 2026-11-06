import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Shield,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { LearnerProfile, SouthAfricanLanguage } from '../types/curriculum';
import { ALL_SUBJECTS, PHASES, getPhaseForGrade } from '../data/curriculumData';
import { UserStore } from '../services/userStore';
import { DistinctionAppIcon } from './DistinctionAppIcon';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onSaveProfile: (profile: LearnerProfile) => void;
}

const SA_LANGUAGES: SouthAfricanLanguage[] = [
  'English',
  'isiZulu',
  'Afrikaans',
  'isiXhosa',
  'Sesotho',
  'Sepedi',
  'Setswana',
  'Xitsonga',
  'siSwati',
  'Tshivenda',
  'isiNdebele',
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState(profile.grade);
  const [language, setLanguage] = useState<SouthAfricanLanguage>(profile.preferredLanguage);
  const [goal, setGoal] = useState(profile.learningGoal);
  const [guardianName, setGuardianName] = useState(profile.guardianName || '');
  const [guardianConsent, setGuardianConsent] = useState(profile.guardianConsentGiven);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(profile.selectedSubjectIds);

  if (!isOpen) return null;

  const phase = getPhaseForGrade(grade);
  const availableSubjects = ALL_SUBJECTS.filter((s) => s.grades.includes(grade));

  const handleGradeChange = (newG: number) => {
    setGrade(newG);
    const newPhase = getPhaseForGrade(newG);
    const validSubs = ALL_SUBJECTS.filter((s) => s.grades.includes(newG));
    // Auto-select core subjects
    setSelectedSubjects(validSubs.filter((s) => s.isCore).map((s) => s.id));
  };

  const toggleSubject = (subId: string) => {
    if (selectedSubjects.includes(subId)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((id) => id !== subId));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subId]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: LearnerProfile = {
      ...profile,
      name: name.trim() || 'Learner',
      grade,
      phase,
      selectedSubjectIds: selectedSubjects,
      preferredLanguage: language,
      learningGoal: goal.trim() || 'Achieve Academic Distinction',
      guardianName: guardianName.trim(),
      guardianConsentGiven: guardianConsent,
    };

    UserStore.saveProfile(updated);
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <DistinctionAppIcon size={40} className="shrink-0" />
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                Learner Profile & Academic Goals
              </h2>
              <p className="text-[11px] text-emerald-100">
                Customise your grade, CAPS subjects, and preferred language
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-50">
          {/* Name & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Learner Name:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                placeholder="e.g. Lethabo Ndlovu"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Current School Grade:
              </label>
              <select
                aria-label="Current School Grade"
                value={grade}
                onChange={(e) => handleGradeChange(parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-emerald-800"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    Grade {g} ({g <= 3 ? 'Foundation' : g <= 6 ? 'Intermediate' : g <= 9 ? 'Senior' : 'FET / Matric'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Language & Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Preferred Learning Language:
              </label>
              <select
                aria-label="Preferred Learning Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as SouthAfricanLanguage)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
              >
                {SA_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Distinction Goal:
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm"
                placeholder="e.g. Achieve 4 Distinctions for University"
              />
            </div>
          </div>

          {/* Subject Selection strictly filtered by grade */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Active CAPS Subjects for Grade {grade} (Select at least 1):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
              {availableSubjects.map((sub) => {
                const isSelected = selectedSubjects.includes(sub.id);
                return (
                  <button
                    type="button"
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`p-3 rounded-2xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div>{sub.name}</div>
                      <div className="text-[10px] text-slate-400">{sub.code}</div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guardian / POPIA Section for Children */}
          {grade <= 9 && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Parent / Guardian Involvement (South African POPIA Compliance)</span>
              </div>
              <p className="text-[11px] text-amber-800">
                To protect young South African learners, parent or guardian details provide progress transparency without collecting unnecessary personal data.
              </p>
              <div>
                <label className="text-[11px] font-bold text-amber-900 block mb-1">
                  Parent / Guardian Name:
                </label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="e.g. Nomvula Ndlovu"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-xs"
                />
              </div>
            </div>
          )}

          {/* Grade Promotion Button */}
          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">Moving to next school year?</div>
              <div className="text-[10px] text-slate-500">
                Grade promotion preserves your historical quiz badges while updating curriculum subjects.
              </div>
            </div>
            {grade < 12 && (
              <button
                type="button"
                onClick={() => handleGradeChange(grade + 1)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold shrink-0"
              >
                Promote to Grade {grade + 1}
              </button>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md shadow-emerald-600/20"
            >
              Save Profile & Learning Path
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
