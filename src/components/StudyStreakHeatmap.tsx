import React, { useState, useEffect } from 'react';
import {
  Flame,
  Award,
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  StudyStreakService,
  StreakStats,
  DayActivity,
} from '../services/studyStreakService';
import { SpeechService } from '../services/speechService';

interface StudyStreakHeatmapProps {
  grade: number;
  onActivityLogged?: () => void;
}

export const StudyStreakHeatmap: React.FC<StudyStreakHeatmapProps> = ({
  grade,
  onActivityLogged,
}) => {
  const [stats, setStats] = useState<StreakStats>(() => StudyStreakService.getStreakStats());
  const [selectedDay, setSelectedDay] = useState<DayActivity | null>(null);
  const [justLogged, setJustLogged] = useState(false);

  useEffect(() => {
    setStats(StudyStreakService.getStreakStats());
  }, []);

  // Generate 35 days (5 weeks) ending today
  const today = new Date();
  const daysList: Array<{ dateStr: string; dateObj: Date; isToday: boolean; activity?: DayActivity }> = [];

  for (let i = 34; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = StudyStreakService.formatDate(d);
    const isToday = i === 0;
    daysList.push({
      dateStr,
      dateObj: d,
      isToday,
      activity: stats.activitiesMap[dateStr],
    });
  }

  // Handle quick activity log for today
  const handleLogToday = () => {
    const updated = StudyStreakService.recordTodayActivity(
      grade >= 10 ? 'Grade 12 Calculus & Physics' : `Grade ${grade} CAPS Practice`,
      20
    );
    setStats({ ...updated });
    setJustLogged(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });

    SpeechService.speak(`Awesome! You extended your learning streak to ${updated.currentStreakDays} days!`);

    setTimeout(() => setJustLogged(false), 4000);
    if (onActivityLogged) onActivityLogged();
  };

  const getIntensityColor = (count?: number, isToday = false) => {
    if (!count || count === 0) {
      return isToday
        ? 'bg-amber-100 border-2 border-amber-400 text-amber-950 animate-pulse'
        : 'bg-slate-100 border border-slate-200 text-slate-400';
    }
    if (count === 1) return 'bg-emerald-200 border border-emerald-300 text-emerald-900';
    if (count === 2) return 'bg-emerald-400 border border-emerald-500 text-white';
    return 'bg-emerald-600 border border-emerald-700 text-white font-bold';
  };

  const dayOfWeekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5 animate-in fade-in">
      {/* Header with Streak Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
            <Flame className="w-7 h-7 fill-white text-white animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                {stats.currentStreakDays} Day Study Streak!
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                Active Streak
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Consistent daily practice builds long-term memory and distinctions
            </p>
          </div>
        </div>

        {/* Action Button: Check In / Log Learning */}
        <button
          onClick={handleLogToday}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all transform active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>{justLogged ? 'Streak Extended! 🔥' : 'Log Today’s Session'}</span>
        </button>
      </div>

      {/* Mini-Calendar Heatmap (Last 5 Weeks / 35 Days) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Daily Activity Heatmap (Last 5 Weeks)</span>
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 border border-slate-200"></span>
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-200 border border-emerald-300"></span>
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400 border border-emerald-500"></span>
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 border border-emerald-700"></span>
            <span>More</span>
          </div>
        </div>

        {/* 7 Columns Grid (Mon - Sun) */}
        <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 overflow-x-auto">
          {/* Day Initials Header */}
          <div className="grid grid-cols-7 gap-1.5 mb-1.5 text-center text-[10px] font-bold text-slate-400">
            {dayOfWeekLabels.map((lbl, idx) => (
              <div key={idx}>{lbl}</div>
            ))}
          </div>

          {/* 35 Day Cells */}
          <div className="grid grid-cols-7 gap-1.5">
            {daysList.map((day) => {
              const count = day.activity?.count || 0;
              const colorClass = getIntensityColor(count, day.isToday);
              const dayNum = day.dateObj.getDate();
              const isSelected = selectedDay?.date === day.dateStr;

              return (
                <button
                  key={day.dateStr}
                  onClick={() => setSelectedDay(day.activity || {
                    date: day.dateStr,
                    count: 0,
                    minutesSpent: 0,
                    topicsRevised: [],
                  })}
                  className={`h-9 sm:h-10 rounded-xl flex flex-col items-center justify-center transition-all transform hover:scale-105 relative ${colorClass} ${
                    isSelected ? 'ring-2 ring-slate-800 scale-105' : ''
                  } ${day.isToday ? 'ring-2 ring-amber-500 ring-offset-1' : ''}`}
                  title={`${day.dateStr}: ${count} activities`}
                >
                  <span className="text-[11px] leading-tight font-semibold">
                    {dayNum}
                  </span>
                  {count > 0 && (
                    <span className="text-[9px] opacity-80 leading-none">
                      {count}★
                    </span>
                  )}
                  {day.isToday && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Day Details Popover / Banner */}
      {selectedDay && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="space-y-0.5">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span>📅 {selectedDay.date}:</span>
              <span className="text-emerald-700">
                {selectedDay.count > 0
                  ? `${selectedDay.count} learning tasks completed (${selectedDay.minutesSpent} mins)`
                  : 'No activities recorded on this day'}
              </span>
            </div>
            {selectedDay.topicsRevised.length > 0 && (
              <div className="text-[11px] text-emerald-800">
                Topics: {selectedDay.topicsRevised.join(', ')}
              </div>
            )}
          </div>
          <button
            onClick={() => setSelectedDay(null)}
            className="text-[11px] text-emerald-800 hover:underline font-bold shrink-0"
          >
            Close
          </button>
        </div>
      )}

      {/* Stats Summary & Streak Milestones */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Longest Streak</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">{stats.longestStreakDays} Days</div>
          <div className="text-[10px] text-slate-500">Personal Best</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Active Days</div>
          <div className="text-lg font-black text-emerald-700 mt-0.5">{stats.totalActiveDays} Days</div>
          <div className="text-[10px] text-slate-500">Engagement Count</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Study Time</div>
          <div className="text-lg font-black text-purple-700 mt-0.5">
            {Math.round(stats.totalMinutesThisMonth / 60)} hrs
          </div>
          <div className="text-[10px] text-slate-500">This Month</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-[10px] uppercase font-bold text-slate-400">Distinction Rank</div>
          <div className="text-lg font-black text-amber-600 mt-0.5">Champion 🏆</div>
          <div className="text-[10px] text-amber-700">14-Day Milestone</div>
        </div>
      </div>

      {/* Milestone Badges Bar */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Milestones:</span>
          <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 font-bold text-[10px] flex items-center gap-1 shrink-0">
            🕯️ 3-Day Flame (Achieved)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center gap-1 shrink-0">
            ⚡ 7-Day Warrior (Achieved)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center gap-1 border border-amber-300 shrink-0">
            🏆 14-Day Distinction (Current)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px] flex items-center gap-1 opacity-70 shrink-0">
            👑 30-Day Matric Legend (Next)
          </span>
        </div>
      </div>
    </div>
  );
};
