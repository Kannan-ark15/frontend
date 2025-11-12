import { Component, HostListener } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import * as AOS from 'aos';
@Component({
  selector: 'app-about',
  imports: [AppNavbarComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
    menuItems = [
    { label: 'Experience', route: '/experience' },
    { label: 'Skills', route: '/skills' },
    { label: 'Certifications', route: '/certifications' },
    { label: 'Contact Me', route: '/contact' }
  ];
  
 ngOnInit() {
    this.animateStats();
    this.observeElements();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.observeElements();
  }

  observeElements(): void {
    const elements = document.querySelectorAll(
      '.intro-content, .timeline-block, .skill-item, .principle, .stat-card'
    );
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;
      
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }

  animateStats(): void {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat: any) => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(stat);
    });
  }
}


