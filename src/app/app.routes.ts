import { Routes } from '@angular/router';
import { profileGuard } from './profile-page/profile-guard';
export const routes: Routes = [
    {path: '', loadComponent: () => import('./landing-page/landing-page.component').then(m => m.LandingPageComponent), data: { preload: true }},
    {path: 'profile', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    
    // Profile-based routes with parameter
    {
      path: ':profile/home',
      loadComponent: () => import('./profile-page/profile-page').then(m => m.ProfilePage)
    },
    {
      path: ':profile/about', 
      loadComponent: () => import('./about/about').then(m => m.About),
      canActivate: [profileGuard],
      data: { section: 'About' }
    },
    {
      path: ':profile/skills', 
      loadComponent: () => import('./skills/skills').then(m => m.Skills),
      canActivate: [profileGuard],
      data: { section: 'Skills' }
    },
    {
      path: ':profile/experience', 
      loadComponent: () => import('./experience/experience').then(m => m.Experience),
      canActivate: [profileGuard],
      data: { section: 'Experience' }
    },
    {
      path: ':profile/certifications', 
      loadComponent: () => import('./certifications/certifications').then(m => m.Certifications),
      canActivate: [profileGuard],
      data: { section: 'Certifications' }
    },
    {path: ':profile/codex', loadComponent: () => import('./game/game').then(m => m.Game)},
    {path: ':profile/bonus', loadComponent: () => import('./portfolio-compare/portfolio-compare').then(m => m.PortfolioCompare)},
    {path: ':profile/sql-project', loadComponent: () => import('./sql-project/sql-project').then(m => m.SqlProject)},
    {path: ':profile/movie-recommendation', loadComponent: () => import('./movie-recommendation/movie-recommendation').then(m => m.ProjectsComponent)},
    {path: ':profile/e-commerce-project', loadComponent: () => import('./e-commerce/e-commerce').then(m => m.ECommerce)},
];