import { Component, ElementRef, HostListener, inject, Input, signal, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { AboutService } from './about.service';
import { ProfileService } from '../profile-page/profile-service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [AppNavbarComponent, CommonModule, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnInit {
  profile = '';
  menuItems: any[] = [];
  
  aboutService = inject(AboutService);
  profileService = inject(ProfileService);
  router = inject(Router);
  
  @Input() height = '90vh';
  @ViewChild('heroVideo', { static: false }) heroVideoRef!: ElementRef<HTMLVideoElement>;
  
  videoSrc = signal('assets/videos/About_Recruiter.mp4');
  isMuted = signal(false);
  description: any;
  title: any;

  ngOnInit() {
    // Extract profile from current URL
    const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|stalker)\//);
    
    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      // Fallback to default profile
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }

    // Now set menu items with the correct profile
    this.menuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'Experience', route: `/${this.profile}/experience`,section:'Experience' },
      { label: 'Skills', route: `/${this.profile}/skills`,section:'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

    this.animateStats();
    this.observeElements();
    const aboutDetails=this.aboutService.getvideoUrlForProfile(this.profile)
    this.videoSrc.set(aboutDetails.videoUrl);
    this.title=aboutDetails.title;
    this.description=aboutDetails.description;
  }

  ngAfterViewInit() {
    if (this.heroVideoRef && this.heroVideoRef.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
          })
          .catch(error => {
            console.error('Error playing video:', error);
            video.muted = true;
            this.isMuted.set(true);
            video.play().catch(err => console.error('Second play attempt failed:', err));
          });
      }
    }
  }

  toggleMute() {
    if (this.heroVideoRef && this.heroVideoRef.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      video.muted = !video.muted;
      this.isMuted.set(video.muted);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.observeElements();
  }

  observeElements(): void {
    const elements = document.querySelectorAll(
      '.intro-content, .timeline-block, .skill-item, .principle, .stat-card,.word'
    );
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;
      
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }

  animateStats(): void {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat: any) => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(stat);
    });
  }
}