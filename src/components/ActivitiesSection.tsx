import React from 'react';
import { Trophy, Users, Terminal, ExternalLink } from 'lucide-react';
import { Language, ActivityItem } from '../types';

interface ActivitiesSectionProps {
  language: Language;
  activities: ActivityItem[];
  onSelectActivity: (activity: ActivityItem) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  language,
  activities,
  onSelectActivity,
}) => {
  return (
    <section id="activities" className="px-5 py-10 bg-[#f4f7fc]/40 border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-lg text-[#2563eb] font-bold">07 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Activités & Hackathons' : 'Activities & Hackathons'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectActivity(item)}
              className="rounded-2xl bg-white border border-[#e5eeff] shadow-xs overflow-hidden hover:shadow-md hover:border-[#2563eb]/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Photo */}
                <div className="w-full aspect-[16/9] overflow-hidden border-b border-[#e5eeff] bg-slate-950 relative">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    src={item.imageUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end justify-between p-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[11px] text-white flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
                      {language === 'fr' ? 'Cliquer pour les détails' : 'Click for details'}
                    </span>
                    <span className="font-mono text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#2563eb] transition-colors flex items-center gap-2">
                      {item.id === 'hackverse' && <Terminal className="w-4 h-4 text-[#2563eb] shrink-0" />}
                      {item.id === 'cursor-hackathon' && <Trophy className="w-4 h-4 text-amber-500 shrink-0" />}
                      {item.id === 'club-info' && <Users className="w-4 h-4 text-[#2563eb] shrink-0" />}
                      <span className="line-clamp-1">{item.title}</span>
                    </h3>
                    <span className="font-mono text-[11px] text-[#2563eb] font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-[#2563eb]/20 shrink-0">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-[12.5px] sm:text-[13px] text-[#565e74] leading-relaxed line-clamp-3">
                    {item.description[language]}
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-4 sm:px-5 pt-0 pb-4 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectActivity(item);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50/80 hover:bg-[#2563eb] hover:text-white text-[#2563eb] border border-[#2563eb]/25 font-mono text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <span>{language === 'fr' ? 'Détails' : 'Details'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
