import React from 'react';
import { Moon, Sun, Check, ChevronRight, Smartphone, PanelBottom, Search } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { BaseCard } from '../components/BaseCard';
import { SectionTitle } from '../components/SectionTitle';
import { ListItem } from '../components/ListItem';
import { ToggleSwitch } from '../components/ToggleSwitch';

interface SettingsAppProps {
  isActiveAndSettled: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  taskbarAutoHide: boolean;
  setTaskbarAutoHide: (value: boolean) => void;
  showSearchInApps: boolean;
  setShowSearchInApps: (value: boolean) => void;
}

const THEME_COLORS = [
  { name: 'Blue', hex: '#007AFF' },
  { name: 'Green', hex: '#34C759' },
  { name: 'Red', hex: '#FF3B30' },
  { name: 'Yellow', hex: '#FFCC00' },
  { name: 'Pink', hex: '#FF2D55' },
  { name: 'Purple', hex: '#AF52DE' },
  { name: 'Orange', hex: '#FF9500' },
];

export const SettingsApp: React.FC<SettingsAppProps> = ({ 
  isActiveAndSettled, 
  isDarkMode, 
  toggleDarkMode,
  accentColor,
  setAccentColor,
  taskbarAutoHide,
  setTaskbarAutoHide,
  showSearchInApps,
  setShowSearchInApps
}) => {
  return (
    <div className="h-full overflow-y-auto pb-20 bg-[#F2F2F7] dark:bg-black text-black dark:text-white scroll-smooth transition-colors duration-300">
      <AppHeader title="Settings" subtitle="Preferences & Personalization" />

      <div className="px-4 md:px-6 space-y-8 max-w-3xl mx-auto">
        
        {/* Appearance Section */}
        <div>
          <SectionTitle title="Appearance" />
          <BaseCard className="overflow-hidden">
             <ListItem
                icon={isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                iconContainerClassName="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                label="Dark Mode"
                trailingContent={<ToggleSwitch checked={isDarkMode} onChange={toggleDarkMode} />}
                className="py-2"
              />
          </BaseCard>
        </div>

        {/* Interface Section */}
        <div>
          <SectionTitle title="Interface" />
          <BaseCard className="overflow-hidden">
             <div className="border-b border-gray-200 dark:border-gray-700">
                <ListItem
                    icon={<PanelBottom size={18} />}
                    iconContainerClassName="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    label="Auto-Hide Taskbar"
                    description="Taskbar will minimize when an app opens."
                    trailingContent={<ToggleSwitch checked={taskbarAutoHide} onChange={() => setTaskbarAutoHide(!taskbarAutoHide)} />}
                    className="py-2 items-start"
                />
             </div>
             <ListItem
                icon={<Search size={18} />}
                iconContainerClassName="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                label="Show Search in Apps"
                description="Display a search bar in app headers."
                trailingContent={<ToggleSwitch checked={showSearchInApps} onChange={() => setShowSearchInApps(!showSearchInApps)} />}
                className="py-2 items-start"
              />
          </BaseCard>
        </div>

        {/* Accent Color Section */}
        <div>
           <SectionTitle title="Accent Color" />
           <BaseCard className="p-4">
             <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setAccentColor(color.hex)}
                    className="relative group"
                    title={color.name}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${accentColor === color.hex ? 'border-gray-400 dark:border-white scale-110' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    {accentColor === color.hex && (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Check size={20} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
             </div>
           </BaseCard>
        </div>

        {/* System Info */}
        <div>
          <SectionTitle title="System" />
          <BaseCard className="overflow-hidden">
            <ListItem 
              icon={<Smartphone size={18} />}
              iconContainerClassName="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              label="About this App"
              trailingContent={
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-sm">v1.0.3</span>
                  <ChevronRight size={16} />
                </div>
              }
              className="py-2"
            />
          </BaseCard>
        </div>

      </div>
      <div className="h-20"></div>
    </div>
  );
};
