import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, signal, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AboutService } from './about.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProfileService } from '../profile-page/profile-service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule,AppNavbarComponent],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;

  aboutService = inject(AboutService);
  route = inject(ActivatedRoute);
    router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  videoSrc = signal('assets/videos/About_Developer.mp4');
  title = signal('About Me');
  description = signal('Where Creativity Meets Coding');
  height = '100vh';
  isMuted = signal(true);

  // Carousel state
  private animationFrameId?: number;
  private currentTranslateX = 0;
  private carouselSpeed = 0.5; // pixels per frame
  private isPaused = false;
  private isTouching = false;
  private touchStartX = 0;
  private touchStartTranslateX = 0;

   menuItems: any[] = [];
     allMenuItems=signal<any[]>([]);
  profile='';
    profileService = inject(ProfileService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const profileName = params['profile'] || 'developer';
      const data = this.aboutService.getvideoUrlForProfile(profileName);
      if (data.videoUrl) {
        this.videoSrc.set(data.videoUrl);
        this.title.set(data.title);
        this.description.set(data.description);
      }
    });
     const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|anonymus)\//);

    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }

    this.menuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'Experience', route: `/${this.profile}/experience`, section: 'Experience' },
      { label: 'Skills', route: `/${this.profile}/skills`, section: 'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

       this.allMenuItems.set(
      this.menuItems.filter((item: { section: string; }) => 
        !item.section || !this.profileService.isSectionRestricted(item.section,this.profile)
      )
    );
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    
    setTimeout(() => {
      this.initializeVideo();
      this.initializeCarousel();
      this.setupIntersectionObservers();
    }, 300);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // Video controls
  toggleMute() {
    if (this.heroVideoRef?.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      const newMutedState = !video.muted;
      video.muted = newMutedState;
      this.isMuted.set(newMutedState);

      if (!newMutedState && video.paused) {
        video.play().catch(err => console.warn('Failed to play video:', err));
      }
    }
  }

  private initializeVideo() {
    if (this.heroVideoRef?.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      video.muted = false;
      this.isMuted.set(false);
      video.playsInline = true;
      video.load();

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Video autoplay started'))
          .catch(error => console.warn('Autoplay prevented:', error));
      }
    }
  }

  // Carousel controls
  private initializeCarousel() {
    if (!this.carouselTrack?.nativeElement) return;

    const track = this.carouselTrack.nativeElement;
    
    // Setup touch events
    track.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    track.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    track.addEventListener('touchend', this.handleTouchEnd.bind(this));
    track.addEventListener('touchcancel', this.handleTouchEnd.bind(this));

    // Setup mouse events for desktop
    track.addEventListener('mouseenter', () => this.isPaused = true);
    track.addEventListener('mouseleave', () => this.isPaused = false);

    // Start animation
    this.startCarouselAnimation();
  }

  private handleTouchStart(event: TouchEvent) {
    this.isTouching = true;
    this.isPaused = true;
    this.touchStartX = event.touches[0].clientX;
    this.touchStartTranslateX = this.currentTranslateX;
  }

  private handleTouchMove(event: TouchEvent) {
    if (!this.isTouching) return;
    event.preventDefault();

    const touchX = event.touches[0].clientX;
    const deltaX = touchX - this.touchStartX;
    this.currentTranslateX = this.touchStartTranslateX + deltaX;

    if (this.carouselTrack?.nativeElement) {
      this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslateX}px)`;
    }
  }

  private handleTouchEnd() {
    this.isTouching = false;
    this.isPaused = false;
  }

  private startCarouselAnimation() {
    if (!this.carouselTrack?.nativeElement) return;

    const track = this.carouselTrack.nativeElement;
    const firstCard = track.querySelector('.timeline-card') as HTMLElement;
    
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 30; // matches CSS gap
    const cardWithGap = cardWidth + gap;
    const totalCards = 9; // Number of unique cards (before duplication)
    const resetPoint = -(cardWithGap * totalCards);

    const animate = () => {
      if (!this.isPaused && !this.isTouching) {
        this.currentTranslateX -= this.carouselSpeed;

        // Reset position for seamless loop
        if (this.currentTranslateX <= resetPoint) {
          this.currentTranslateX = 0;
        }

        track.style.transform = `translateX(${this.currentTranslateX}px)`;
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Intersection Observer for scroll animations
  private setupIntersectionObservers() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      '.intro-content, .timeline-block, .skill-item, .principle, .stat-card'
    );

    animatedElements.forEach(el => observer.observe(el));
  }
}