// profile-guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { ProfileService } from './profile-service';
export const profileGuard: CanActivateFn = (route, state) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);
  
  const section = route.data['section'];
  
  if (section && profileService.isSecretionRestricted(section)) {
    router.navigate(['/profile']);
    return false;
  }
  
  return true;
};
