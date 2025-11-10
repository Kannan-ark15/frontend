import { Component, inject, OnInit } from '@angular/core'; // Import OnInit
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // standalone: true, // Make sure this is present if you are using standalone components
  imports: [CommonModule]
})
export class HomeComponent implements OnInit { // Implement OnInit

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
      backgroundImage: 'assets/images/Coder-colour.png'
    },
    {
      name: 'Stalker',
      image: 'assets/images/Stalker.jpg',
      backgroundImage: 'assets/images/Stalker.png'
    }
  ];
 private router = inject(Router);

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
    this.router.navigate(['profile'], { state: { selectedProfile: profile.name } });
  }
}