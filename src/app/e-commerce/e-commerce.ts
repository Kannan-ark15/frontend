import { Component, inject } from '@angular/core';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcase } from '../project-showcase/project-showcase';
import { ProfileService } from '../profile-page/profile-service';
import { Router } from '@angular/router';

export const ECOMMERCE_NETWORKING_PROJECT: ProjectShowcaseData = {
  title: 'E-Commerce Website',
  subtitle: '',
  description:
    'This began as a straightforward MERN e-commerce website, but its true value emerged only after deploying it to the cloud. What looked like a normal full-stack website became a practical exploration of DNS, routing, virtual networks, and how internet traffic actually reaches a running application.',

  techStack: ['MERN','Cloud Hosting', 'Nginx', 'DNS'],
  videoUrl: 'assets/project/videos/cn.mp4',
  badge: 'FULL STACK + NETWORKING',

  chapters: [
    {
      id: 1,
      title: 'The Spark',
      content:
        'The project began as a simple MERN-based e-commerce website. But soon, the curiosity shifted from just building the features to understanding how the same site would behave once it was actually live on the internet. That shift turned this small assignment into something far more interesting.',
      image: 'assets/project/e-commerce/act-1.webp',
      color: '#ff6e6e'
    },

    {
      id: 2,
      title: 'Foundations of the Stack',
      content:
        'The application used a familiar setup—React for the UI, Express for the backend, and MongoDB Atlas for storage. Even though the architecture was simple, it clearly showed how each request moves through different layers, why latency happens, and how APIs work smoothly only when everything stays stateless and clean.',
      image: 'assets/project/e-commerce/act-2.webp',
      color: '#ff5b5b'
    },

    {
      id: 3,
      title: ' Building the Storefront',
      content:
        'The main features were built next: browsing products, login, and cart flow. While they weren’t complicated, they helped highlight how HTTP requests behave, how authentication is handled, and how a backend deals with multiple calls at once. It was a simple store, but it taught practical networking lessons hidden inside everyday APIs.',
      image: 'assets/project/e-commerce/act-3.webp',
      color: '#ff4949'
    },

    {
      id: 4,
      title: 'The Frontend Journey',
      content:
        'React Router handled navigation without reloading pages, which made the site feel faster and more responsive. It also showed how modern frontend frameworks reduce unnecessary network calls, load only what’s needed, and keep the browser and server communication light.',
      image: 'assets/project/e-commerce/act-4.webp',
      color: '#ff3636'
    },

    {
      id: 5,
      title: 'Awakening the Cloud',
      content:
        'Deployment was where everything came together. A custom domain pointed to the server using DNS, and Nginx acted as a reverse proxy to route traffic correctly. The app ran inside a cloud network with controlled ports and firewall rules, and the backend connected to MongoDB Atlas securely. Seeing the website run publicly made the whole networking side feel real for the first time.',
      image: 'assets/project/e-commerce/act-5.webp',
      color: '#ff2525'
    },

    {
      id: 6,
      title: 'Seeing the Internet from the Inside',
      content:
        'Once the site was live, everything behaved differently than localhost. There were small delays, routing changes, and real users accessing it from different regions. Watching how the server handled multiple requests, how Nginx forwarded traffic, and how the cloud VM acted inside its virtual network gave a clearer picture of how apps actually run on the internet.',
      image: 'assets/project/e-commerce/act-6.webp',
      color: '#ff1717'
    },

    {
      id: 7,
      title: 'Realizations That Stayed',
      content:
        'What began as a simple MERN project turned into a hands-on lesson about cloud networking. It made concepts like DNS, routing, reverse proxies, and virtual networks feel practical instead of theoretical. It proved that even a small website can teach a lot once it steps out of localhost and faces real-world traffic.',
      image: 'assets/project/e-commerce/act-7.webp',
      color: '#ff0a0a'
    }
  ]
};

@Component({
  selector: 'app-e-commerce',
  imports: [AppNavbarComponent,ProjectShowcase],
  template:`<app-navbar [menuItems]="menuItems"></app-navbar>
    <app-project-showcase [projectData]="sentimentProject"></app-project-showcase>
  `
})
export class ECommerce {
  router=inject(Router)
  profileService=inject(ProfileService);
  sentimentProject = ECOMMERCE_NETWORKING_PROJECT;
  profile=''
  menuItems:any[]=[];

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
      { label: 'Experience', route: `/${this.profile}/experience`,section:'Experience' },
      { label: 'Skills', route: `/${this.profile}/skills`,section:'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

  }
}
