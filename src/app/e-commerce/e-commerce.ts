import { Component, inject, signal } from '@angular/core';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcase } from '../project-showcase/project-showcase';
import { ProfileService } from '../profile-page/profile-service';
import { Router } from '@angular/router';

export const ECOMMERCE_NETWORKING_PROJECT: ProjectShowcaseData = {
  title: 'E-Commerce Website',
  subtitle: '',
  description:
    'This began as a straightforward <span class="highlight">MERN e-commerce website</span>, but its true value emerged only after <span class="highlight">deploying it to the cloud</span>. What looked like a normal full-stack website became a <span class="highlight">practical exploration of DNS, routing, virtual networks</span>, and how <span class="highlight">internet traffic actually reaches a running application</span>.',

  techStack: ['MERN','Cloud Hosting', 'Nginx', 'DNS'],
  videoUrl: 'assets/project/videos/cn.mp4',
  badge: 'FULL STACK + NETWORKING',

  chapters: [
    {
      id: 1,
      title: 'The Spark',
      content:
        `The project began as a simple <span class="highlight">MERN-based e-commerce website</span>. But soon, the curiosity shifted from just building the features to understanding how the same site would behave once it was <span class="highlight">actually live on the internet</span>. That shift turned this <span class="highlight">small assignment into something far more interesting</span>.`,
      image: 'assets/project/e-commerce/act-1.webp',
      color: '#ff6e6e'
    },

    {
      id: 2,
      title: 'Foundations of the Stack',
      content:
        `The application used a familiar setup—<span class="highlight">React for the UI, Express for the backend, and MongoDB Atlas for storage</span>. Even though the architecture was simple, it clearly showed how <span class="highlight">each request moves through different layers</span>, why <span class="highlight">latency happens</span>, and how <span class="highlight">APIs work smoothly only when everything stays stateless and clean</span>.`,
      image: 'assets/project/e-commerce/act-2.webp',
      color: '#ff5b5b'
    },

    {
      id: 3,
      title: 'Building the Storefront',
      content:
        `The main features were built next: <span class="highlight">browsing products, login, and cart flow</span>. While they weren't complicated, they helped highlight how <span class="highlight">HTTP requests behave</span>, how <span class="highlight">authentication is handled</span>, and how a <span class="highlight">backend deals with multiple calls at once</span>. It was a simple store, but it taught <span class="highlight">practical networking lessons hidden inside everyday APIs</span>.`,
      image: 'assets/project/e-commerce/act-3.webp',
      color: '#ff4949'
    },

    {
      id: 4,
      title: 'The Frontend Journey',
      content:
        `<span class="highlight">React Router handled navigation without reloading pages</span>, which made the site <span class="highlight">feel faster and more responsive</span>. It also showed how modern frontend frameworks <span class="highlight">reduce unnecessary network calls</span>, <span class="highlight">load only what's needed</span>, and keep the <span class="highlight">browser and server communication light</span>.`,
      image: 'assets/project/e-commerce/act-4.webp',
      color: '#ff3636'
    },

    {
      id: 5,
      title: 'Awakening the Cloud',
      content:
        `Deployment was where everything came together. A <span class="highlight">custom domain pointed to the server using DNS</span>, and <span class="highlight">Nginx acted as a reverse proxy to route traffic correctly</span>. The app ran inside a <span class="highlight">cloud network with controlled ports and firewall rules</span>, and the backend connected to <span class="highlight">MongoDB Atlas securely</span>. Seeing the website <span class="highlight">run publicly made the whole networking side feel real</span> for the first time.`,
      image: 'assets/project/e-commerce/act-5.webp',
      color: '#ff2525'
    },

    {
      id: 6,
      title: 'Seeing the Internet from the Inside',
      content:
        `Once the site was live, everything behaved <span class="highlight">differently than localhost</span>. There were <span class="highlight">small delays, routing changes, and real users accessing it from different regions</span>. Watching how the <span class="highlight">server handled multiple requests</span>, how <span class="highlight">Nginx forwarded traffic</span>, and how the <span class="highlight">cloud VM acted inside its virtual network</span> gave a clearer picture of <span class="highlight">how apps actually run on the internet</span>.`,
      image: 'assets/project/e-commerce/act-6.webp',
      color: '#ff1717'
    },

    {
      id: 7,
      title: 'Realizations That Stayed',
      content:
        `What began as a simple MERN project turned into a <span class="highlight">hands-on lesson about cloud networking</span>. It made concepts like <span class="highlight">DNS, routing, reverse proxies, and virtual networks feel practical instead of theoretical</span>. It proved that even a <span class="highlight">small website can teach a lot once it steps out of localhost and faces real-world traffic</span>.`,
      image: 'assets/project/e-commerce/act-7.webp',
      color: '#ff0a0a'
    }
  ]
};


@Component({
  selector: 'app-e-commerce',
  imports: [AppNavbarComponent,ProjectShowcase],
  template:`<app-navbar [menuItems]=" allMenuItems()"></app-navbar>
    <app-project-showcase [projectData]="sentimentProject"></app-project-showcase>
  `
})
export class ECommerce {
  router=inject(Router)
  profileService=inject(ProfileService);
  sentimentProject = ECOMMERCE_NETWORKING_PROJECT;
  profile=''
  menuItems:any[]=[];
  allMenuItems= signal<any[]>([]);
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

       this.allMenuItems.set(
      this.menuItems.filter((item: { section: string; }) => 
        !item.section || !this.profileService.isSectionRestricted(item.section,this.profile)
      )
    );

  }
}
