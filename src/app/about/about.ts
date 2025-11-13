import { Component, ElementRef, HostListener, inject, Input, signal, ViewChild, AfterViewInit } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { AboutService } from './about.service';
import { ProfileService } from '../profile-page/profile-service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule} from 'lucide-angular';
@Component({
  selector: 'app-about',
  imports: [AppNavbarComponent, CommonModule, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  menuItems = [
    { label: 'Home', route: '/profile' },
    { label: 'Experience', route: '/experience', section: 'Experience' },
    { label: 'Skills', route: '/skills', section: 'Skills' },
    { label: 'Projects', route: '/profile', fragment: 'projects-section' },
    { label: 'Contact Me', route: '/profile', fragment: 'contact-id' },
  ];
  
  aboutService = inject(AboutService);
  profileService = inject(ProfileService);
  
  @Input() height = '90vh';
  @ViewChild('heroVideo', { static: false }) heroVideoRef!: ElementRef<HTMLVideoElement>;
  
  videoSrc = signal('assets/videos/About_Recruiter.mp4');
  isMuted = signal(true);

  ngOnInit() {
    this.animateStats();
    this.observeElements();
    this.videoSrc.set(this.aboutService.getvideoUrlForProfile(this.profileService.getProfile()));
  }

  ngAfterViewInit() {
    // Ensure video plays after view is initialized
    if (this.heroVideoRef && this.heroVideoRef.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      
      // Try to play the video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
          })
          .catch(error => {
            console.error('Error playing video:', error);
            // If autoplay fails, it's usually because of browser policies
            // Keep it muted and try again
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

      // Start animation when element is visible
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