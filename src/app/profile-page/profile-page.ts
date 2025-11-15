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

  gridcard = signal<Card[]>([
    {
      id: 1,
      title: '1',
      text: 'Sql Syncup Automation System with Custom MCP',
      imageUrl: 'assets/images/Sql.png',
      videoUrl: 'assets/project/videos/sql.mp4',
      section: ''
    },
    {
      id: 2,
      title: '2',
      text: 'Movie Recommendation Sytsem based on Sentiment-Analysis.',
      imageUrl: 'assets/images/movie.png',
      videoUrl: 'assets/project/videos/movie.mp4',
      section: ''
    },
    {
      id: 3,
      title: '3',
      text: 'E-commerce Website with Payment Gateway Integration.',
      imageUrl: 'assets/images/E-commerce.png',
      videoUrl: 'assets/project/videos/cn.mp4',
      section: ''
    },
    {
      id: 4,
      title: '4',
      text: 'Project development in Progress.',
      imageUrl: 'assets/images/soon.png',
      videoUrl: 'assets/project/videos/soon.mp4',
      section: ''
    }
  ]);
    cards = signal<Card[]>([
    {
      id: 1,
      title: 'About',
      text: 'Learn more about my journey and background in software development.',
      imageUrl: 'assets/images/about.png',
      videoUrl: 'assets/videos/about.mp4',
      section: 'About'
    },
    {
      id: 2,
      title: 'Skills',
      text: 'Discover my technical skills and expertise in various technologies.',
      imageUrl: 'assets/images/skills.png',
      videoUrl: 'assets/videos/skills.mp4',
      section: 'Skills'
    },
    {
      id: 3,
      title: 'Experience',
      text: 'Explore my professional experience and career achievements.',
      imageUrl: 'assets/images/experience.png',
      videoUrl: 'assets/videos/experience.mp4',
      section: 'Experience'
    },
    {
      id: 4,
      title: 'Certifications',
      text: 'View my official certifications and professional credentials.',
      imageUrl: 'assets/images/certificates.png',
      videoUrl: 'assets/videos/Certificate.mp4',
      section: 'Certifications'
    }
  ]);
  projectData: any;
  allMenuItems: any;
  profile='';

 
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

      // Extract profile from current URL
    const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|stalker)\//);
    
    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }

    // Now set menu items with the correct profile
    this.allMenuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'About', route: `/${this.profile}/about` },
      { label: 'Experience', route: `/${this.profile}/experience` },
      { label: 'Skills', route: `/${this.profile}/skills` },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

       // Get profile configuration
    const profileConfig = this.profileService.getProfileConfig(this.profile);
    console.log('Received',profileConfig);
    
    // Set hero video and overlay text
    this.videoSrc.set(profileConfig.heroVideo);
    this.overlayText.set(profileConfig.overlayText);
    this.projectData = profileConfig.profileHeroData!;
    
    // Filter menu items based on restrictions
    this.menuItems.set(
      this.allMenuItems.filter((item: { section: string; }) => 
        !item.section || !this.profileService.isSectionRestricted(item.section,this.profile)
      )
    );
    const restrict=this.profileService.getProfileConfig(this.profile).restrictedSections
    console.log(restrict);
    this.cards.update((currentCards) =>
      currentCards.filter(
        (card) =>
          !restrict.some(
            (restrictedTitle) => card.title.toLowerCase() === restrictedTitle.toLowerCase()
          )
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
    if (section && this.profileService.isSectionRestricted(section)) {
      // Show restricted message or redirect
      alert(`This section is not available for your profile type.`);
      return;
    }
    this.router.navigate([route]);
  }
}
