import React, { useEffect } from 'react';
import { X, Calendar, Award, CheckCircle2, Terminal } from 'lucide-react';
import { Language, ActivityItem } from '../types';

interface ActivityModalProps {
  activity: ActivityItem | null;
  language: Language;
  onClose: () => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  language,
  onClose,
}) => {
  useEffect(() => {
    if (!activity) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activity]);

  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-2xl bg-white sm:rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#e5eeff] flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-[#0b1c30] leading-tight">
                  {activity.title}
                </h3>
                {activity.tag && (
                  <span className="hidden sm:inline-flex text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563eb] border border-[#2563eb]/20">
                    {activity.tag}
                  </span>
                )}
              </div>
              <p className="hidden sm:flex font-mono text-xs text-[#565e74] items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>{activity.year}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-[#f4f7fc] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-[#0b1c30]">
          {/* Photo */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#c3c6d7]/40 bg-slate-950 shadow-inner">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Description & Bavardage */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase font-bold text-[#2563eb]">
              // {language === 'fr' ? 'CONTEXTE & PARTICIPATION' : 'CONTEXT & OVERVIEW'}
            </h4>
            <p className="text-[13.5px] text-[#565e74] leading-relaxed">
              {activity.details?.[language] || activity.description[language]}
            </p>
          </div>

          {/* Highlights */}
          {activity.highlights && activity.highlights[language] && (
            <div className="space-y-2 border-t border-[#e5eeff] pt-4">
              <h4 className="font-mono text-xs uppercase font-bold text-[#0b1c30] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#2563eb]" />
                {language === 'fr' ? 'Points Clés & Compétences Mobilisées' : 'Key Highlights & Skills'}
              </h4>
              <ul className="space-y-2">
                {activity.highlights[language].map((pt, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#f4f7fc]/80 border border-[#e5eeff] flex items-start gap-2 text-xs text-[#0b1c30] leading-snug"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
