import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Code2, X, ChevronRight, ChevronLeft, Calendar, Briefcase, Users, Sparkles, GraduationCap } from 'lucide-react';
import { Project } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, FreeMode, Mousewheel } from 'swiper/modules';
import { CompactLink } from './CompactLink';

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [imageLoadStates, setImageLoadStates] = useState<boolean[]>([]);

    useEffect(() => {
        if (project) {
            requestAnimationFrame(() => setIsVisible(true));
            setImageLoadStates(new Array(project.images.length).fill(false));
        }
    }, [project]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleImageLoad = (index: number) => {
        setImageLoadStates(prev => {
            const newStates = [...prev];
            newStates[index] = true;
            return newStates;
        });
    };

    const getProjectTypeIcon = useMemo(() => {
        if (!project) return null;
        switch (project.projectType) {
            case 'Personal':
                return <Sparkles size={14} />;
            case 'Academic':
                return <GraduationCap size={14} />;
            case 'Client':
            default:
                return <Briefcase size={14} />;
        }
    }, [project]);

    if (!project) return null;

  return (
  <div className="fixed inset-0 z-[980] flex items-center justify-center p-4 md:p-6">
    {/* Backdrop */}
    <div
      className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    />

    {/* Modal Container */}
    <div className={`
        relative w-full max-w-[800px] 
        max-h-[92dvh] md:max-h-[85vh] 
        bg-white dark:bg-[#1C1C1E] shadow-2xl overflow-hidden
        rounded-[32px] flex flex-col
        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform
        ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}
      `}>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-[60] w-8 h-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white flex items-center justify-center hover:bg-black/30 transition-colors"
      >
        <X size={18} strokeWidth={2} />
      </button>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        
        {/* 1. Header / Image Section */}
        <div className="relative w-full bg-gray-900 overflow-hidden shrink-0">
          <div className="aspect-square md:aspect-video w-full relative group">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{ nextEl: '.next-p', prevEl: '.prev-p' }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop={project.images.length > 1}
              className="w-full h-full"
            >
              {project.images.map((img, index) => (
                <SwiperSlide key={index} className="relative w-full h-full">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover object-top" 
                  />
                  {/* OPACITÉ RÉDUITE : Gradient plus subtil en bas uniquement */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Titre uniquement sur l'image */}
            <div className="absolute bottom-6 left-6 z-20">
                <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {project.title}
                </h1>
            </div>
          </div>
        </div>

        {/* 2. Info Bar (TES SLIDERS DE BADGES) */}
        <div className="p-4 md:px-6 md:py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
            <Swiper
                modules={[FreeMode, Mousewheel, Autoplay]}
                spaceBetween={10}
                slidesPerView={'auto'}
                freeMode={true}
                mousewheel={true}
                className="w-full"
            >
                {/* Badge de catégorie déplacé ici */}
                <SwiperSlide className="!w-auto">
                    <span className="px-3 py-1.5 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest flex items-center">
                        {project.category}
                    </span>
                </SwiperSlide>

                {/* Badge Année */}
                <SwiperSlide className="!w-auto">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-white/10 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-300">
                        <Calendar size={14} /> {project.year}
                    </div>
                </SwiperSlide>

                {/* Badge Rôle */}
                <SwiperSlide className="!w-auto">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-white/10 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-300">
                        <Briefcase size={14} /> {project.role}
                    </div>
                </SwiperSlide>

                {/* Badge Team */}
                <SwiperSlide className="!w-auto">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-white/10 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-300">
                        <Users size={14} /> {project.teamSize}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        {/* 3. Content Body */}
        <div className="p-6 md:p-8">
          <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-4 tracking-[0.2em]">About Project</h3>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Slider Tech Stack (Si tu veux aussi un slider ici) */}
          <div className="mb-8">
            <Swiper
                modules={[FreeMode, Mousewheel]}
                spaceBetween={8}
                slidesPerView={'auto'}
                freeMode={true}
                className="w-full "
            >
                {project.tech.map((t, i) => (
                <SwiperSlide key={i} className="!w-auto">
                    <span className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-xs border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">
                        {t}
                    </span>
                </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pb-4">
              <CompactLink href={project.liveUrl} icon={<ExternalLink size={16}/>} label="Live Preview" />
              <CompactLink href={project.sourceCodeUrl} icon={<Code2 size={16}/>} label="Source Code" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
};