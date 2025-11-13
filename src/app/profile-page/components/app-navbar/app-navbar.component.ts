// app-navbar.component.ts - With optional scroll effect
import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

export interface MenuItem {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // app-navbar.component.ts - Updated template section
template: `
  <nav class="navbar" [class.scrolled]="isScrolled">
    <div class="navbar-container">
      <div class="logo-section">
        <a [routerLink]="logoClickRoute" class="logo">K</a>
        <a [routerLink]="logoClickRoute" class="switch-user-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Switch User</span>
        </a>
      </div>

      <button class="hamburger" [class.active]="isMenuOpen" (click)="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="nav-menu" [class.active]="isMenuOpen">
        <li *ngFor="let item of menuItems">
          <!-- For fragment links: NO routerLinkActive -->
          <a *ngIf="item.fragment"
             [routerLink]="[item.route]"
             [fragment]="item.fragment"
             (click)="closeMenu()">
            {{ item.label }}
          </a>
          
          <!-- For regular route links: WITH routerLinkActive -->
          <a *ngIf="!item.fragment"
             [routerLink]="item.route"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact: true}"
             (click)="closeMenu()">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
`,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 68px;
      background: transparent;
      z-index: 1000;
      transition: all 0.3s ease;
    }

    /* Background appears when scrolled past 50px */
 
    .navbar-container {
      max-width: 1920px;
      margin: 0 auto;
      padding: 0 4%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .logo {
      font-size: 2.5rem;
      font-weight: 900;
      color: #e50914;
      text-decoration: none;
      font-family: 'Poppins', 'Impact', sans-serif;
      letter-spacing: 2px;
      transition: transform 0.3s ease;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
    }

    .logo:hover,
    .logo:active {
      transform: scale(1.1);
    }

    .switch-user-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(229, 9, 20, 0.5);
      border-radius: 4px;
      color: #e5e5e5;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .switch-user-btn svg {
      transition: transform 0.3s ease;
    }

    .switch-user-btn:hover,
    .switch-user-btn:active {
      color: #fff;
      transform: translateY(-2px);
    }

    .switch-user-btn:hover,
    .switch-user-btn:active
    svg {
      transform: scale(1.1);
    }

    .switch-user-btn:active {
      transform: translateY(0);
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
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
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
      text-shadow: 1px 1px 6px rgba(229, 9, 20, 0.6);
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
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
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
      .navbar{
            background: linear-gradient(45deg, black, transparent);
      }
      .hamburger {
        display: flex;
      }

      .logo-section {
        gap: 12px;
      }

      .logo {
        font-size: 2rem;
      }

      .switch-user-btn span {
        display: none;
      }

      .switch-user-btn {
        padding: 8px 12px;
        min-width: unset;
      }

      .nav-menu {
        position: fixed;
        right: -100%;
        top: 68px;
        flex-direction: column;
        width: 100%;
        text-align: center;
        transition: right 0.3s ease;
        gap: 0;
        padding: 20px 0;
      }

      .nav-menu.active {
        right: 0;
        background: linear-gradient(45deg, black, transparent);
      }

      .nav-menu li {
        padding: 16px 0;
      }

      .nav-menu li a::after {
        bottom: 0;
      }
    }

    @media (max-width: 480px) {
      .switch-user-btn {
        padding: 6px 10px;
      }

      .switch-user-btn svg {
        width: 18px;
        height: 18px;
      }
    }
  `]
})
export class AppNavbarComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() logoClickRoute = '/';
  isMenuOpen = false;
  isScrolled = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add background when scrolled past 50px
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}