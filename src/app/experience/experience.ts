import { Component, signal, HostListener, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { LucideAngularModule,Computer,School, GraduationCap } from 'lucide-angular';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';

export interface TimelineItem {
  id: string;
  label: string;
  duration: string;
  icon: any;
  color: string;
  heading: string;
  description: string;
  expanded?: boolean;
  flowchart?: FlowchartNode[];
}

export interface FlowchartNode {
  title: string;
  text: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, AppNavbarComponent, LucideAngularModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class Experience {
  profile=''
  menuItems:any[]=[]
  isMuted = true; // Start muted for autoplay
  @ViewChild('heroVideo', { static: false }) heroVideoRef!: ElementRef<HTMLVideoElement>;
  timelineItems = signal<TimelineItem[]>([
    {
      id: 'experience',
      label: 'Work Experience',
      duration: '1.3 Years',
      icon: Computer,
      color: '#e50914',
      heading: 'Software Developer',
      description: 'Building scalable applications and automation tools for enterprise solutions.',
      expanded: false,
      flowchart: [
        {
          title: 'Role',
          text: 'Full Stack Software Developer - Building scalable applications and automation tools'
        },
        {
          title: 'Achievements',
          text: ` &#8226;Worked on multiple product enhancemets in both frontend and backend.<br>
                 &#8226;Imporved and educated about agentic AI capabilities within the team<br>
                 &#8226;Introduced unique custom prompts and increased productivity by using github copilot ind development tasks.`
        },
        {
          title: 'Tech Stack',
          text: 'Angular, Spring Boot, MySQL, Docker,Flowable,Agentic AI,MCP,Microservices'
        }
      ]
    },
    {
      id: 'college',
      label: 'College',
      duration: '4 Years',
      icon: GraduationCap,
      color: '#b20710',
      heading: 'BTech in Computer Science Atrificial Intelligence and Data Science',
      description: 'Sastra University - Graduated with CGPA: 8.4',
      expanded: false,
      flowchart: [
        {
          title: 'Academics',  
           text: `
            &#8226; Focused on Algorithms, AI, and ML<br>
            &#8226; Built projects using LSTM and CNN<br>
             &#8226; Active member of Tech Fest Committee
            `,
        },
      ]
    },
    {
      id: 'school',
      label: 'School',
      duration: '2 Years',
      icon: School,
      color: '#8b0000',
      heading: 'High School',
      description: 'Strong foundation in science and mathematics',
      expanded: false
    }
  ]);

  // Track which flowchart nodes have animated
  animatedFlowchartNodes = signal<Set<string>>(new Set());
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
      { label: 'Experience', route: `/${this.profile}/experience`,section:'Experience' },
      { label: 'Skills', route: `/${this.profile}/skills`,section:'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

  }
  toggleExpand(itemId: string) {
    const currentItem = this.timelineItems().find(item => item.id === itemId);
    const wasExpanded = currentItem?.expanded;
    
    this.timelineItems.update(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, expanded: !item.expanded }
          : { ...item, expanded: false }
      )
    );
    
    // If expanding and has flowchart, trigger animation
    if (!wasExpanded && currentItem?.flowchart) {
      this.animateFlowchartWires(itemId);
    } else if (wasExpanded) {
      // Reset animation when collapsing
      this.resetFlowchartAnimation(itemId);
    }
  }

  private animateFlowchartWires(itemId: string) {
    // Reset for this item
    this.resetFlowchartAnimation(itemId);
    
    const item = this.timelineItems().find(i => i.id === itemId);
    if (!item?.flowchart) return;
    
    // Animate each node sequentially
    item.flowchart.forEach((node, index) => {
      setTimeout(() => {
        this.animatedFlowchartNodes.update(set => {
          const newSet = new Set(set);
          newSet.add(`${itemId}-${index}`);
          return newSet;
        });
      }, index * 1800); // 500ms delay between each node
    });
  }

  private resetFlowchartAnimation(itemId: string) {
    this.animatedFlowchartNodes.update(set => {
      const newSet = new Set(set);
      // Remove all nodes for this item
      const item = this.timelineItems().find(i => i.id === itemId);
      item?.flowchart?.forEach((_, index) => {
        newSet.delete(`${itemId}-${index}`);
      });
      return newSet;
    });
  }

  isFlowchartNodeAnimated(itemId: string, nodeIndex: number): boolean {
    return this.animatedFlowchartNodes().has(`${itemId}-${nodeIndex}`);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.animateOnScroll();
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.initializeVideo();
    }, 300);
    this.animateOnScroll();
    
  
  }

   private initializeVideo() {
    if (this.heroVideoRef && this.heroVideoRef.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      
      // Ensure video is muted for autoplay
      video.muted = true;
      video.playsInline = true;
      
      // Load the video
      video.load();
      
      // Attempt to play after load
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video autoplay started successfully');
          })
          .catch(error => {
            console.warn('Autoplay prevented:', error);
            // Video will show poster image or first frame
          });
      }
    }
  }

  private animateOnScroll() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;
      if (isVisible) {
        item.classList.add('visible');
      }
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    const video = document.querySelector('.hero-video') as HTMLVideoElement;
    if (video) {
      video.muted = this.isMuted;
    }
  }

  scrollToTimeline() {
    const timelineSection = document.getElementById('timeline-section');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
