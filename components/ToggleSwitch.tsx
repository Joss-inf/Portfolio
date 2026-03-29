import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      aria-checked={checked}
      role="switch"
      className={`relative w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center flex-shrink-0 ${checked ? 'bg-ios-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
    >
      <span className="sr-only">Toggle</span>
      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
};
