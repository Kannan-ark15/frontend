import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a [routerLink]="logoClickRoute" class="logo" aria-label="Home - K logo">
          K
        </a>
        
        <button class="hamburger" (click)="toggleMenu()" [class.active]="isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul class="nav-menu" [class.active]="isMenuOpen">
          <li *ngFor="let item of menuItems">
            <a [routerLink]="item.route" routerLinkActive="active" (click)="closeMenu()">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      width: 100%;
      height: 68px;
      background: linear-gradient(to bottom, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.7) 90%);
      backdrop-filter: blur(10px);
      z-index: 1000;
      border-bottom: 1px solid rgba(229, 9, 20, 0.2);
    }

    .navbar-container {
      max-width: 1920px;
      margin: 0 auto;
      padding: 0 4%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-size: 2.5rem;
      font-weight: 900;
      color: #e50914;
      text-decoration: none;
      font-family: 'Bebas Neue', 'Impact', sans-serif;
      letter-spacing: 2px;
      transition: transform 0.3s ease;
    }

    .logo:hover {
      transform: scale(1.1);
    }

    .nav-menu {
      display: flex;
      gap: 32px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-menu li a {
      color: #e5e5e5;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
    }

    .nav-menu li a::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 0;
      height: 2px;
      background: #e50914;
      transition: width 0.3s ease;
    }

    .nav-menu li a:hover,
    .nav-menu li a.active {
      color: #fff;
    }

    .nav-menu li a:hover::after,
    .nav-menu li a.active::after {
      width: 100%;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 30px;
      height: 25px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 10;
    }

    .hamburger span {
      width: 30px;
      height: 3px;
      background: #e50914;
      border-radius: 3px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translateY(10px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translateY(-10px);
    }

    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }

      .nav-menu {
        position: fixed;
        right: -100%;
        top: 68px;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.98);
        width: 100%;
        text-align: center;
        transition: right 0.3s ease;
        gap: 0;
        padding: 20px 0;
      }

      .nav-menu.active {
        right: 0;
      }

      .nav-menu li {
        padding: 16px 0;
      }

      .nav-menu li a::after {
        bottom: 0;
      }
    }
  `]
})
export class AppNavbarComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() logoClickRoute = '/';
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}