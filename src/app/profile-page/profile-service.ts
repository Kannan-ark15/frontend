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
      restrictedSections: ['Codex'],
      profileHeroData: {
        title: 'Full Stack Developer',
        subtitle: '',  
        description: `Hello Recruiters, welcome to my portfolio! I'm a <span class="highlight">Full Stack Developer</span>specializing in building <span class="highlight">scalable, high-performance web applications.</span>I'm driven by <span class="highlight">creating solutions that add real value</span>— I need to understand <span class="highlight">exactly where the impact happens.</span>As a movie enthusiast, I bring a unique perspective: the art of <span class="highlight">visual storytelling.</span> This <span class="highlight">portfolio bridges my technical expertise</span> with my love for narratives that captivate and engage — combining <span class="highlight">creativity with purpose</span> in every project I build.`,
        actions: ['Resume', 'LinkedIn']
      }
    },
    'developer': {
      name: 'Developer',
      heroVideo: 'assets/videos/Developer.mp4',
      overlayText: 'Building Amazing Software Solutions',
      restrictedSections: ['Experience'],
      profileHeroData: {
        title: 'Dev in Action',
        subtitle: 'Discover Top Talent',  
        description: `Hey fellow developer! Welcome to my portfolio.  
                      You know how the heart pumps blood and keeps the whole body running?
                      That's exactly how I see developers — we keep projects alive and moving.
                      No matter what the goal is, we RISE so the end result can RISE too.`,
        actions: ['Resume', 'LinkedIn']
      }
    },
    'anonymus': {
      name: 'Anonymus',
      heroVideo: 'assets/videos/stalker.mp4',
      overlayText: 'Exploring Digital Footprints',
      restrictedSections: ['Experience','Certifications','Codex'],
      profileHeroData: {
        title: 'I See',
        subtitle: 'Discover Top Talent',  
        description: 'Hello. You’ve come pretty far in here. Go ahead and explore my projects and skills — but yes, only with limited access',
        actions: ['LinkedIn']
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
