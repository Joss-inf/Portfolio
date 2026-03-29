import React from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  options: any;
  activeFilters: any;
  onFilterChange: (type: 'category' | 'role' | 'year', value: string) => void;
  onTechToggle: (tech: string) => void;
  onReset: () => void;
  activeFilterCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  options,
  activeFilters,
  onFilterChange,
  onTechToggle,
  onReset,
  activeFilterCount
}) => {
  return (
    <div className={`fixed inset-0 z-[999] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className={`relative w-full max-w-lg mx-auto mt-20 bg-ios-gray6/80 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden transform transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'}`}>
        <div className="px-6 pt-4 pb-2 flex justify-end items-center border-b border-black/10 dark:border-white/10">
          <button onClick={onClose} className="p-1 rounded-full bg-ios-gray4/60 dark:bg-ios-gray/40 hover:bg-ios-gray4 dark:hover:bg-ios-gray/60 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="flex justify-end pr-2 mb-4">
            {activeFilterCount > 0 && (
                <button onClick={onReset} className="text-sm font-medium text-ios-primary hover:opacity-80 transition-opacity">
                    Reset Filters ({activeFilterCount})
                </button>
            )}
          </div>
          {/* Category */}
          <FilterSection title="Category">
            {options.categories.map((cat: string) => (
              <FilterButton key={cat} label={cat} isActive={activeFilters.category === cat} onClick={() => onFilterChange('category', cat)} />
            ))}
          </FilterSection>
          {/* Technology */}
          <FilterSection title="Technology">
            {options.technologies.map((tech: string) => (
              <FilterButton key={tech} label={tech} isActive={activeFilters.technologies.includes(tech)} onClick={() => onTechToggle(tech)} />
            ))}
          </FilterSection>
          {/* Role */}
          <FilterSection title="Role">
            {options.roles.map((role: string) => (
              <FilterButton key={role} label={role} isActive={activeFilters.role === role} onClick={() => onFilterChange('role', role)} />
            ))}
          </FilterSection>
          {/* Year */}
          <FilterSection title="Year">
            {options.years.map((year: string) => (
              <FilterButton key={year} label={year} isActive={activeFilters.year === year} onClick={() => onFilterChange('year', year)} />
            ))}
          </FilterSection>
        </div>
      </div>
    </div>
  );
};

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">{title}</h3>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
      isActive
        ? 'bg-ios-primary text-white border-ios-primary/50 shadow-sm'
        : 'bg-[#E5E5EA] dark:bg-white/10 text-gray-800 dark:text-gray-100 border-transparent hover:bg-[#D1D1D6] dark:hover:bg-white/20'
    }`}
  >
    {label}
  </button>
);