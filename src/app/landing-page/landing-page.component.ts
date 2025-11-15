import { ChangeDetectorRef, Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NetflixIntroComponent } from '../netflix-intro/netflix-intro.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NetflixIntroComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  showAnimation = false; // CRITICAL: Must start as false
  private audio: HTMLAudioElement;

  @ViewChild('animationWrapper') animationWrapper?: ElementRef;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.audio = new Audio();
    this.audio.src = 'assets/audio/audio.mp3';
    this.audio.preload = 'auto';

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });
  }

    async startAnimation() {
    console.log('🎬 ANIMATION TRIGGERED - Starting sequence');
    
    // CRITICAL: Create the component
    this.showAnimation = true;
    console.log('✅ showAnimation set to TRUE');
    
    // Force Angular to detect changes and render component
    this.cdr.detectChanges();
    console.log('✅ Change detection triggered');
    
    // Wait for component to be fully in DOM
    await this.delay(550);
    console.log('✅ Component should be in DOM now');
    // Play audio
    this.audio.play().then(() => {
      console.log('🎵 Audio playback started');
    }).catch((error) => {
      console.error('❌ Audio playback failed:', error);
    });


    setTimeout(() => {
      console.log('🚀 Navigating to /home');
      this.router.navigate(['/profile']);
    }, 4000);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
  }
}
