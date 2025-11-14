import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProfileService } from '../profile-page/profile-service';
import { Router } from '@angular/router';

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
  allMenuItems = [
    {label:'Home', route:'/profile'},
    { label: 'Experience', route: '/experience', section: 'Experience' },
    { label: 'Skills', route: '/skills', section: 'Skills' },
    { label: 'Projects', route: '/profile', fragment: 'projects-section' },
    { label: 'Contact Me',route: '/profile', fragment: 'contact-id' },
  ];

  skills: Skill[] = [
    {
      name: 'Python',
      icon: 'assets/icons/python.png',
      description: 'Backend development, Data Science, Machine Learning',
      color:'#FFD43B',
      level: 90
    },
    {
      name: 'Java',
      icon: 'assets/icons/java.png',
      description: 'Enterprise applications, Spring Framework, Microservices',
      color: '#ED8B00',
      level: 85
    },
    {
      name: 'JavaScript',
      icon: 'assets/icons/javascript.png',
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
      icon: 'assets/icons/springboot.png',
      description: 'RESTful APIs, Microservices, Cloud-native applications',
      color: '#6DB33F',
      level: 82
    },
    {
    name: 'MySQL',
    icon: 'assets/icons/mysql.png',
    description: 'Database design, optimization, queries, indexing, joins',
    color: '#00758F',
    level: 80
  },
  {
    name: 'React',
    icon: 'assets/icons/react.png',
    description: 'Component-based architecture, UI engineering, hooks & state management',
    color: '#61DBFB',
    level: 85
  },
  {
    name: 'Node.js',
    icon: 'assets/icons/nodejs.png',
    description: 'Backend APIs,authentication, scalable networking applications',
    color: '#68A063',
    level: 78
  },
  {
    name: 'Machine Learning',
    icon: 'assets/icons/machinelearning.png',
    description: 'Deep Learning, LSTMs, CNNs, model training & evaluation',
    color: '#FFB800',
    level: 75
  }
  ];
  private profileService = inject(ProfileService);
  private router = inject(Router);
  currentSkillIndex = signal(0);
  showAllSkills = signal(false);
  isTransitioning = signal(false);
  private lastScrollTime = 0;
  private scrollDebounceTime = 1000; // ms
  private touchStartY: number | null = null;
  scrollDirection = signal<'forward' | 'backward'>('forward');
  menuItems = signal<any[]>([]);

  ngOnInit() {
    this.currentSkillIndex.set(0);
    this.menuItems.set(
      this.allMenuItems.filter(item => 
        !item.section || !this.profileService.isSecretionRestricted(item.section)
      )
    );
  }

@HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (!this.showAllSkills()) {
      event.preventDefault();
      
      if (event.deltaY > 0) {
        this.scrollDirection.set('forward');
        this.handleScrollDown();
      } 
      else if (event.deltaY < 0) {
        this.scrollDirection.set('backward');
        this.handleScrollUp();
      }
    }
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
    
    // Swipe up (positive delta) - move forward
    if (deltaY > 50) {
      this.handleScrollDown();
      this.touchStartY = null;
    }
    // Swipe down (negative delta) - move backward
    else if (deltaY < -50) {
      this.handleScrollUp();
      this.touchStartY = null;
    }
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
  }
}

