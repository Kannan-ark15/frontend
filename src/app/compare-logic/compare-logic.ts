import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-compare-logic',
  imports: [CommonModule],
  templateUrl: './compare-logic.html',
  styleUrl: './compare-logic.css',
})
export class CompareLogic {
  @Input() oldImage: string = '';
  @Input() newImage: string = '';
  @Input() mode: 'horizontal' | 'vertical' = 'vertical';
  @Input() height: string = '800px'; // Increased default for long images
  @Input() enableScroll: boolean = true; // New: Enable scrolling for long images
  @Input() maxHeight: string = '90vh'; // New: Max height before scrolling

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollContainer', { static: false }) scrollContainerRef?: ElementRef<HTMLDivElement>;

  dividerPosition: number = 50; // percentage
  isHovering: boolean = false;
  prefersReducedMotion: boolean = false;
  scrollPosition: number = 0; // Track scroll position

  ngOnInit(): void {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  toggleMode(): void {
    this.mode = this.mode === 'horizontal' ? 'vertical' : 'horizontal';
    this.dividerPosition = 50;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.containerRef) return;

    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    
    if (this.mode === 'horizontal') {
      const y = event.clientY - rect.top;
      const percentage = (y / rect.height) * 100;
      this.dividerPosition = Math.max(0, Math.min(100, percentage));
    } else {
      const x = event.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      this.dividerPosition = Math.max(0, Math.min(100, percentage));
    }

    this.isHovering = true;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovering = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovering = false;
    
    if (this.prefersReducedMotion) {
      this.dividerPosition = 50;
    } else {
      this.animateToCenter();
    }
  }

  onScroll(event: Event): void {
    if (this.scrollContainerRef) {
      this.scrollPosition = (event.target as HTMLElement).scrollTop;
    }
  }

  private animateToCenter(): void {
    const start = this.dividerPosition;
    const end = 50;
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      this.dividerPosition = start + (end - start) * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  getDividerStyle(): any {
    if (this.mode === 'horizontal') {
      return {
        top: `${this.dividerPosition}%`,
        left: '0',
        right: '0',
        width: '100%',
        height: '4px',
        transform: 'translateY(-50%)'
      };
    } else {
      return {
        left: `${this.dividerPosition}%`,
        top: '0',
        bottom: '0',
        width: '4px',
        height: '100%',
        transform: 'translateX(-50%)'
      };
    }
  }

  getOldImageClip(): string {
    if (this.mode === 'horizontal') {
      return `inset(0 0 ${100 - this.dividerPosition}% 0)`;
    } else {
      return `inset(0 ${100 - this.dividerPosition}% 0 0)`;
    }
  }

  getNewImageClip(): string {
    if (this.mode === 'horizontal') {
      return `inset(${this.dividerPosition}% 0 0 0)`;
    } else {
      return `inset(0 0 0 ${this.dividerPosition}%)`;
    }
  }

  getContainerStyle(): any {
    return {
      height: this.enableScroll ? this.maxHeight : this.height
    };
  }
}

