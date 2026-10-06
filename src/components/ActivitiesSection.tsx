import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Language, ActivityCategory, ActivityItem } from '../types';

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
  const [activeFilter, setActiveFilter] = useState<'all' | ActivityCategory>('all');
  const activityFilters: Array<'all' | ActivityCategory> = ['all', 'competition', 'leadership', 'learning', 'community'];
  const activityLabels = {
    all: { fr: 'Toutes', en: 'All' },
    competition: { fr: 'Compétition', en: 'Competition' },
    leadership: { fr: 'Leadership', en: 'Leadership' },
    learning: { fr: 'Apprentissage', en: 'Learning' },
    community: { fr: 'Communauté', en: 'Community' }
  };
  const filteredActivities = activities.filter((activity) =>
    activeFilter === 'all' || activity.categories?.includes(activeFilter)
  );

  return (
    <section id="activities" className="px-5 py-10">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            {language === 'fr' ? 'Activités & Leadership' : 'Activities & Leadership'}
          </h2>
        </div>

        <div className="relative mb-6 -mx-5 sm:mx-0" aria-label={language === 'fr' ? 'Filtres des activités' : 'Activity filters'}>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap px-5 pb-2 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {activityFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${activeFilter === filter ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25' : 'border-[var(--color-border)]/50 bg-[var(--color-bg-soft)]/50 backdrop-blur-sm text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]'}`}
              >
                {activityLabels[filter][language]}
              </button>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-bg-main)]/95 to-transparent sm:hidden" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectActivity(item)}
              className="rounded-2xl glass-card overflow-hidden hover:shadow-md hover:border-[var(--color-accent)]/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Photo */}
                <div className="w-full aspect-[16/9] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-media-panel)] relative">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    src={item.imageUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {item.categories[0] && (
                    <span className="absolute left-3 top-3 font-mono text-[10px] text-white px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 bg-black/40 shadow-sm">
                      {activityLabels[item.categories[0]][language]}
                    </span>
                  )}
                </div>

                {/* Text content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[12.5px] sm:text-[13px] text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                    {item.description[language]}
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-4 sm:px-5 pt-3 pb-4 flex items-center justify-between border-t border-[var(--color-border)]/80">
                <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                  {item.year}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectActivity(item);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--color-bg-accent)]/50 hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-accent)] border border-[var(--color-accent)]/25 text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
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
