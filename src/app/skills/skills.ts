import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';

export interface Skill {
  name: string;
  icon: string;
  description: string;
  color: string;
  level: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, AppNavbarComponent],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit {
  menuItems = [
    { label: 'Profession', route: '/profession' },
    { label: 'Skills', route: '/skills' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact Me', route: '/contact' }
  ];

  skills: Skill[] = [
    {
      name: 'Python',
      icon: '🐍',
      description: 'Backend development, Data Science, Machine Learning',
      color: 'Red',
      level: 90
    },
    {
      name: 'Java',
      icon: '☕',
      description: 'Enterprise applications, Spring Framework, Microservices',
      color: '#ED8B00',
      level: 85
    },
    {
      name: 'JavaScript',
      icon: 'assets/icons/angular-2.png',
      description: 'Full-stack development, Modern frameworks, Node.js',
      color: '#F7DF1E',
      level: 95
    },
    {
      name: 'Angular',
      icon: 'assets/icons/angular.png',
      description: 'Single Page Applications, Component-based architecture',
      color: '#DD0031',
      level: 88
    },
    {
      name: 'Spring Boot',
      icon: '🍃',
      description: 'RESTful APIs, Microservices, Cloud-native applications',
      color: '#6DB33F',
      level: 82
    }
  ];

  currentSkillIndex = signal(0);
  showAllSkills = signal(false);
  isTransitioning = signal(false);
  private lastScrollTime = 0;
  scrollProgress = signal(0);
  private accumulatedScroll = 0;
  private scrollThreshold = 800;
  private scrollDebounceTime = 1000; // ms
  private touchStartY: number | null = null;
    scrollDirection = signal<'forward' | 'backward'>('forward');

  ngOnInit() {
      this.currentSkillIndex.set(0);
    this.scrollProgress.set(0);
  }

@HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (!this.showAllSkills()) {
      event.preventDefault();
      this.accumulatedScroll += Math.abs(event.deltaY);
      const progress = Math.min((this.accumulatedScroll / this.scrollThreshold) * 100, 100);
      this.scrollProgress.set(progress);
      if (event.deltaY > 0) {
          this.scrollDirection.set('forward');
        
        // When progress reaches 100%, move to next skill
        if (progress >= 100) {
          this.completeTransition('forward');
        }
      } else if (event.deltaY < 0 && this.currentSkillIndex() > 0) {
        this.scrollDirection.set('backward');
        
        // Reverse the progress for backward scroll
        const reverseProgress = Math.max(100 - progress, 0);
        this.scrollProgress.set(reverseProgress);
        
        if (reverseProgress <= 0) {
          this.completeTransition('backward');
        }
      } 
    }
  }
  private completeTransition(direction: 'forward' | 'backward') {
    if (direction === 'forward') {
      if (this.currentSkillIndex() >= this.skills.length - 1) {
        // Last skill - go to grid
        this.showAllSkills.set(true);
      } else {
        // Move to next skill
        this.currentSkillIndex.set(this.currentSkillIndex() + 1);
      }
    } else {
      // Move to previous skill
      this.currentSkillIndex.set(this.currentSkillIndex() - 1);
    }
    
    // Reset scroll accumulation
    this.accumulatedScroll = 0;
    this.scrollProgress.set(0);
  }


  private handleScrollUp() {
    const now = Date.now();
    
    if (now - this.lastScrollTime < this.scrollDebounceTime) {
      return;
    }
    
    if (this.isTransitioning()) {
      return;
    }
    
    if (this.currentSkillIndex() > 0) {
      this.lastScrollTime = now;
      this.isTransitioning.set(true);
      
      // Move to previous skill after backward zoom animation
      setTimeout(() => {
        this.currentSkillIndex.set(this.currentSkillIndex() - 1);
        this.isTransitioning.set(false);
      }, 1200);
    }
  }




  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (!this.showAllSkills()) {
      this.touchStartY = event.touches[0].clientY;
    }
  }

 @HostListener('touchmove', ['$event'])
onTouchMove(event: TouchEvent) {
  if (!this.showAllSkills() && this.touchStartY !== null) {
    event.preventDefault();
    const touchEndY = event.touches[0].clientY;
    const deltaY = this.touchStartY - touchEndY;
    this.accumulatedScroll += Math.abs(deltaY);
    const progress = Math.min((this.accumulatedScroll / this.scrollThreshold) * 100, 100);
    this.scrollProgress.set(progress);
      
      if (deltaY > 0) {
        this.scrollDirection.set('forward');
        if (progress >= 100) {
          this.completeTransition('forward');
          this.touchStartY = null;
        }
      } else if (deltaY < 0 && this.currentSkillIndex() > 0) {
        this.scrollDirection.set('backward');
        const reverseProgress = Math.max(100 - progress, 0);
        this.scrollProgress.set(reverseProgress);
        if (reverseProgress <= 0) {
          this.completeTransition('backward');
          this.touchStartY = null;
        }
      }
      this.touchStartY = touchEndY;
  }
}


  private handleScrollDown() {
    const now = Date.now();
    
    // Debounce
    if (now - this.lastScrollTime < this.scrollDebounceTime) {
      return;
    }

    if (this.isTransitioning()) {
      return;
    }

    this.lastScrollTime = now;
    this.isTransitioning.set(true);

    // Check if we're at the last skill
    if (this.currentSkillIndex() >= this.skills.length - 1) {
      // Transition to grid view
      setTimeout(() => {
        this.showAllSkills.set(true);
        this.isTransitioning.set(false);
      }, 1200);
    } else {
      // Move to next skill
      setTimeout(() => {
        this.currentSkillIndex.set(this.currentSkillIndex() + 1);
        this.isTransitioning.set(false);
      }, 1200);
    }
  }

  getSkillProgress(level: number): string {
    return `${level}%`;
  }

  backToImmersive() {
    this.showAllSkills.set(false);
    this.currentSkillIndex.set(0);
    this.scrollProgress.set(0);
    this.accumulatedScroll = 0;
  }
}

