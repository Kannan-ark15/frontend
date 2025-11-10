import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="top-card" (click)="clicked.emit()">
      <div class="card-image-wrapper">
        <img [src]="image" [alt]="title" class="card-image" loading="lazy" />
        <div class="card-badge" [attr.data-index]="index">{{ index }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .top-card {
        position: relative;
        cursor: pointer;
        border-radius: 10px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        background: #000;
      }

      .top-card:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(229, 9, 20, 0.4);
        z-index: 10;
      }

      .card-image-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 140%;
        overflow: hidden;
      }

      .card-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .top-card:hover .card-image {
        transform: scale(1.1);
      }

      .card-badge {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-family: 'Netflix Sans', sans-serif;
        font-size: 4rem;
        font-weight: 900;
        color: transparent; /* Makes the fill invisible */
        -webkit-text-stroke: 2px white; /* outer stroke */
        text-stroke: 2px white; /* support for other browsers */
        letter-spacing: 2px;
        z-index: 10;
      }

      /* optional: add subtle double-line illusion */
      .card-badge::after {
        content: attr(data-index);
        position: absolute;
        top: 0;
        left: 0;
        color: transparent;
        -webkit-text-stroke: 6px rgba(255, 255, 255, 0.4);
        z-index: -1;
      }

      @media (max-width: 768px) {
        .card-badge {
          font-size: 2.5rem;
          padding: 2px 12px;
          bottom: 6px;
          left: 6px;
        }
      }
    `,
  ],
})
export class TopCardComponent {
  @Input() image = '';
  @Input() title = '';
  @Input() index = 1;
  @Output() clicked = new EventEmitter<void>();
}