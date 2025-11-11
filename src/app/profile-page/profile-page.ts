import { Component, signal } from '@angular/core';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { CommonModule } from '@angular/common';
import { HeroVideoComponent } from './components/hero-video/hero-video.component';
import { TopCardsGridComponent } from './components/top-cards-grid/top-cards.component';
import { Elements } from './elements/elements';
import { Card } from './elements/card.model';
import { ContactMe } from './contact-me/contact-me';

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
    TopCardsGridComponent,
    Elements,
    ContactMe
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  menuItems = [
    { label: 'Experience', route: '/experience' },
    { label: 'Skills', route: '/skills' },
    { label: 'Certifications', route: '/certifications' },
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
  ];

  videoSrc = 'assets/hero1.mp4';
  
    cards = signal<Card[]>([
    {
      id: 1,
      title: 'About',
      text: 'Learn more about my journey and background in software development.',
      imageUrl: 'https://picsum.photos/seed/about/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-writing-on-a-laptop-in-a-dark-room-4330-large.mp4'
    },
    {
      id: 2,
      title: 'Skills',
      text: 'Discover my technical skills and expertise in various technologies.',
      imageUrl: 'https://picsum.photos/seed/skills/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-a-man-sits-in-a-dark-room-and-works-on-a-computer-4328-large.mp4'
    },
    {
      id: 3,
      title: 'Experience',
      text: 'Explore my professional experience and career achievements.',
      imageUrl: 'https://picsum.photos/seed/experience/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-computer-keyboard-in-a-dark-room-4326-large.mp4'
    },
    {
      id: 4,
      title: 'Certifications',
      text: 'View my official certifications and professional credentials.',
      imageUrl: 'https://picsum.photos/seed/certs/800/1200',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-dark-office-4329-large.mp4'
    }
  ]);
}
