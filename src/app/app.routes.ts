import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'home',loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    {path:'profile', loadComponent: () => import('./profile-page/profile-page').then(m => m.ProfilePage)},
];
