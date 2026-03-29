import React, { useState, useMemo } from 'react';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { EDUCATION_BACKGROUNDS, LIFE_ROADMAP } from '../constants';
import { AppHeader } from '../components/AppHeader';
import { BaseCard } from '../components/BaseCard';
import { SectionTitle } from '../components/SectionTitle';
import { SearchBar } from '../components/SearchBar';
import { LifeEventCard } from '../components/LifeEventCard';
import { ProfileHeader } from '../components/ProfileHeader';

interface AboutAppProps {
  isActiveAndSettled: boolean;
  showSearchInApps: boolean;
}

export const AboutApp: React.FC<AboutAppProps> = ({ isActiveAndSettled, showSearchInApps }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoadmap = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (!lowercasedQuery) {
      return LIFE_ROADMAP;
    }
    return LIFE_ROADMAP.filter(event =>
      event.title.toLowerCase().includes(lowercasedQuery) ||
      event.description.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="h-full overflow-y-auto pb-20 bg-[#F2F2F7] dark:bg-black text-black dark:text-white scroll-smooth transition-colors duration-300">
      <AppHeader
        title="About Me"
        subtitle="My journey and background"
        rightContent={
          showSearchInApps && (
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search journey..."
              size="small"
              className="w-48"
            />
          )
        }
      />

      <div className="px-4 md:px-6 space-y-6 max-w-3xl mx-auto">
        {/* Profile Header Card */}
        <ProfileHeader />

        {/* Details List */}
        <BaseCard className="overflow-hidden">
          <div className="p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
              <MapPin size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
              <p className="font-medium">Meudon - France</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
              <Briefcase size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
              <p className="font-medium">2+ Years</p>
            </div>
          </div>
        </BaseCard>

        {/* Education Background Section */}
        <div>
          <SectionTitle title="Education Background" />
          <BaseCard className="overflow-hidden">
            {EDUCATION_BACKGROUNDS.map((edu, index) => (
              <div 
                key={index} 
                className={`p-4 ${index < EDUCATION_BACKGROUNDS.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white leading-tight">{edu.degree}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution} ({edu.startYear} - {edu.endYear})</p>
                  </div>
                </div>
                {edu.details && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 pl-12">{edu.details}</p>
                )}
              </div>
            ))}
          </BaseCard>
        </div>

        {/* My Journey Section (Roadmap) */}
        <div>
          <SectionTitle title="My Journey" />
          <BaseCard className="p-6 relative">
            {filteredRoadmap.map((event, index) => (
              <LifeEventCard key={index} event={event} />
            ))}
             {filteredRoadmap.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <p>No journey events found for "{searchQuery}"</p>
              </div>
            )}
          </BaseCard>
        </div>

        {/* Bio Text */}
        <BaseCard className="p-6">
          <h3 className="text-lg font-bold mb-3">Background</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Formé en systèmes automatisés (BTS CRSA) et développement web et mobile (Bachelor ESIEE-IT), avec des projets pratiques en React, Vue.js, JavaScript, TypeScript et Node.js.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed"> Développeur avec une formation en systèmes automatisés et en développement web et mobile, ayant réalisé des projets pratiques en React, Vue.js, TypeScript et Node.js, et expérimenté la maintenance de serveurs et l’apprentissage autodidacte en informatique.
            J'apprécie la photographie et l'astronomie
          </p>
        </BaseCard>
      </div>
       <div className="h-20"></div>
    </div>
  );
};