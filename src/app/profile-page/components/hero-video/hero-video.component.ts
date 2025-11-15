import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface ProfileHeroData {
  title: string;
  subtitle: string;
  description: string;
  actions: string[];
}
@Component({
  selector: 'app-hero-video',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-video-container" [style.height]="height">
      <video #heroVideo class="hero-video" 
            [muted]="false"
            [loop]="true"
            playsinline
            preload="auto"
           [src]="videoSrc()" type="video/mp4">
        </video>
      <div class="hero-overlay"></div>
      <div class="video-content">
        <h1 class="project-title">{{ profileHeroData.title }}</h1>
        <p class="project-description">{{ profileHeroData.description }}</p>
        <div class="tech-badges">
          @for (tech of profileHeroData.actions; track tech) {
            <a class="tech-badge"  [href]="actionClicked(tech)">{{ tech }}</a>
          }
        </div>
      </div>
       <button class="mute-toggle" (click)="toggleMute()" [attr.aria-label]="isMuted() ? 'Unmute video' : 'Mute video'">
      <!-- Muted Icon -->
      <svg *ngIf="isMuted()" class="volume-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
      </svg>
      
      <!-- Unmuted Icon -->
      <svg *ngIf="!isMuted()" class="volume-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
      </svg>
    </button>
    </div>
  `,
  styles: [`
    .hero-video-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: #000;
    }

    .hero-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .hero-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 120px;
      background: linear-gradient(to top, #141414 0%, transparent 100%);
      pointer-events: none;
    }

    @media (max-width: 768px) {
      .hero-video-container {
        height: 70vh !important;
      }
    }
    /* Mute Toggle Button */
.mute-toggle {
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.mute-toggle:hover,
.mute-toggle:active {
  background: rgba(229, 9, 20, 0.8);
  border-color: #e50914;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.6);
}

.mute-toggle:active {
  transform: scale(0.95);
}

.volume-icon {
  width: 24px;
  height: 24px;
  color: #fff;
  transition: all 0.2s ease;
}

/* Pulse animation for unmuted state */
.mute-toggle:not(:hover) .volume-icon {
  animation: none;
}
.video-content {
  font-color: white;
  position: absolute;
  bottom: 80px;
  left: 5%;
  top:45%;
  max-width: 700px;
  z-index: 10;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tech-badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tech-badge {
  background: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  color:black;
  text-decoration:none;
}

.tech-badge:hover ,
.tech-badge:active {
  transform: translateY(-2px);
}

.project-title {
  font-size: clamp(3rem, 2vw, 5rem);
  font-weight: 900;
  letter-spacing: -1px;
  color: #fff;
}

.project-description {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.7;
  color: #fff;
  max-width: 45rem;
}

/* Responsive */
@media (max-width: 768px) {
  .video-content {
    left: 4%;
    right: 4%;
    bottom: 60px;
  }
  .mute-toggle {
    width: 45px;
    height: 45px;
    bottom: 30px;
    right: 30px;
  }
  
  .volume-icon {
    width: 22px;
    height: 22px;
  }
   .project-title {
    font-size: 2rem;
  }
  
  .project-subtitle {
    font-size: 1.3rem;
  }

  .project-description {
    margin-bottom: 0;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .mute-toggle {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
  }
  
  .volume-icon {
    width: 20px;
    height: 20px;
  }
}

  `]
})
export class HeroVideoComponent {
  @Input() height = '90vh';
  @Input() set videoSource(value: string) {
    this.videoSrc.set(value);
  } 
  @Input() set text(value: string) {
    this.overlayText.set(value);
  }
  @Input() profileHeroData!: ProfileHeroData;
  videoSrc = signal('assets/videos/default-hero.mp4');
  overlayText = signal('Welcome to My Portfolio');
  @ViewChild('heroVideo', { static: false }) heroVideoRef!: ElementRef<HTMLVideoElement>;
  isMuted = signal(false); 
  ngAfterViewInit() {

    setTimeout(() => {
      this.initializeVideo();
    }, 300);
  }
  toggleMute() {
    if (this.heroVideoRef && this.heroVideoRef.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      video.muted = !video.muted;
      this.isMuted.set(video.muted);
    }
  }
  
  actionClicked(tech: any){
    switch(tech){
      case 'LinkedIn':
        return 'https://www.linkedin.com/in/ar-kannan';
      default:
      case 'Resume':
        return ''
    }
  }
   private initializeVideo() {
    if (this.heroVideoRef && this.heroVideoRef.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      
      // Ensure video is muted for autoplay
      video.muted = false;
      video.playsInline = true;
      
      // Load the video
      video.load();
      
      // Attempt to play after load
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video autoplay started successfully');
          })
          .catch(error => {
            console.warn('Autoplay prevented:', error);
            // Video will show poster image or first frame
          });
      }
    }
  }
}