import React, { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { localizePeriod } from '../data/site';
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
    <section id="activities" className="section">
      <div className="section-inner">
        <div className="section-head">
          <span className="section-eyebrow">08 <span aria-hidden="true">/</span> activities</span>
          <h2 className="section-title">
            {language === 'fr' ? 'Activités & Leadership' : 'Activities & Leadership'}
          </h2>
        </div>

        <div className="chip-row" role="group" aria-label={language === 'fr' ? 'Filtres des activités' : 'Activity filters'}>
          {activityFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="chip"
            >
              {activityLabels[filter][language]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((item) => (
            <article
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectActivity(item)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectActivity(item);
                }
              }}
              className="card card-interactive group flex h-full flex-col p-3"
            >
              <div className="card-media">
                <img alt={item.title} src={item.imageUrl} loading="lazy" />
                {item.categories[0] && <span className="media-badge">{activityLabels[item.categories[0]][language]}</span>}
              </div>

              <div className="card-body flex flex-1 flex-col px-2 pb-1 pt-4">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text mt-2 line-clamp-3">{item.description[language]}</p>

                <div className="card-footer mt-5">
                  <span className="meta">
                    <Calendar />
                    {localizePeriod(item.year.replace('present', 'Present'), language)}
                  </span>
                  <span className="btn-more">
                    {language === 'fr' ? 'Détails' : 'Details'}
                    <ArrowRight />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
