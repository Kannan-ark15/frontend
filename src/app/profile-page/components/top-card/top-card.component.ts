import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="top-card" 
      [class.active]="isActive"
      (mouseenter)="onHover()"
      (mouseleave)="onLeave()"
    >
      <div class="card-image-wrapper">
        <img 
          [src]="image" 
          [alt]="title"
          class="card-img"
          loading="lazy"
        />
        <div class="image-overlay"></div>
      </div>
      
      <div class="card-body">
        <h3 class="card-heading">{{ title }}</h3>
        @if (description) {
          <p class="card-text">{{ description }}</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .top-card {
      position: relative;
      background: rgba(20, 20, 20, 0.8);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .top-card:hover,
    .top-card.active {
      transform: translateY(-5px);
      border-color: rgba(229, 9, 20, 0.6);
      box-shadow: 0 10px 30px rgba(229, 9, 20, 0.3);
      background: rgba(30, 30, 30, 0.9);
    }

    .card-image-wrapper {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
      background: #000;
    }

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.4s ease;
    }

    .top-card:hover .card-img {
      transform: scale(1.08);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.4) 60%,
        rgba(0, 0, 0, 0.8) 100%
      );
      pointer-events: none;
    }

    .card-body {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .card-heading {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }

    .card-text {
      font-size: 0.95rem;
      color: #b3b3b3;
      line-height: 1.6;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }

    /* Tablet Responsive */
    @media (max-width: 768px) {
      .card-image-wrapper {
        height: 180px;
      }

      .card-body {
        padding: 16px;
        gap: 8px;
      }

      .card-heading {
        font-size: 1.1rem;
        -webkit-line-clamp: 2;
      }

      .card-text {
        font-size: 0.9rem;
        -webkit-line-clamp: 2;
      }
    }

    /* Mobile Responsive - Optimized */
    @media (max-width: 480px) {
      .top-card {
        border-radius: 10px;
        height: auto;
        min-height: 280px;
      }

      .card-image-wrapper {
        height: 160px;
        flex-shrink: 0;
      }

      .card-img {
        object-fit: cover;
        object-position: center;
      }

      .card-body {
        padding: 12px 14px 14px;
        gap: 6px;
        flex: 1;
        min-height: 0;
      }

      .card-heading {
        font-size: 1rem;
        font-weight: 600;
        -webkit-line-clamp: 2;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .card-text {
        font-size: 0.85rem;
        line-height: 1.5;
        -webkit-line-clamp: 3;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .top-card:active {
        transform: scale(0.98);
      }
    }

    /* Extra small screens */
    @media (max-width: 360px) {
      .top-card {
        min-height: 260px;
      }

      .card-image-wrapper {
        height: 140px;
      }

      .card-body {
        padding: 10px 12px 12px;
      }

      .card-heading {
        font-size: 0.95rem;
        -webkit-line-clamp: 2;
      }

      .card-text {
        font-size: 0.8rem;
        -webkit-line-clamp: 2;
        line-height: 1.4;
      }
    }
  `]
})
export class TopCardComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description?: string;
  @Input() isActive: boolean = false;
  @Output() hover = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();

  onHover() {
    this.hover.emit();
  }

  onLeave() {
    this.leave.emit();
  }
}
