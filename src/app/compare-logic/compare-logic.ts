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
  @Input() height: string = '800px';
  @Input() enableScroll: boolean = true;
  @Input() maxHeight: string = '90vh';

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollContainer', { static: false }) scrollContainerRef?: ElementRef<HTMLDivElement>;

  dividerPosition: number = 50;
  isHovering: boolean = false;
  prefersReducedMotion: boolean = false;
  scrollPosition: number = 0;
  isTouching: boolean = false; // Track if user is touching

  ngOnInit(): void {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  toggleMode(): void {
    this.mode = this.mode === 'horizontal' ? 'vertical' : 'horizontal';
    this.dividerPosition = 50;
  }

  // Mouse events for desktop
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.containerRef || this.isTouching) return;
    this.updateDividerPosition(event.clientX, event.clientY);
    this.isHovering = true;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.isTouching) {
      this.isHovering = true;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.isTouching) {
      this.isHovering = false;
      
      if (this.prefersReducedMotion) {
        this.dividerPosition = 50;
      } else {
        this.animateToCenter();
      }
    }
  }

  // Touch events for mobile
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.isTouching = true;
    this.isHovering = true;
    this.onTouchMove(event);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.containerRef || event.touches.length === 0) return;
    
    // Prevent default to avoid scrolling while dragging
    event.preventDefault();
    
    const touch = event.touches[0];
    this.updateDividerPosition(touch.clientX, touch.clientY);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.isTouching = false;
    this.isHovering = false;
    
    if (this.prefersReducedMotion) {
      this.dividerPosition = 50;
    } else {
      this.animateToCenter();
    }
  }

  @HostListener('touchcancel', ['$event'])
  onTouchCancel(event: TouchEvent): void {
    this.isTouching = false;
    this.isHovering = false;
  }

  // Unified method to update divider position
  private updateDividerPosition(clientX: number, clientY: number): void {
    if (!this.containerRef) return;

    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    
    if (this.mode === 'horizontal') {
      const y = clientY - rect.top;
      const percentage = (y / rect.height) * 100;
      this.dividerPosition = Math.max(0, Math.min(100, percentage));
    } else {
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      this.dividerPosition = Math.max(0, Math.min(100, percentage));
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