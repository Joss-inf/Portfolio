import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  size?: 'default' | 'small';
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, className = '', size = 'default' }) => {
  const sizeClasses = {
    default: 'py-2 pl-10 pr-10 text-base',
    small: 'py-1.5 pl-10 pr-8 text-sm'
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-gray-200/80 dark:bg-gray-800 text-black dark:text-white rounded-xl font-medium placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ios-primary/50 transition-all ${sizeClasses[size]}`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <X size={size === 'small' ? 14 : 16} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" />
        </button>
      )}
    </div>
  );
};
