// portfolio-comparison.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareLogic } from '../compare-logic/compare-logic';
import { ProfileService } from '../profile-page/profile-service';
import { Router } from '@angular/router';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';

@Component({
  selector: 'app-portfolio-comparison',
  standalone: true,
  imports: [CommonModule, CompareLogic,AppNavbarComponent],
  template: `
     <app-navbar [menuItems]="menuItems"></app-navbar>
    <div class="comparison-grid-container">
      <h1 class="main-title">Portfolio Comparisons</h1>
      
      <div class="comparison-grid">
        
        <!-- Grid Item 1: Two comparisons side-by-side -->
        <div class="grid-item">
          <div class="item-header">
            <h2>Homepage And About Sections</h2>
          </div>
          
          <div class="dual-compare-wrapper">
            <!-- First Comparison -->
            <div class="compare-section">
              <h3 class="section-title">Home Section</h3>
              <app-compare-logic
                [oldImage]="'assets/portfolio/home.webp'"
                [newImage]="'assets/portfolio/home_new.webp'"
                [mode]="'vertical'"
                [enableScroll]="true"
                [height]="'400px'">
              </app-compare-logic>
            </div>

            <!-- Second Comparison -->
            <div class="compare-section">
              <h3 class="section-title">About Section</h3>
              <app-compare-logic
                [oldImage]="'assets/portfolio/about.webp'"
                [newImage]="'assets/portfolio/about_new.webp'"
                [mode]="'vertical'"
                [enableScroll]="true"
                [height]="'400px'">
              </app-compare-logic>
            </div>
          </div>
        </div>

        <!-- Grid Item 2: Two long screenshots side-by-side -->
        <div class="grid-item">
          <div class="item-header">
            <h2>Project and Contact Redesigns</h2>
          </div>
          
          <div class="dual-compare-wrapper">
            <!-- First Comparison -->
            <div class="compare-section">
              <h3 class="section-title">Project Page</h3>
              <app-compare-logic
                [oldImage]="'assets/portfolio/project.webp'"
                [newImage]="'assets/portfolio/project_new.webp'"
                [mode]="'vertical'"
                [enableScroll]="true"
                [maxHeight]="'600px'">
              </app-compare-logic>
            </div>

            <!-- Second Comparison -->
            <div class="compare-section">
              <h3 class="section-title">Contact Page</h3>
              <app-compare-logic
                [oldImage]="'assets/portfolio/contact.webp'"
                [newImage]="'assets/portfolio/contact_new.webp'"
                [mode]="'vertical'"
                [enableScroll]="true"
                [maxHeight]="'600px'">
              </app-compare-logic>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .comparison-grid-container {
      max-width: 1800px;
      margin: 0 auto;
      padding: 60px 20px;
      background: linear-gradient(135deg, #0a0a1a 0%, #0f0f2e 100%);
      min-height: 100vh;
    }

    .main-title {
      font-size: 3rem;
      font-weight: 900;
      text-align: center;
      margin-bottom: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(900px, 1fr));
      gap: 40px;
    }

    .grid-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 30px;
      transition: all 0.3s ease;
    }

    .grid-item:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(102, 126, 234, 0.3);
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .item-header {
      margin-bottom: 30px;
      text-align: center;
    }

    .item-header h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
    }

    .item-header p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* Side-by-side layout - ALWAYS */
    .dual-compare-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      align-items: start;
    }

    .compare-section {
      position: relative;
    }

    .section-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 15px;
      padding-left: 12px;
      border-left: 3px solid #667eea;
    }

    /* Make sure nested compare components don't add extra padding */
    .compare-section ::ng-deep .portfolio-compare-wrapper {
      padding: 0;
      max-width: 100%;
    }

    /* Hide toggle buttons if you want uniform appearance */
    .compare-section ::ng-deep .toggle-container {
      margin-bottom: 15px;
    }

    /* Responsive adjustments */
    @media (max-width: 1600px) {
      .comparison-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1200px) {
      .dual-compare-wrapper {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }

    @media (max-width: 768px) {
      .comparison-grid-container {
        padding: 40px 15px;
      }

      .main-title {
        font-size: 2rem;
        margin-bottom: 40px;
      }

      .grid-item {
        padding: 20px;
      }

      .item-header h2 {
        font-size: 1.4rem;
      }

      .item-header p {
        font-size: 0.85rem;
      }

      .section-title {
        font-size: 1rem;
        margin-bottom: 12px;
      }
    }

    @media (max-width: 480px) {
      .grid-item {
        padding: 15px;
      }

      .section-title {
        font-size: 0.9rem;
      }
    }
  `]
})
export class PortfolioCompare {

    profile=''
  menuItems:any[]=[];
    router=inject(Router)
  profileService=inject(ProfileService)
  ngOnInit(){
     const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|anonymus)\//);
    
    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }

    // Now set menu items with the correct profile
    this.menuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

  }
}