import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { profileGuard } from './profile-page/profile-guard';
export const routes: Routes = [
    {path: '', loadComponent: () => import('./landing-page/landing-page.component').then(m => m.LandingPageComponent),data: { preload: true }},
    {path: 'home',loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    {path:'profile',loadComponent: () => import('./profile-page/profile-page').then(m => m.ProfilePage)},
     {
    path: 'about', 
    loadComponent: () => import('./about/about').then(m => m.About),
    canActivate: [profileGuard],
    data: { section: 'About' }
  },
  {
    path: 'skills', 
    loadComponent: () => import('./skills/skills').then(m => m.Skills),
    canActivate: [profileGuard],
    data: { section: 'Skills' }
  },
  {
    path: 'experience', 
    loadComponent: () => import('./experience/experience').then(m => m.Experience),
    canActivate: [profileGuard],
    data: { section: 'Experience' }
  },
    {path:'certifications', loadComponent: () => import('./certifications/certifications').then(m => m.Certifications)},
    {path:'sql-project', loadComponent: () => import('./sql-project/sql-project').then(m => m.SqlProject)},
    {path:'movie-recommendation', loadComponent: () => import('./movie-recommendation/movie-recommendation').then(m => m.ProjectsComponent)},
    {path:'e-commerce-project', loadComponent: () => import('./e-commerce/e-commerce').then(m => m.ECommerce)},
]
