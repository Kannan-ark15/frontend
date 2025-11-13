import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-netflix-intro',
  standalone: true,  // CRITICAL: Make it standalone
  imports: [CommonModule], 
  templateUrl: './netflix-intro.component.html',
  styleUrls: ['./netflix-intro.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class NetflixIntroComponent implements OnInit, AfterViewInit {
  @Input() letter: 'K' = 'K';
  private animationReady = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    console.log('Netflix intro initialized with letter:', this.letter);
  }
   ngAfterViewInit() {
    // Simple reflow - animations will start naturally since component just got created
    requestAnimationFrame(() => {
    void this.elementRef.nativeElement.offsetHeight;
      this.cdr.detectChanges();
      console.log('Netflix intro animations starting NOW');
    });
  }
}
