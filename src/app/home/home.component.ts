import { Component, inject, Input, OnInit } from '@angular/core'; // Import OnInit
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // standalone: true, // Make sure this is present if you are using standalone components
  imports: [CommonModule,RouterModule]
})
export class HomeComponent implements OnInit { // Implement OnInit
  @Input() logoClickRoute = '/';
  isHovering = false;
  currentBackground: string | null = null;
  profiles = [
    {
      name: 'Recruiter',
      image: 'assets/images/Recruiter.png',
      backgroundImage: 'assets/images/office.png' 
    },
    {
      name: 'Developer',
      image: 'assets/images/Developer.png',
      backgroundImage: 'assets/images/Coder.jpg'
    },
    {
      name: 'Stalker',
      image: 'assets/images/Stalker.jpg',
      backgroundImage: 'assets/images/Stalker.png'
    }
  ];
 private router = inject(Router);
 private profileService = inject(ProfileService);

  // This hook runs once when the component is initialized
  ngOnInit(): void {
    // Check if the screen width is mobile-sized (matches our CSS breakpoint)
    if (window.innerWidth <= 768) {
      // If it is mobile, and we have profiles...
      if (this.profiles.length > 0) {
        // ...set the first profile's background as the default.
        const firstProfile = this.profiles[0];
        this.currentBackground = `url(${firstProfile.backgroundImage})`;
      }
    }
  }

  // This desktop-only logic remains the same
  onProfileHover(profile: any): void {
    if (profile && profile.backgroundImage) {
      this.currentBackground = `url(${profile.backgroundImage})`;
      this.isHovering = true;
    }
  }

  onProfileLeave(): void {
    this.currentBackground = null;
    this.isHovering = false;
  }

   selectProfile(profile: any): void {
    // Set profile in service
    this.profileService.setProfile(profile.name);
    
    // Navigate to profile page
    this.router.navigate([`${profile.name.toLowerCase()}/home`]);
  }
}