import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectShowcaseData, Chapter } from './project-data.model';
import { Route } from 'lucide-angular';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';

@Component({
  selector: 'app-project-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-showcase.html',
  styleUrls: ['./project-showcase.css']
})
export class ProjectShowcase implements AfterViewInit, OnDestroy {
  @Input({ required: true }) projectData!: ProjectShowcaseData;
  
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  isVideoHovered = signal(false);
  activeChapter = signal(1);
  typingTexts = signal<{ [key: number]: string }>({});
  completedChapters = signal<Set<number>>(new Set([1]));
  allChaptersCompleted = signal(false);
  
  chapters: Chapter[] = [];
  route=inject(Router);
  private typingIntervals: Map<number, any> = new Map();
  private scrollListener: any;
  profileService=inject(ProfileService)
  profile='';
  ngOnInit() {
    // Initialize chapters from input data
    this.chapters = this.projectData.chapters;

         const currentUrl = this.route.url;
        const profileMatch = currentUrl.match(/\/(recruiter|developer|stalker)\//);
       if (profileMatch) {
          this.profile = profileMatch[1];
          this.profileService.setProfile(this.profile);
        } else {
          this.profile = 'recruiter';
          this.profileService.setProfile(this.profile);
        }
    
  }

  ngAfterViewInit() {
    this.startTypingEffect(1);
    this.setupScrollListener();
  }

  ngOnDestroy() {
    // Clean up all typing intervals
    this.typingIntervals.forEach(interval => clearInterval(interval));
    this.typingIntervals.clear();
    
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
    this.startTypingEffect(chapterId);
  }

  markChapterAsCompleted(chapterId: number) {
    const completed = this.completedChapters();
    completed.add(chapterId);
    
    // Unlock next chapter
    if (chapterId < this.chapters.length) {
      completed.add(chapterId + 1);
    }
    
    this.completedChapters.set(new Set(completed));
    
    // Check if all chapters are completed
    if (completed.size >= this.chapters.length) {
      this.allChaptersCompleted.set(true);
    }
  }

  isChapterUnlocked(chapterId: number): boolean {
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

  startTypingEffect(chapterId: number) {
    const chapter = this.chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    // Clear existing interval for this chapter if any
    if (this.typingIntervals.has(chapterId)) {
      clearInterval(this.typingIntervals.get(chapterId));
    }

    const fullText = chapter.content;
    let currentText = '';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        this.typingTexts.update(texts => ({ ...texts, [chapterId]: currentText }));
        index++;
      } else {
        clearInterval(typingInterval);
        this.typingIntervals.delete(chapterId);
      }
    }, 20);
    
    this.typingIntervals.set(chapterId, typingInterval);
  }

  getTypingText(chapterId: number): string {
    return this.typingTexts()[chapterId] || '';
  }

  routeProjects(){
    this.route.navigate([`/${this.profile}/home`], { fragment: 'projects-section' });
  }

}
