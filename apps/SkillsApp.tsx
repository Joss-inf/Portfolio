import React, { useState, useMemo } from 'react';
import { 
  Terminal, Layout, Server, Database, Wrench, Sparkles, 
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { SearchBar } from '../components/SearchBar';
import { SkillCategory } from '../types';
import { SkillCategoryCard } from '../components/SkillCategoryCard';

const SKILL_DATA: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Langages', // Traduction de 'Languages'
    icon: <Terminal className="text-white" size={20} />,
    color: 'bg-blue-500',
    description: 'Maîtrise des langages de programmation fondamentaux', // Traduction de 'Core programming languages fluency'
    skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'HTML5', 'CSS3', 'Php']
  },
  {
    id: 'frontend',
    title: 'Frontend', // Conservé car souvent utilisé tel quel
    icon: <Layout className="text-white" size={20} />,
    color: 'bg-indigo-500',
    description: "Construction d'interfaces utilisateur", // Traduction de 'Building pixel-perfect user interfaces'
    skills: ['React','react native', 'Vue.js','html js natif', 'Tailwind CSS', 'Three.js']
  },
  {
    id: 'backend',
    title: 'Backend', // Conservé car souvent utilisé tel quel
    icon: <Server className="text-white" size={20} />,
    color: 'bg-green-500',
    description: 'Logique côté serveur et APIs', // Traduction de 'Server-side logic and APIs'
    skills: ['Node.js', 'Express','Ultimate-Express','Validation des entrées', // Traduction de 'input Validation'
    'FastApi', 'SQLAlchemy', 'APIs REST', // Traduction de 'REST APIs'
    'Jwt Jwt.s Jwt.e', 'Logique métier' // Traduction de 'Business Logic'
    ]
  },
  {
    id: 'database',
    title: 'Bases de données', // Traduction de 'Database'
    icon: <Database className="text-white" size={20} />,
    color: 'bg-orange-500',
    description: 'Modélisation et stockage des données', // Traduction de 'Data modeling and storage'
    skills: ['PostgreSQL', 'SQL','DBDiagram', 'GraphQL','SQlite']
  },
  {
    id: 'tools',
    title: 'DevOps & Outils', // Traduction de 'DevOps & Tools'
    icon: <Wrench className="text-white" size={20} />,
    color: 'bg-gray-500',
    description: 'Flux de travail et infrastructure', // Traduction de 'Workflow and infrastructure'
    skills: ['Commandes Git','EsLint', // Traduction de 'Git command'
    'Github', 'Vite']
  },
  {
    id: 'softskills',
    title: 'softskills',
    icon: <Sparkles className="text-white" size={20} />,
    color: 'bg-pink-500',
    description: 'Attributs professionnels et interpersonnels', // Traduction de 'Professional & interpersonal attributes'
    skills: ['Méthodologie Agile', // Traduction de 'Agile Methodology'
    'Scrum', 'Travail en équipe',
    'Maturité', 
    'Résolution de problèmes', // Traduction de 'Problem Solving'
    'Communication', `Mentorât ( à mon niveau )`, // Traduction de 'Mentoring'
    'Revue de code', // Traduction de 'Code Review'
    'Conception de systèmes'] // Traduction de 'System Design'
  }
];

interface SkillsAppProps {
  isActiveAndSettled: boolean;
  showSearchInApps: boolean;
}

export const SkillsApp: React.FC<SkillsAppProps> = ({ isActiveAndSettled, showSearchInApps }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkillData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (!lowercasedQuery) {
        return SKILL_DATA;
    }

    return SKILL_DATA.map(category => {
        const filteredSkills = category.skills.filter(skill =>
            skill.toLowerCase().includes(lowercasedQuery)
        );
        return { ...category, skills: filteredSkills };
    }).filter(category => 
        category.skills.length > 0 || 
        category.title.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="h-full overflow-y-auto pb-20 bg-[#F2F2F7] dark:bg-black text-black dark:text-white scroll-smooth transition-colors duration-300">
      <AppHeader
        title="Skills"
        subtitle="My technical toolbox"
        rightContent={
          showSearchInApps && (
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search skills..."
              size="small"
              className="w-48"
            />
          )
        }
      />

      <div className="px-4 md:px-6 pb-10 flex flex-col gap-6 max-w-3xl mx-auto">
        {filteredSkillData.length > 0 ? (
          filteredSkillData.map((category) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p className="font-semibold text-lg">Pas de compétences trouvée pour "{searchQuery}"</p>
            <p className="text-sm mt-1">Essayez un terme différent.</p>
          </div>
        )}
      </div>
      
      <div className="h-20"></div>
    </div>
  );
};