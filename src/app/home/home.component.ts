import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  @Input() logoClickRoute = '/';
  isHovering = false;
  currentBackground: string | null = null;
  profiles = [
    {
      name: 'Recruiter',
      image: 'assets/images/Recruiter.webp',
      backgroundImage: 'assets/images/office.webp' 
    },
    {
      name: 'Developer',
      image: 'assets/images/Developer.webp',
      backgroundImage: 'assets/images/Coder.webp'
    },
    {
      name: 'Anonymus',
      image: 'assets/images/Stalker.webp',
      backgroundImage: 'assets/images/Stalker_Cat.webp'
    }
  ];
  
  private router = inject(Router);
  private profileService = inject(ProfileService);

  ngOnInit(): void {
   
    // Override with first profile background on mobile
    if (this.profiles.length > 0) {
      const firstProfile = this.profiles[0];
      this.currentBackground = `url(${firstProfile.backgroundImage})`;
    }
  }

  onProfileHover(profile: any): void {
    if (profile && profile.backgroundImage) {
      this.currentBackground = `url(${profile.backgroundImage})`;
      this.isHovering = true;
    }
  }

  onProfileLeave(): void {
    // On desktop, clear background when not hovering
     // On desktop, revert to default background when not hovering
    if (window.innerWidth > 768) {
      this.isHovering = false;
    }
  }

  selectProfile(profile: any): void {
    // Set profile in service
    this.profileService.setProfile(profile.name);
    
    // Navigate to profile page
    this.router.navigate([`${profile.name.toLowerCase()}/home`]);
  }
}