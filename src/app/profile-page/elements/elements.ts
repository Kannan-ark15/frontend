import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-service';

export interface Card {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
  videoUrl: string;
  section: string;
}

@Component({
  selector: 'app-elements',
  templateUrl: './elements.html',
  styleUrl: './elements.css',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Elements {
  card = input.required<Card>();
  isHovered = signal(false);
  videoPlayer = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');
  hoverTimeout: number | undefined;
  isPlaying = false;
  router = inject(Router);
  profileService = inject(ProfileService);
  profile = '';
  private isMobile = signal(false);

  constructor() {
    // Video playback effect
    effect(() => {
      const videoEl = this.videoPlayer();
      if (!videoEl) return;
      const video = videoEl.nativeElement;

      // Clear any pending actions
      clearTimeout(this.hoverTimeout);

      if (this.isHovered()) {
        this.hoverTimeout = setTimeout(() => {
          if (!this.isPlaying) {
            this.isPlaying = true;
            video.play().catch(error => {
              console.error('Video play failed:', error);
            });
          }
        }, 150) as unknown as number;
      } else {
        this.hoverTimeout = setTimeout(() => {
          if (this.isPlaying) {
            this.isPlaying = false;
            video.pause();
            video.currentTime = 0;
          }
        }, 100) as unknown as number;
      }
    });

    // Detect mobile
    if (typeof window !== 'undefined') {
      this.isMobile.set(window.innerWidth <= 768);
      window.addEventListener('resize', () => {
        this.isMobile.set(window.innerWidth <= 768);
      });
    }
  }

  ngOnInit() {
    const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|anonymus)\//);
    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
    
    // Scroll to center on mobile when expanded
    if (this.isMobile()) {
      setTimeout(() => {
        this.scrollToCenter();
      }, 100);
    }
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  private scrollToCenter(): void {
    if (typeof window === 'undefined') return;
    
    const cardElement = document.querySelector('.hover-card.expanded') as HTMLElement;
    if (!cardElement) return;

    const container = cardElement.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = cardElement.getBoundingClientRect();
    
    const scrollLeft = cardRect.left - containerRect.left + container.scrollLeft - 
                       (containerRect.width / 2) + (cardRect.width / 2);
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }

  selectedCard(title: string): void {
    switch (title) {
      case 'About':
        this.router.navigate([`/${this.profile}/about`]);
        break;
      case 'Skills':
        this.router.navigate([`/${this.profile}/skills`]);
        break;
      case 'Experience':
        this.router.navigate([`/${this.profile}/experience`]);
        break;
      case 'Certifications':
        this.router.navigate([`/${this.profile}/certifications`]);
        break;
      case 'Codex':
        this.router.navigate([`/${this.profile}/codex`]);
        break;
      case 'Bonus':
        this.router.navigate([`/${this.profile}/bonus`]);
        break;
      default:
        break;
    }
  }
}
