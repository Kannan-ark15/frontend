import { Component, Input, ViewChild, ElementRef, inject, input, signal, viewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCardComponent } from '../top-card/top-card.component';
import { Router } from '@angular/router';
import { Card } from '../../elements/elements';

export interface TopItem {
  id: number;
  image: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-top-cards-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
        <div
      class="hover-card"
      [class.expanded]="isHovered()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (click)="selectedCard(card().id)">      
      <!-- Image (visible by default) -->
      <img
        [src]="card().imageUrl"
        [alt]="card().title"
        class="card-media card-image"
        [class.hidden]="isHovered()"
      />

      <!-- Video (visible on hover) -->
      <video
        #videoPlayer
        class="card-media card-video"
        [class.visible]="isHovered()"
        loop
        muted
        playsinline
        preload="auto">
        <source [src]="card().videoUrl" type="video/mp4" />
      </video>

      <!-- Gradient Overlay -->
      <div class="card-overlay"></div>

      <!-- Content -->
      <div class="card-content">
        <!-- Collapsed Title (Rotated) -->
        <h3 
          class="card-title-collapsed"
          [class.hidden]="isHovered()">
          {{ card().title }}
        </h3>

        <!-- Expanded Content -->
        <div *ngIf="isHovered()"
          class="card-content-expanded"
          [class.visible]="isHovered()">
          <h3 class="card-title-expanded">{{ card().title }}</h3>
          <p class="card-text-expanded">{{ card().text }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
        .hover-card {
      position: relative;
      width: 275px;
      height: 100%;
      min-height: 400px;
      max-height: 700px;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      background-color: #000;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    .hover-card:hover {
      z-index: 10;
    }

    .hover-card.expanded {
      width: 450px;
    }

    /* Media Elements */
    .card-media {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.7s ease-in-out;
    }

    .card-image {
      opacity: 1;
    }

    .card-image.hidden {
      opacity: 0;
    }

    .card-video {
      opacity: 0;
    }

    .card-video.visible {
      opacity: 1;
    }

    /* Gradient Overlay */
    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        transparent 100%
      );
      pointer-events: none;
      z-index: 1;
    }

    /* Content Container */
    .card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px;
      color: #fff;
      z-index: 2;
    }

    /* Collapsed Title (Rotated) */
    .card-title-collapsed {
      position: absolute;
      left: 10px;
      bottom: 30px;
      transform-origin: bottom left;
      font-size: 1.75rem;
      font-family: 'Netflix Sans', sans-serif;
        font-size: 4rem;
        font-weight: 900;
        color: transparent; /* Makes the fill invisible */
        -webkit-text-stroke: 2px white; /* outer stroke */
        text-stroke: 2px white; /* support for other browsers */
        letter-spacing: 2px;
        z-index: 10;
    }

    .card-title-collapsed.hidden {
      opacity: 0;
    }

    /* Expanded Content */
    .card-content-expanded {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease 0.2s;
    }

    .card-content-expanded.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .card-title-expanded {
      margin-bottom: 12px;
      font-family: 'Poppins', sans-serif;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
      font-size: 4rem;
      font-weight: 900;
      color: transparent; /* Makes the fill invisible */
      -webkit-text-stroke: 2px white; /* outer stroke */
      text-stroke: 2px white; /* support for other browsers */
      letter-spacing: 2px;
      z-index: 10;
    }

    .card-text-expanded {
      font-size: 1.125rem;
      color: #d1d1d1;
      font-family: 'Poppins', sans-serif;
      line-height: 1.6;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .hover-card {
        width: 100px;
        min-height: 400px;
      }

      .hover-card.expanded {
        width: 320px;
      }

      .card-title-collapsed {
        font-size: 1.25rem;
        left: -60px;
        bottom: 100px;
      }

      .card-title-expanded {
        font-size: 1.5rem;
      }

      .card-text-expanded {
        font-size: 1rem;
      }

      .card-content {
        padding: 16px;
      }
    }

    @media (max-width: 480px) {
      .hover-card {
        width: 80px;
        min-height: 350px;
      }

      .hover-card.expanded {
        width: 280px;
      }
    }
  `]
})
export class TopCardsGridComponent {
   card = input.required<Card>();
  isHovered = signal(false);
  videoPlayer = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');
  hoverTimeout: number | undefined;
  isPlaying=false;
  router=inject(Router);
  constructor() {
    effect(() => {
      const videoEl = this.videoPlayer();
      if (!videoEl) return;

      const video = videoEl.nativeElement;
          // Clear any pending actions
      clearTimeout(this.hoverTimeout);
      if (this.isHovered()) {
         this.hoverTimeout =  setTimeout(() => {  
          if(!this.isPlaying){
            this.isPlaying=true;
                      video.play().catch(error => {
          console.error('Video play failed:', error);
        })
          } }, 150);
      } else {
       this.hoverTimeout = setTimeout(() => {
          if (this.isPlaying) {
            this.isPlaying = false;
            video.pause();
            video.currentTime = 0;
          }
        }, 100);
      }
    });
  }
  onMouseEnter(): void {
    this.isHovered.set(true);
    
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  selectedCard(item:Number) {
    switch (item) {
      case 1:
        this.router.navigate(['/sql-project'], { queryParams: { id: item } });
        return
      case 2:
        this.router.navigate(['/movie-recommendation']);
        return;
      case 3:
        this.router.navigate(['/e-commerce-project']);
        return
      default:
    }
  }
}
