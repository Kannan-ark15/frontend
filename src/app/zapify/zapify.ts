import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcase } from '../project-showcase/project-showcase';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { ProfileService } from '../profile-page/profile-service';

export const ZAPIFY_PROJECT: ProjectShowcaseData = {
  title: 'Zapify — AI Social Media Automation',
  subtitle: 'Turning Visitors into Subscribers',
  description:
    'Transforming a basic SaaS website into a <span class="highlight">conversion-focused landing page</span> that turns <span class="highlight">visitors into subscribers</span>.',
  techStack: ['UI/UX Design', 'Landing Page Revamp', 'Figma', 'Interactive Motion', 'Conversion Optimization'],
  videoUrl: 'assets/project/videos/zapify.mp4',
  badge: 'UI/UX + LANDING PAGE REVAMP',

  chapters: [
    {
      id: 1,
      title: 'Act 1: The First Impression',
      content:
        `Every product deserves a website that communicates its value instantly. Zapify was an <span class="highlight">AI-powered platform that automated Instagram DMs and social media interactions</span>. But its existing landing page wasn't doing justice to the product. The <span class="highlight">hero section lacked impact</span>, the <span class="highlight">content hierarchy was weak</span>, and visitors couldn't immediately understand what the platform actually did.`,
      image: 'assets/project/Zapify/1.png',
      color: '#a7fff3'
    },

    {
      id: 2,
      title: 'Act 2: Understanding the Problem',
      content:
        `I started with a complete <span class="highlight">UI/UX review of the existing website</span>. The page lacked a strong <span class="highlight">visual identity</span>, important messages weren't highlighted, and there was <span class="highlight">no clear visual representation of the product</span>. Visitors had to read through the content just to understand its purpose. The website was missing the <span class="highlight">clarity and structure needed to turn interest into action</span>.`,
      image: 'assets/project/Zapify/2.png',
      color: '#39d6c8'
    },

    {
      id: 3,
      title: 'Act 3: Show, Don\'t Just Tell',
      content:
        `I wanted visitors to <span class="highlight">understand Zapify before they even started reading</span>. Since the product focused on <span class="highlight">Instagram DM automation</span>, I created a visual showing the <span class="highlight">automation experience happening inside a smartphone</span>. This became the centerpiece of the hero section, giving visitors an <span class="highlight">immediate idea of what the product could do</span>.`,
      image: 'assets/project/Zapify/3.png',
      color: '#5eead4'
    },

    {
      id: 4,
      title: 'Act 4: A Consistent Visual Language',
      content:
        `A good landing page needs more than attractive sections. It needs <span class="highlight">consistency</span>. I established a <span class="highlight">font theme and carried it throughout the website</span>. I also improved the <span class="highlight">content hierarchy using contrasting text highlights</span>, making important messages stand out and helping visitors <span class="highlight">understand the product's value without getting lost in paragraphs</span>.`,
      image: 'assets/project/Zapify/4.png',
      color: '#22d3ee'
    },

    {
      id: 5,
      title: 'Act 5: Bringing the Product to Life',
      content:
        `Instead of simply explaining the features, I wanted visitors to <span class="highlight">see them in action</span>. I introduced an About section with <span class="highlight">short animated videos</span> that demonstrated how Zapify worked. I also created a <span class="highlight">scroll-triggered loading animation</span> that flowed naturally into the About section, making the transition through the landing page feel <span class="highlight">more interactive and engaging</span>.`,
      image: 'assets/project/Zapify/11.png',
      color: '#67e8f9'
    },

    {
      id: 6,
      title: 'Act 6: Building Trust',
      content:
        `People are more likely to trust a product when they hear about it from <span class="highlight">actual users</span>. I introduced a <span class="highlight">dedicated testimonial section</span> with links to real customer testimonials, allowing visitors to explore <span class="highlight">genuine experiences</span> and understand how others were using Zapify. The goal was to <span class="highlight">replace uncertainty with confidence</span>.`,
      image: 'assets/project/Zapify/1.png',
      color: '#2dd4bf'
    },

    {
      id: 7,
      title: 'Act 7: Making the Decision Easier',
      content:
        `A visitor shouldn't have to search for the next step or wonder how much a product costs. I introduced <span class="highlight">primary and secondary call-to-action buttons</span> to guide users through the <span class="highlight">conversion journey</span>. I also added <span class="highlight">dedicated FAQ and pricing sections</span>, both missing from the original website, so visitors could find answers, understand the available plans, and make an <span class="highlight">informed subscription decision</span>.`,
      image: 'assets/project/Zapify/2.png',
      color: '#38bdf8'
    },

    {
      id: 8,
      title: 'Act 8: From Visitors to Subscribers',
      content:
        `The revamp wasn't just about making Zapify look better. It was about <span class="highlight">making the product easier to understand, building trust, and giving visitors a clear reason to subscribe</span>. With a stronger hero section, engaging product demonstrations, real testimonials, and a structured pricing experience, the redesigned landing page contributed to an <span class="highlight">increase in product subscriptions</span>. A website that once struggled to communicate its value now had a <span class="highlight">much clearer path from first impression to conversion</span>.`,
      metrics: [
        { label: 'Conversion Lift', value: '+35%', icon: '📈' },
        { label: 'Bounce Rate', value: '-40%', icon: '📉' },
        { label: 'Engagement', value: 'High', icon: '🚀' }
      ],
      image: 'assets/project/Zapify/11.png',
      color: '#99f6e4'
    }
  ]
};

@Component({
  selector: 'app-zapify-project',
  standalone: true,
  imports: [CommonModule, AppNavbarComponent, ProjectShowcase],
  template: `
    <app-navbar [menuItems]="menuItems()"></app-navbar>
    <app-project-showcase [projectData]="zapifyProject" [githubUrl]="githubUrl"></app-project-showcase>
  `
})
export class ZapifyProject implements OnInit {
  zapifyProject = ZAPIFY_PROJECT;
  profile = '';
  allMenuItems: any[] = [];
  router = inject(Router);
  profileService = inject(ProfileService);
  menuItems = signal<any[]>([]);
  githubUrl = 'https://github.com/Kannan-ark15/Zapify-hero';

  ngOnInit() {
    const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|anonymus)\//);

    // Condition 1: Profile extraction with fallback
    if (profileMatch) {
      this.profile = profileMatch[1];
    } else {
      this.profile = 'recruiter';
    }
    this.profileService.setProfile(this.profile);

    // Set menu items scoped to the current profile
    this.allMenuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'Experience', route: `/${this.profile}/experience`, section: 'Experience' },
      { label: 'Skills', route: `/${this.profile}/skills`, section: 'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' }
    ];

    // Condition 2: Filter restricted sections based on profile permissions
    this.menuItems.set(
      this.allMenuItems.filter((item: { section?: string }) =>
        !item.section || !this.profileService.isSectionRestricted(item.section, this.profile)
      )
    );
  }
}
