import { Component } from '@angular/core';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { CommonModule } from '@angular/common';
import { HeroVideoComponent } from './components/hero-video/hero-video.component';
import { TopCardsGridComponent } from './components/top-cards-grid/top-cards.component';

export interface TopItem {
  id: number;
  image: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    AppNavbarComponent,
    HeroVideoComponent,
    TopCardsGridComponent
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  menuItems = [
    { label: 'Profession', route: '/profession' },
    { label: 'Skills', route: '/skills' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact Me', route: '/contact' }
  ];

  topItems: TopItem[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
      title: 'Project Alpha',
      description: 'E-commerce platform'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=600&fit=crop',
      title: 'Dashboard Pro',
      description: 'Analytics dashboard'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop',
      title: 'Mobile App',
      description: 'Social networking'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop',
      title: 'Cloud Service',
      description: 'Infrastructure'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop',
      title: 'API Gateway',
      description: 'Microservices'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop',
      title: 'AI Platform',
      description: 'Machine learning'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=600&fit=crop',
      title: 'DevOps Tools',
      description: 'CI/CD pipeline'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=600&fit=crop',
      title: 'Team Portal',
      description: 'Collaboration'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop',
      title: 'Security Suite',
      description: 'Authentication'
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop',
      title: 'Code Editor',
      description: 'Development tool'
    }
  ];

  videoSrc = 'assets/videos/hero-video.mp4'; // Replace with your video
}
