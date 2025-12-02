import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectShowcaseData, Chapter } from './project-data.model';
import { Route } from 'lucide-angular';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';
interface Card {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
  videoUrl: string;
  section: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-project-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-showcase.html',
  styleUrls: ['./project-showcase.css']
})
export class ProjectShowcase implements AfterViewInit, OnDestroy {
  @Input({ required: true }) projectData!: ProjectShowcaseData;
  @Input() currentProjectId?: number;
  @Input() githubUrl?: string;
  
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  isVideoHovered = signal(false);
  activeChapter = signal(1);
  completedChapters = signal<Set<number>>(new Set([1]));
  allChaptersCompleted = signal(false);
  
  chapters: Chapter[] = [];
  route = inject(Router);
  private scrollListener: any;
  profileService = inject(ProfileService);
  profile = '';
  
  allProjects = signal<Card[]>([
    {
      id: 1,
      title: '1',
      text: 'Sql Syncup Automation System with Custom MCP',
      imageUrl: 'assets/images/Sql.webp',
      videoUrl: 'assets/project/videos/sql.mp4',
      section: '',
      githubUrl: 'https://github.com/yourusername/sql-project'
    },
    {
      id: 2,
      title: '2',
      text: 'Movie Recommendation System based on Sentiment-Analysis.',
      imageUrl: 'assets/images/movie.webp',
      videoUrl: 'assets/project/videos/movie.mp4',
      section: '',
      githubUrl: 'https://github.com/yourusername/movie-project'
    },
    {
      id: 3,
      title: '3',
      text: 'E-commerce Website with Payment Gateway Integration.',
      imageUrl: 'assets/images/E-commerce.webp',
      videoUrl: 'assets/project/videos/cn.mp4',
      section: '',
      githubUrl: 'https://github.com/yourusername/ecommerce-project'
    }
  ]);
  
  otherProjects = signal<Card[]>([]);
  
  ngOnInit() {
    // Initialize chapters from input data
    this.chapters = this.projectData.chapters;

    const currentUrl = this.route.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|anonymus)\//);
    if (profileMatch) {
      this.profile = profileMatch[1];
      this.profileService.setProfile(this.profile);
    } else {
      this.profile = 'recruiter';
      this.profileService.setProfile(this.profile);
    }
    
    // If recruiter profile, unlock all chapters immediately
    if (this.profile === 'recruiter') {
      this.allChaptersCompleted.set(true);
      const allChapters = new Set(this.chapters.map(ch => ch.id));
      this.completedChapters.set(allChapters);
    }
    
    // Filter other projects (exclude current project)
    if (this.currentProjectId) {
      const filtered = this.allProjects().filter(p => p.id !== this.currentProjectId);
      this.otherProjects.set(filtered);
    } else {
      this.otherProjects.set(this.allProjects());
    }
  }

  ngAfterViewInit() {
    this.setupScrollListener();
  }

  ngOnDestroy() {
    // Remove scroll listener
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  setupScrollListener() {
    let ticking = false;
    
    this.scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.checkChapterVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', this.scrollListener);
  }

  checkChapterVisibility() {
    const chapters = document.querySelectorAll('.chapter-card');
    const viewportMiddle = window.innerHeight / 2;

    let foundActive = false;

    chapters.forEach((chapterEl) => {
      const rect = chapterEl.getBoundingClientRect();
      
      // Check if chapter is in viewport
      if (!foundActive && rect.top < viewportMiddle && rect.bottom > viewportMiddle) {
        const chapterId = parseInt(chapterEl.id.replace('chapter-', ''));
        if (this.activeChapter() !== chapterId) {
          this.markChapterAsCompleted(this.activeChapter());
          this.setActiveChapter(chapterId);
          foundActive = true;
        }
      }
    });
  }

  setActiveChapter(chapterId: number) {
    this.activeChapter.set(chapterId);
  }

  markChapterAsCompleted(chapterId: number) {
    const completed = this.completedChapters();
    completed.add(chapterId);
    
    // Unlock next chapter (only for non-recruiter profiles)
    if (this.profile !== 'recruiter' && chapterId < this.chapters.length) {
      completed.add(chapterId + 1);
    }
    
    this.completedChapters.set(new Set(completed));
    
    // Check if all chapters are completed
    if (completed.size >= this.chapters.length) {
      this.allChaptersCompleted.set(true);
    }
  }

  isChapterUnlocked(chapterId: number): boolean {
    // For recruiter profile, all chapters are always unlocked
    if (this.profile === 'recruiter') {
      return true;
    }
    return this.allChaptersCompleted() || this.completedChapters().has(chapterId);
  }

  onVideoHover(isHovered: boolean) {
    this.isVideoHovered.set(isHovered);
    const video = this.videoPlayer.nativeElement;
    
    if (isHovered) {
      video.play().catch(err => console.log('Play failed', err));
    } else {
      video.pause();
    }
  }

  scrollToChapter(chapterId: number) {
    // Only allow navigation if chapter is unlocked or all completed
    if (!this.isChapterUnlocked(chapterId)) {
      return;
    }

    this.setActiveChapter(chapterId);
    const element = document.getElementById(`chapter-${chapterId}`);
    
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  routeProjects() {
    this.route.navigate([`/${this.profile}/home`], { fragment: 'projects-section' });
  }

  navigateToProject(projectId: number) {
    // Navigate to the selected project
    // You'll need to implement the routing logic based on your project structure
    const projectRoutes: { [key: number]: string } = {
      1: 'sql-project',
      2: 'movie-recommendation',
      3: 'e-commerce-project'
    };
    
    const route = projectRoutes[projectId];
    if (route) {
      this.route.navigate([`/${this.profile}/${route}`]);
    }
  }

  openGithub() {
    if (this.githubUrl) {
      window.open(this.githubUrl, '_blank');
    }
  }
}