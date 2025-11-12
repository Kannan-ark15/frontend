// profile.service.ts
import { Injectable, signal } from '@angular/core';

export interface ProfileConfig {
  name: string;
  heroVideo: string;
  overlayText: string;
  restrictedSections: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private currentProfile = signal<string>('Recruiter');
  
  private profileConfigs: Record<string, ProfileConfig> = {
    'Recruiter': {
      name: 'Recruiter',
      heroVideo: 'assets/videos/hero1.mp4',
      overlayText: 'Professional Portfolio & Experience',
      restrictedSections: []
    },
    'Developer': {
      name: 'Developer',
      heroVideo: 'assets/videos/hero.mp4',
      overlayText: 'Building Amazing Software Solutions',
      restrictedSections: ['Experience']
    },
    'Stalker': {
      name: 'Stalker',
      heroVideo: 'assets/videos/stalker-hero.mp4',
      overlayText: 'Exploring Digital Footprints',
      restrictedSections: ['Skills', 'Experience']
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
