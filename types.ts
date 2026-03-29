import React from 'react';

export interface Profile {
  avatar:string;
  name:string;
  job:string;
  introduction:string;
}

export enum AppID {
  PROJECTS = 'projects',
  ABOUT = 'about',
  SKILLS = 'skills',
  CONTACT = 'contact',
  GALLERY = 'gallery',
  SETTINGS = 'settings'
}


export interface AppDefinition {
  id: AppID;
  name: string;
  iconColor: string;
  icon: React.ReactNode;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  images: string[]; // Changed from image: string
  description: string;
  tech: string[];
  year: number; // Added
  role: string; // Added
  teamSize: number; // Added
  projectType: 'Personal' | 'Academic' | 'Client'; // Added
  liveUrl?: string; // Added
  sourceCodeUrl?: string; // Added
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number | 'Present';
  details?: string;
}

export interface LifeEvent {
  year: number | string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'milestone';
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  skills: string[];
}