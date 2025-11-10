import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCardComponent } from '../top-card/top-card.component';

export interface TopItem {
  id: number;
  image: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-top-cards-grid',
  standalone: true,
  imports: [CommonModule, TopCardComponent],
  template: `
    <div class="cards-section">
      <h2 class="section-title">Top 10</h2>

      <div class="carousel-container">
        <!-- Left Scroll Button -->
        <button class="scroll-btn left" (click)="scrollLeft()">&lt;</button>

        <!-- Scrollable Cards -->
        <div class="cards-scroll-wrapper" #scrollContainer>
          <div class="cards-scroll">
            <app-top-card
              *ngFor="let item of items; let i = index"
              [image]="item.image"
              [title]="item.title"
              [index]="i + 1"
              (clicked)="onCardClick(item)">
            </app-top-card>
          </div>
        </div>

        <!-- Right Scroll Button -->
        <button class="scroll-btn right" (click)="scrollRight()">&gt;</button>
      </div>
    </div>
  `,
  styles: [`
    .cards-section {
      margin: 0 0 40px 0;
      position: relative;
    }

    .section-title {
      color: #fff;
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 20px;
      padding-left: 4px;
    }

    .carousel-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    /* Scroll buttons */
    .scroll-btn {
      background: transparent;
      color: #fff;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      width: 45px;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 10;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .scroll-btn:hover {
        background: transparent;
    }

    .scroll-btn.left {
      left: 0;
      border-radius: 0 8px 8px 0;
    }

    .scroll-btn.right {
      right: 0;
      border-radius: 8px 0 0 8px;
    }

    /* Scroll container */
    .cards-scroll-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
      width: 100%;
    }

    .cards-scroll-wrapper::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

    /* Horizontal cards layout */
    .cards-scroll {
      display: flex;
      gap: 12px;
      padding: 0 60px; /* add space so buttons don’t overlap */
    }

    app-top-card {
      flex: 0 0 180px;
      height: 240px;
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    app-top-card:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 1.4rem;
      }

      app-top-card {
        flex: 0 0 150px;
        height: 200px;
      }

      .scroll-btn {
        font-size: 1.5rem;
        width: 36px;
      }
    }
  `]
})
export class TopCardsGridComponent {
  @Input() items: TopItem[] = [];
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  onCardClick(item: TopItem) {
    console.log('Card clicked:', item);
    // Add navigation or modal logic here
  }
}
