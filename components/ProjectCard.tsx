import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { BaseCard } from './BaseCard';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BaseCard 
      onClick={() => onClick(project)}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden transition  duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 will-change-transform"
      >
      {/* Image Container: Fixed height h-48, w-full, shrink-0 */}
      <div className="w-full h-48 shrink-0 overflow-hidden relative bg-gray-200 dark:bg-gray-800 z-0">
        {!isLoaded && (
          <div className="absolute inset-0 skeleton-wave" />
        )}
        
        <img 
          src={project.images[0]} 
          alt={project.title} 
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110
            ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg scale-105'}
          `}
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 z-10">
          {project.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
          <div className="flex gap-2 flex-wrap">
            {project.tech.slice(0, 2).map((t, i) => (
              <span key={i} className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md">
                {t}
              </span>
            ))}
            {project.tech.length > 2 && (
              <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md">
                +{project.tech.length - 2}
              </span>
            )}
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-900 dark:bg-gray-400 group-hover:bg-ios-primary transition-colors flex items-center justify-center text-white dark:text-black shadow-lg">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </BaseCard>
  );
};