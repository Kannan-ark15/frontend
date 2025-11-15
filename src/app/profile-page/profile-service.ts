// profile.service.ts
import { Injectable, signal } from '@angular/core';

export interface ProfileConfig {
  name: string;
  heroVideo: string;
  overlayText: string;
  restrictedSections: string[];
  profileHeroData?: {
    title: string;
    subtitle: string;
    description: string;
    actions: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private currentProfile = signal<string>('');
  
  private profileConfigs: Record<string, ProfileConfig> = {
    'recruiter': {
      name: 'Recruiter',
      heroVideo: 'assets/videos/Recruiter.mp4',
      overlayText: 'Professional Portfolio & Experience',
      restrictedSections: [],
      profileHeroData: {
        title: 'Full Stack Developer',
        subtitle: '',  
        description: 'Hello Recruiters, welcome to my portfolio!.I’m an innovative Full Stack Developer specializing in building scalable, high-performance web applications. This portfolio reflects the bridge between my passion for crafting impactful digital solutions and my love for storytelling through movies — combining creativity with technology in every project I build.',
        actions: ['Resume', 'LinkedIn']
      }
    },
    'developer': {
      name: 'Developer',
      heroVideo: 'assets/videos/hero.mp4',
      overlayText: 'Building Amazing Software Solutions',
      restrictedSections: ['Experience'],
      profileHeroData: {
        title: 'Welcome Recruiters',
        subtitle: 'Discover Top Talent',  
        description: 'Explore my professional journey, skills, and projects tailored for recruiters.',
        actions: ['Resume', 'Linkein']
      }
    },
    'stalker': {
      name: 'Stalker',
      heroVideo: 'assets/videos/stalker-hero.mp4',
      overlayText: 'Exploring Digital Footprints',
      restrictedSections: ['Skills', 'Experience'],
      profileHeroData: {
        title: 'Welcome Recruiters',
        subtitle: 'Discover Top Talent',  
        description: 'Explore my professional journey, skills, and projects tailored for recruiters.',
        actions: []
      }
    }
  };

  setProfile(profileName: string) {
    this.currentProfile.set(profileName);
  }

  getProfile() {
    return this.currentProfile();
  }

  getProfileConfig(profileName?: string): ProfileConfig {
    const name = profileName || this.currentProfile().toLowerCase();
    this.setProfile(name);
    return this.profileConfigs[name] || this.profileConfigs['recruiter'];
  }

  isSectionRestricted(sectionName: string,profileName?: string): boolean {
    const config = this.getProfileConfig(profileName);
    return config.restrictedSections.includes(sectionName);
  }
}
