import { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

export const useProjects = () => {
  const [activeFilters, setActiveFilters] = useState({
    category: 'All',
    technologies: [] as string[],
    role: 'All',
    year: 'All',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = useMemo(() => {
    const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
    const technologies = [...Array.from(new Set(PROJECTS.flatMap(p => p.tech)))].sort();
    const roles = ['All', ...Array.from(new Set(PROJECTS.map(p => p.role)))];
    const years = ['All', ...Array.from(new Set(PROJECTS.map(p => p.year.toString())))].sort((a, b) => b.localeCompare(a));
    return { categories, technologies, roles, years };
  }, []);

  const filteredProjects = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();

    return PROJECTS.filter(project => {
      const categoryMatch = activeFilters.category === 'All' || project.category === activeFilters.category;
      const roleMatch = activeFilters.role === 'All' || project.role === activeFilters.role;
      const yearMatch = activeFilters.year === 'All' || project.year.toString() === activeFilters.year;
      const techMatch = activeFilters.technologies.length === 0 || activeFilters.technologies.every(tech => project.tech.includes(tech));

      const searchMatch = lowercasedQuery === '' ||
        project.title.toLowerCase().includes(lowercasedQuery) ||
        project.description.toLowerCase().includes(lowercasedQuery) ||
        project.tech.some(t => t.toLowerCase().includes(lowercasedQuery));

      return categoryMatch && roleMatch && yearMatch && techMatch && searchMatch;
    });
  }, [activeFilters, searchQuery]);

  const handleFilterChange = (type: 'category' | 'role' | 'year', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      technologies: type === 'category' ? [] : prev.technologies, 
      [type]: prev[type] === value ? 'All' : value
    }));
  };

  const handleTechToggle = (tech: string) => {
    setActiveFilters(prev => {
      const newTechs = prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech];
      return { ...prev, technologies: newTechs };
    });
  };

  const resetFilters = () => {
    setActiveFilters({ category: 'All', technologies: [], role: 'All', year: 'All' });
  };
  
  const activeFilterCount =
    (activeFilters.category !== 'All' ? 1 : 0) +
    activeFilters.technologies.length +
    (activeFilters.role !== 'All' ? 1 : 0) +
    (activeFilters.year !== 'All' ? 1 : 0);

  return {
    activeFilters,
    searchQuery,
    setSearchQuery,
    filteredProjects,
    filterOptions,
    handleFilterChange,
    handleTechToggle,
    resetFilters,
    activeFilterCount
  };
};