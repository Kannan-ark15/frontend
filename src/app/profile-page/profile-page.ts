import { Component, inject, signal } from '@angular/core';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { CommonModule } from '@angular/common';
import { HeroVideoComponent } from './components/hero-video/hero-video.component';
import { TopCardsGridComponent } from './components/top-cards-grid/top-cards.component';
import { Elements } from './elements/elements';
import { Card } from './elements/card.model';
import { ContactMe } from './contact-me/contact-me';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile-service';
import { TopCardComponent } from "./components/top-card/top-card.component";

export interface TopItem {
  id: number;
  image: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    AppNavbarComponent,
    HeroVideoComponent,
    TopCardsGridComponent,
    Elements,
    ContactMe,
    TopCardComponent
],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private profileService = inject(ProfileService);
  private router = inject(Router);
   videoSrc = signal('');
  overlayText = signal('');
  menuItems = signal<any[]>([]);
  private allMenuItems = [
    { label: 'Experience', route: '/experience', section: 'Experience' },
    { label: 'Skills', route: '/skills', section: 'Skills' },
    { label: 'Projects', route: '/profile', fragment: 'projects-section' },
    { label: 'Contact Me', route: '/contact' }
  ];
  //   {
  //     id: 1,
  //     image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
  //     title: 'Project Alpha',
  //     description: 'E-commerce platform'
  //   },
  //   {
  //     id: 2,
  //     image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=600&fit=crop',
  //     title: 'Dashboard Pro',
  //     description: 'Analytics dashboard'
  //   },
  //   {
  //     id: 3,
  //     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop',
  //     title: 'Mobile App',
  //     description: 'Social networking'
  //   },
  // ];
  gridcard = signal<Card[]>([
    {
      id: 1,
      title: '1',
      text: 'Learn more about my journey and background in software development.',
      imageUrl: 'assets/images/Sql.png',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-writing-on-a-laptop-in-a-dark-room-4330-large.mp4',
      section: 'About'
    },
    {
      id: 2,
      title: '2',
      text: 'Discover my technical skills and expertise in various technologies.',
      imageUrl: 'assets/images/Lstm.png',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-a-man-sits-in-a-dark-room-and-works-on-a-computer-4328-large.mp4',
      section: 'Skills'
    },
    {
      id: 3,
      title: '3',
      text: 'Explore my professional experience and career achievements.',
      imageUrl: 'assets/images/E-commerce.png',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-computer-keyboard-in-a-dark-room-4326-large.mp4',
      section: 'Experience'
    },
    {
      id: 4,
      title: 'Coming Soon..',
      text: 'View my official certifications and professional credentials.',
      imageUrl: 'https://picsum.photos/seed/certs/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-dark-office-4329-large.mp4',
      section: 'Certifications'
    }
  ]);
    cards = signal<Card[]>([
    {
      id: 1,
      title: 'About',
      text: 'Learn more about my journey and background in software development.',
      imageUrl: 'https://picsum.photos/seed/about/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-writing-on-a-laptop-in-a-dark-room-4330-large.mp4',
      section: 'About'
    },
    {
      id: 2,
      title: 'Skills',
      text: 'Discover my technical skills and expertise in various technologies.',
      imageUrl: 'https://picsum.photos/seed/skills/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-a-man-sits-in-a-dark-room-and-works-on-a-computer-4328-large.mp4',
      section: 'Skills'
    },
    {
      id: 3,
      title: 'Experience',
      text: 'Explore my professional experience and career achievements.',
      imageUrl: 'https://picsum.photos/seed/experience/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-computer-keyboard-in-a-dark-room-4326-large.mp4',
      section: 'Experience'
    },
    {
      id: 4,
      title: 'Certifications',
      text: 'View my official certifications and professional credentials.',
      imageUrl: 'https://picsum.photos/seed/certs/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-dark-office-4329-large.mp4',
      section: 'Certifications'
    }
  ]);

 
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
       // Get profile configuration
    const profileConfig = this.profileService.getProfileConfig();
    
    // Set hero video and overlay text
    this.videoSrc.set(profileConfig.heroVideo);
    this.overlayText.set(profileConfig.overlayText);
    
    // Filter menu items based on restrictions
    this.menuItems.set(
      this.allMenuItems.filter(item => 
        !item.section || !this.profileService.isSecretionRestricted(item.section)
      )
    );
    
    // Listen for fragment changes
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToSection(fragment);
        }, 100);
      }
    });
  }

  ngAfterViewInit() {
    // Also check on page load
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      setTimeout(() => {
        this.scrollToSection(fragment);
      }, 500);
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Adjust for navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

   navigateToSection(route: string, section?: string) {
    if (section && this.profileService.isSecretionRestricted(section)) {
      // Show restricted message or redirect
      alert(`This section is not available for your profile type.`);
      return;
    }
    this.router.navigate([route]);
  }
}
