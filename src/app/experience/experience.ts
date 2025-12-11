import { Component, signal, HostListener, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { LucideAngularModule, Computer, School, GraduationCap, ChevronDown } from 'lucide-angular';
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
  profile = '';
  menuItems: any[] = [];
  isMuted = true;
  ChevronDown = ChevronDown;
  @ViewChild('heroVideo', { static: false }) heroVideoRef!: ElementRef;

  timelineItems = signal([
    {
      id: 'experience',
      label: 'Work Experience',
      duration: '1 Year, 4 Months',
      icon: Computer,
      color: '#e50914',
      heading: 'Software Developer',
      description: 'Building scalable applications and automation tools for enterprise solutions at TATA Communications.',
      expanded: true,
      flowchart: [
        {
          title: 'Company',
          text: 'TATA Communications'
        },
        {
          title: 'Role',
          text: 'Full Stack Software Developer - Building scalable applications and automation tools'
        },
        {
          title: 'Teams Worked',
          text: 'PIPF (Platform Infrastructure & Product Features) and DBAT (Product Enhancements Team)'
        },
        {
          title: 'Work & Achievements',
          text: `-Under PIPF: Provided permanent fixes for multiple production issues, ensuring system stability and reliability<br>
                 -Under DBAT: Working on multiple product enhancements in both frontend and backend<br>
                 -Improved and educated the team about Agentic AI capabilities<br>
                 -Introduced unique custom prompts and increased productivity by 30% using GitHub Copilot in development tasks`
        },
        {
          title: 'Tech Stack',
          text: 'Angular, Spring Boot, MySQL, Docker, Flowable, Agentic AI, MCP, Microservices'
        }
      ]
    },
    {
      id: 'college',
      label: 'College',
      duration: '4 Years',
      icon: GraduationCap,
      color: '#b20710',
      heading: 'BTech in Computer Science - Artificial Intelligence and Data Science',
      description: 'Sastra University - Graduated with CGPA: 8.4',
      expanded: true,
      flowchart: [
        {
          title: 'Academics',
          text: `-Focused on Algorithms, Artificial Intelligence, and Machine Learning<br>
                 -Built projects using LSTM and CNN architectures<br>
                 -Specialized in AI/ML domains with hands-on implementation experience`
        },
        {
          title: 'Leadership & Extracurriculars',
          text: `-Led Technotainment - Event Management Team<br>
                -Organized multiple cultural and technical events<br>
                -Successfully executed one major event with 500+ footfall, demonstrating excellent organizational and leadership skills`
        }
      ]
    },
    {
      id: 'school',
      label: 'High School [11, 12]',
      duration: '2 Years',
      icon: School,
      color: '#8b0000',
      heading: 'Sri Gayatri Junior College',
      description: 'Strong foundation in science and mathematics with exceptional JEE performance',
      expanded: true,
      flowchart: [
        {
          title: 'Course Details',
          text: `-2-year intermediate course<br>
                  -Major subjects: Mathematics, Physics, Chemistry (MPC)<br>
                  -Built strong analytical and problem-solving foundation`
        },
        {
          title: 'Achievement',
          text: 'JEE Score: 98.453126 percentile - Demonstrating exceptional aptitude in engineering entrance examination'
        }
      ]
    }
  ]);

  animatedFlowchartNodes = signal<Set<string>>(new Set());
  router = inject(Router);
  profileService = inject(ProfileService);
  allMenuItems=signal<any[]>([]);
  ngOnInit() {
    const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|anonymus)\//);
    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }

    this.menuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'Experience', route: `/${this.profile}/experience`, section: 'Experience' },
      { label: 'Skills', route: `/${this.profile}/skills`, section: 'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

    // Trigger animation for all items since they're expanded by default
    setTimeout(() => {
      this.timelineItems().forEach(item => {
        if (item.flowchart && item.expanded) {
          this.animateFlowchartWires(item.id);
        }
      });
    }, 500);

     this.allMenuItems.set(
      this.menuItems.filter((item: { section: string; }) => 
        !item.section || !this.profileService.isSectionRestricted(item.section,this.profile)
      )
    );
  }

  toggleExpand(itemId: string) {
    const currentItem = this.timelineItems().find(item => item.id === itemId);
    const wasExpanded = currentItem?.expanded;

    this.timelineItems.update(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, expanded: !item.expanded }
          : item
      )
    );

    // If expanding and has flowchart, trigger animation
    if (!wasExpanded && currentItem?.flowchart) {
      setTimeout(() => {
        this.animateFlowchartWires(itemId);
      }, 100);
    } else if (wasExpanded) {
      // Reset animation when collapsing
      this.resetFlowchartAnimation(itemId);
    }
  }

  private animateFlowchartWires(itemId: string) {
    this.resetFlowchartAnimation(itemId);
    const item = this.timelineItems().find(i => i.id === itemId);
    if (!item?.flowchart) return;

    item.flowchart.forEach((node, index) => {
      setTimeout(() => {
        this.animatedFlowchartNodes.update(set => {
          const newSet = new Set(set);
          newSet.add(`${itemId}-${index}`);
          return newSet;
        });
      }, index * 1800);
    });
  }

  private resetFlowchartAnimation(itemId: string) {
    this.animatedFlowchartNodes.update(set => {
      const newSet = new Set(set);
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

    this.animateOnScroll();
  }


  private animateOnScroll() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
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
