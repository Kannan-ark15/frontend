import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Card {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
  videoUrl: string;
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

  selectedCard(title: string): void {
    switch (title) {
      case 'About':
      this.router.navigate(['/about']);
      break;
      case 'Skills':
      this.router.navigate(['/skills']);
      break;
      case 'Experience':
      this.router.navigate(['/experience']);
      break;    
      case 'Certifications':
      this.router.navigate(['/certifications']);
      break;
      default:
        this.router.navigate(['']);
      break;
    }
  }
}