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
  private currentProfile = signal<string>('Recruiter');
  
  private profileConfigs: Record<string, ProfileConfig> = {
    'Recruiter': {
      name: 'Recruiter',
      heroVideo: 'assets/videos/Recruiter.mp4',
      overlayText: 'Professional Portfolio & Experience',
      restrictedSections: [],
      profileHeroData: {
        title: 'Full Stack Developer',
        subtitle: '',  
        description: 'Hello Recruiters, welcome to my portfolio!Iam an innovative Full Stack Developer with expertise in building scalable web applications.Explore this website where i have bridged my passion to develop with my love to watch movies ',
        actions: ['Resume', 'LinkedIn']
      }
    },
    'Developer': {
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
    'Stalker': {
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
    const name = profileName || this.currentProfile();
    return this.profileConfigs[name] || this.profileConfigs['Recruiter'];
  }

  isSecretionRestricted(sectionName: string): boolean {
    const config = this.getProfileConfig();
    return config.restrictedSections.includes(sectionName);
  }
}
