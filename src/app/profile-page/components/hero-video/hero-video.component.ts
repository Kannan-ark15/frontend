import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-video',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-video-container" [style.height]="height">
      <video 
        class="hero-video"
        [src]="videoSrc"
        [muted]="true"
        [loop]="true"
        [controls]="true"
        [autoplay]="false">
        Your browser does not support the video tag.
      </video>
      <div class="hero-overlay"></div>
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
        height: 50vh !important;
      }
    }
  `]
})
export class HeroVideoComponent {
  @Input() videoSrc = '';
  @Input() height = '75vh';
}