import React, { useState, useEffect, Suspense } from 'react';
import { StatusBar } from './components/StatusBar';
import { Dock } from './components/Dock';
import { AppIcon } from './components/AppIcon';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { APPS } from './constants';
import { AppID } from './types';
import { LoadingScreen } from './components/LoadingScreen';

// Lazy Loaded Apps
const ProjectsApp = React.lazy(() => import('./apps/ProjectsApp').then(module => ({ default: module.ProjectsApp })));
const AboutApp = React.lazy(() => import('./apps/AboutApp').then(module => ({ default: module.AboutApp })));
const SkillsApp = React.lazy(() => import('./apps/SkillsApp').then(module => ({ default: module.SkillsApp })));
const ContactApp = React.lazy(() => import('./apps/ContactApp').then(module => ({ default: module.ContactApp })));
const GalleryApp = React.lazy(() => import('./apps/GalleryApp').then(module => ({ default: module.GalleryApp })));
const SettingsApp = React.lazy(() => import('./apps/SettingsApp').then(module => ({ default: module.SettingsApp })));

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<'initial' | 'fading' | 'complete'>('initial');

  const [openApp, setOpenApp] = useState<AppID | null>(null);
  const [previousOpenApp, setPreviousOpenApp] = useState<AppID | null>(null);
  const [isSwitchingApp, setIsSwitchingApp] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [runningApps, setRunningApps] = useState<AppID[]>([]);
  const [isAppClosing, setIsAppClosing] = useState(false);
  const [isTaskbarMinimized, setIsTaskbarMinimized] = useState(true);

  const [taskbarAutoHide, setTaskbarAutoHide] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('#007AFF');
  const [showSearchInApps, setShowSearchInApps] = useState(true);

  useEffect(() => {
    const minDuration = 2000;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsedTime);

      setTimeout(() => {
        setLoadingState('fading');
        setTimeout(() => {
          setLoadingState('complete');
        }, 800); 
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    html.style.setProperty('--ios-primary', accentColor);
  }, [isDarkMode, accentColor]);

  const handleOpenApp = (id: AppID) => {
    if (openApp && openApp !== id) {
      setIsSwitchingApp(true);
      setPreviousOpenApp(openApp);

      const currentAppIndex = APPS.findIndex(app => app.id === openApp);
      const newAppIndex = APPS.findIndex(app => app.id === id);

      setSlideDirection(newAppIndex < currentAppIndex ? 'left' : 'right');
      setOpenApp(id);
    } else {
      setIsAppClosing(false);
      setIsSwitchingApp(false);
      setPreviousOpenApp(null);
      setSlideDirection(null);
      setOpenApp(id);
    }

    setRunningApps(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    setIsTaskbarMinimized(taskbarAutoHide);
  };

  const handleCloseAppInitiated = () => {
    setIsAppClosing(true);
    setIsTaskbarMinimized(true);
    setSlideDirection(null);
  };

  const handleAppCloseAnimationComplete = () => {
    setOpenApp(null);
    setIsAppClosing(false);
    setPreviousOpenApp(null);
    setIsSwitchingApp(false);
    setSlideDirection(null);
  };

  const handleAppSwitchAnimationComplete = () => {
    setPreviousOpenApp(null);
    setIsSwitchingApp(false);
    setSlideDirection(null);
  };

  const renderAppContent = (id: AppID, isActiveAndSettled: boolean) => {
    const AppLoadingFallback = (
      <div className="h-full w-full flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="w-8 h-8 border-4 border-ios-primary border-t-transparent rounded-full animate-spin"/>
      </div>
    );
    const commonProps = { isActiveAndSettled, showSearchInApps };

    return (
      <Suspense fallback={AppLoadingFallback}>
        {id === AppID.PROJECTS && <ProjectsApp {...commonProps} />}
        {id === AppID.ABOUT && <AboutApp {...commonProps} />}
        {id === AppID.SKILLS && <SkillsApp {...commonProps} />}
        {id === AppID.CONTACT && <ContactApp {...commonProps} />}
        {id === AppID.GALLERY && <GalleryApp {...commonProps} />}
        {id === AppID.SETTINGS && (
          <SettingsApp 
            isActiveAndSettled={isActiveAndSettled} 
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            taskbarAutoHide={taskbarAutoHide}
            setTaskbarAutoHide={setTaskbarAutoHide}
            showSearchInApps={showSearchInApps}
            setShowSearchInApps={setShowSearchInApps}
          />
        )}
        {![...Object.values(AppID)].includes(id) && (
          <div className="p-10 text-center dark:text-white">App not found</div>
        )}
      </Suspense>
    );
  };

  const pinnedAppIds = [AppID.PROJECTS, AppID.ABOUT, AppID.SKILLS, AppID.CONTACT];
  const taskbarApps = APPS.filter(app => 
    pinnedAppIds.includes(app.id) || runningApps.includes(app.id)
  );

  return (
    <>
      <LoadingScreen loadingState={loadingState} />

      <div 
        className={`
          relative w-full h-full bg-cover bg-center overflow-hidden font-sans selection:bg-ios-primary/30
          transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${loadingState !== 'initial' ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
        `}
        style={{ 
           backgroundImage: 'url(/Portfolio/assets/background/background.webp)',
        }}
      >
        <div className="absolute inset-0 bg-black/10" />

        <StatusBar currentApp={openApp} />

        <div className={`
          absolute inset-0 pt-28 px-8 grid grid-cols-4 md:grid-cols-6 content-start justify-items-center gap-y-10 gap-x-6 max-w-5xl mx-auto z-[20]
        `}>
          {APPS.map((app) => (
            <div key={app.id} className="flex flex-col items-center">
              <AppIcon 
                {...app} 
                colorClass={app.iconColor}
                onClick={() => handleOpenApp(app.id)} 
              />
            </div>
          ))}
        </div>

        <div className={`
          fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none
          transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform
          ${(!!openApp || isAppClosing) ? 'translate-y-[200%]' : 'translate-y-0'}
        `}>
           <div className="pointer-events-auto">
             <Dock apps={APPS.slice(0, 4)} onOpenApp={(id) => handleOpenApp(id as AppID)} />
           </div>
        </div>

        {(openApp || isSwitchingApp) && (
          <Window 
            isOpen={!isAppClosing}
            onCloseInitiated={handleCloseAppInitiated} 
            onCloseAnimationComplete={handleAppCloseAnimationComplete}
            currentAppId={openApp}
            previousAppId={previousOpenApp}
            isSwitchingApp={isSwitchingApp}
            slideDirection={slideDirection}
            renderAppContent={renderAppContent}
            onAppSwitchAnimationComplete={handleAppSwitchAnimationComplete}
          />
        )}

        {(!!openApp || isAppClosing || isSwitchingApp) && (
          <Taskbar 
            apps={taskbarApps} 
            activeApp={openApp} 
            runningApps={runningApps}
            onSwitch={handleOpenApp} 
            isMinimized={isTaskbarMinimized} 
            setIsMinimized={setIsTaskbarMinimized}
            appIsClosing={isAppClosing} 
          />
        )}
      </div>
    </>
  );
};

export default App;