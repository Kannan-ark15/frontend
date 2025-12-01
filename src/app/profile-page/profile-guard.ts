// profile-guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { ProfileService } from './profile-service';

export const profileGuard: CanActivateFn = (route, state) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);
  
  // Extract profile from the URL path
  const urlSegments = state.url.split('/');
  const profileName = extractProfileFromUrl(state.url);
  
  if (profileName) {
    profileService.setProfile(profileName);
  }
  
  const section = route.data['section'];
  
  if (section && profileService.isSectionRestricted(section)) {
    router.navigate(['/profile']);
    return false;
  }
  
  return true;
};

function extractProfileFromUrl(url: string): string | null {
  // Check if URL contains profile patterns like /recruiter/home, /developer/home
  const match = url.match(/\/(recruiter|developer|anonymus)\//);
  return match ? match[1] : null;
}