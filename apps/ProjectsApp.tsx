import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Project } from '../types';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { FilterPanel } from '../components/FilterPanel';
import { AppHeader } from '../components/AppHeader';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { SearchBar } from '../components/SearchBar';
import { ProjectCard } from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';

interface ProjectsAppProps {
  isActiveAndSettled: boolean;
  showSearchInApps: boolean;
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ isActiveAndSettled, showSearchInApps }) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const {
    activeFilters,
    searchQuery,
    setSearchQuery,
    filteredProjects,
    filterOptions,
    handleFilterChange,
    handleTechToggle,
    resetFilters,
    activeFilterCount
  } = useProjects();
  
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-black text-black dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="h-full overflow-y-auto pb-20 scroll-smooth">
        <AppHeader 
          title="Projects" 
          subtitle="Recent work & Experiments"
          rightContent={
            showSearchInApps && (
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search projects..."
                size="small"
                className="w-48"
              />
            )
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6 gap-6 px-6 mx-auto">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleSelectProject}
            />
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
              <p className="font-semibold text-lg">No projects found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
      
      <FloatingActionButton 
        onClick={() => setIsFilterPanelOpen(true)}
        aria-label="Open filters"
        icon={<SlidersHorizontal size={20} />}
        badgeCount={activeFilterCount}
      />
      
      <FilterPanel 
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        options={filterOptions}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onTechToggle={handleTechToggle}
        onReset={resetFilters}
        activeFilterCount={activeFilterCount}
      />

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
};