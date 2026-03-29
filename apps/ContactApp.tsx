import React, { useState, useMemo } from 'react';
import { Mail, Linkedin, Github, ChevronRight } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BaseCard } from '../components/BaseCard';
import { SectionTitle } from '../components/SectionTitle';
import { ListItem } from '../components/ListItem';
import { SearchBar } from '../components/SearchBar';
import { ContactForm } from '../components/ContactForm';

interface ContactAppProps {
  isActiveAndSettled: boolean;
  showSearchInApps: boolean;
}

export const ContactApp: React.FC<ContactAppProps> = ({ isActiveAndSettled, showSearchInApps }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const socialLinks = [
    { 
      href: "https://www.linkedin.com/in/josselin-b-b7b86425a",
      label: "LinkedIn",
      icon: <Linkedin size={18} className="text-white" />,
      iconContainerClassName: "bg-[#0A66C2]"
    },
    { 
      href: "https://github.com/Joss-inf",
      label: "GitHub",
      icon: <Github size={18} className="text-white" />,
      iconContainerClassName: "bg-gray-800 dark:bg-gray-700"
    }
  ];

  const filteredLinks = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (!lowercasedQuery) {
      return socialLinks;
    }
    return socialLinks.filter(link =>
      link.label.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="h-full overflow-y-auto pb-20 bg-ios-gray6 dark:bg-black text-black dark:text-white scroll-smooth transition-colors duration-300">
      <AppHeader
        title="Contact"
        subtitle="Get in touch or find me online"
        rightContent={
          showSearchInApps && (
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search links..."
              size="small"
              className="w-48"
            />
          )
        }
      />

      <div className="px-4 md:px-6 space-y-8 max-w-3xl mx-auto">
       

        <div>
          <SectionTitle title="Other ways to connect" />
          <BaseCard className="overflow-hidden">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link, index) => (
                <div key={link.href} className={index < filteredLinks.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""}>
                   <ListItem 
                        {...link}
                        trailingContent={<ChevronRight size={20} className="text-gray-400 group-hover:text-gray-500 transition-colors" />}
                    />
                </div>
              ))
            ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No links found for "{searchQuery}"
                </div>
            )}
          </BaseCard>
        </div>
      </div>
       <div className="h-20"></div>
    </div>
  );
};