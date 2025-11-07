import { Component } from '@angular/core';
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
  showAnimation = false;
  private audio: HTMLAudioElement;

  constructor(private router: Router) {
    this.audio = new Audio();
    this.audio.src = 'assets/audio/audio.mp3';
    this.audio.preload = 'auto';
    // Add event listeners for debugging
    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      console.error('Error code:', this.audio.error?.code);
      console.error('Error message:', this.audio.error?.message);
    });
    this.audio.addEventListener('canplaythrough', () => {
      console.log('Audio loaded and ready to play');
    });
    this.audio.load();
  }

  private async playSound() {
    try {
      if (this.audio) {
        // Reset audio to start if it was already played
        this.audio.currentTime = 0;
        this.audio.volume = 1;
        await this.audio.play();
        console.log('Audio playing successfully');
      }
    } catch (err) {
      console.error('Error playing audio:', err);
      // Try loading again in case the audio wasn't loaded properly
      this.audio.load();
      try {
        await this.audio.play();
      } catch (retryErr) {
        console.error('Retry failed:', retryErr);
      }
    }
  }

  async startAnimation() {
    this.showAnimation = true;

    // Play sound immediately when animation starts
    try {
      await this.playSound();
    } catch (err) {
      console.error('Error playing audio:', err);
    }
    
    // Wait for animation to complete (4s) then navigate
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 4000);
  }
}