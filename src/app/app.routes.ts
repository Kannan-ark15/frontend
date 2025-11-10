import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { About } from './about/about';
import { Experience } from './experience/experience';
import { Skills } from './skills/skills';
import { Certifications } from './certifications/certifications';
export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'home',loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    {path:'profile', loadComponent: () => import('./profile-page/profile-page').then(m => m.ProfilePage)},
    {path: 'about', loadComponent: () => import('./about/about').then(m => m.About)},
    {path:'skills', loadComponent: () => import('./skills/skills').then(m => m.Skills)},
    {path:'experience', loadComponent: () => import('./experience/experience').then(m => m.Experience)},
    {path:'certifications', loadComponent: () => import('./certifications/certifications').then(m => m.Certifications)}
]
