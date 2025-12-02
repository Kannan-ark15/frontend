// In your parent component
import { Component, inject, signal } from '@angular/core';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcase } from '../project-showcase/project-showcase';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';

export const SENTIMENT_ANALYSIS_PROJECT: ProjectShowcaseData = {
  title: 'AI Movie Recommender',
  subtitle: '',
  description:
    'A cinematic fusion of <span class="highlight">content-based filtering and live sentiment intelligence</span> — powered by <span class="highlight">PyTorch, Twitter data, and cloud-scale deployment</span>. This system brings <span class="highlight">movie recommendations to life by analyzing public emotion in real time</span>.',

  techStack: ['PyTorch', 'Python', 'Android', 'Java', 'Google Cloud', 'Twitter API'],
  videoUrl: 'assets/project/videos/movie.mp4',
  badge: 'AI POWERED',

  chapters: [
    // ACT 1 — PROBLEM SETUP
    {
      id: 1,
      title: 'Act 1: The Unspoken Problem',
      content:
        'Traditional recommender systems see users, not emotions. They rely on <span class="highlight">outdated ratings and static metadata</span>, missing out on the <span class="highlight">massive universe of real-time public sentiment</span>. Thousands of people express opinions about movies every minute — but <span class="highlight">none of that emotion ever reaches the user</span>. This project began with a single question: <span class="highlight">"What if recommendations could feel the pulse of the world in real time?"</span>',
      image: 'assets/project/recommendation/act-1.webp',
      color: '#e50914'
    },

    // ACT 2 — ARCHITECTURE & RESEARCH
    {
      id: 2,
      title: 'Act 2: Designing the Intelligence Engine',
      content:
        'We architected a <span class="highlight">hybrid intelligence system: content-based filtering fused with a live sentiment analyzer</span>. A <span class="highlight">PyTorch LSTM model handles emotional understanding</span>, a <span class="highlight">Flask backend orchestrates recommendation logic</span>, and an <span class="highlight">Android app delivers a smooth user experience</span>. The ecosystem runs on <span class="highlight">Google Cloud App Engine for effortless scalability</span>. Every layer was meticulously designed to <span class="highlight">transform raw social conversations into intelligent movie suggestions</span>.',
      image: 'assets/project/recommendation/act-2.webp',
      color: '#b20710'
    },

    // ACT 3 — MODEL CREATION
    {
      id: 3,
      title: 'Act 3: Crafting the Emotion Model',
      content:
        'A custom <span class="highlight">PyTorch model was trained on thousands of real movie-related tweets</span>. The pipeline <span class="highlight">cleaned, tokenized, and embedded tweet data</span> before passing them into <span class="highlight">stacked LSTMs that capture emotional tone</span>. Using <span class="highlight">GPU-accelerated training on Google Colab</span>, the model learned to <span class="highlight">classify sentiments as positive, negative, or neutral</span> — becoming the <span class="highlight">emotional backbone of the entire system</span>.',
      image: 'assets/project/recommendation/act-3.webp',
      color: '#8b0000'
    },

    // ACT 4 — REAL-TIME SENTIMENT INTEGRATION
    {
      id: 4,
      title: 'Act 4: Bringing Twitter Into the Equation',
      content:
        'A custom <span class="highlight">TwitterAnalyzer module streams live tweets for any movie</span>. Each tweet is fed into the sentiment model to derive a <span class="highlight">dynamic positivity score</span>. That score is then <span class="highlight">combined with content-based similarity metrics</span>, producing <span class="highlight">recommendations that evolve with real-world discussions</span>. The system even includes a <span class="highlight">live sentiment dashboard</span> — a window into the <span class="highlight">emotional landscape of social media</span>.',
      image: 'assets/project/recommendation/act-4.webp',
      color: '#ff6b6b'
    },

    // ACT 5 — THE ANDROID EXPERIENCE
    {
      id: 5,
      title: 'Act 5: The Mobile Interface',
      content:
        'A <span class="highlight">native Android app forms the face of the system</span>. Sleek fragments display <span class="highlight">personalized suggestions, trending movies, search insights, and sentiment visualizations</span>. User <span class="highlight">likes/dislikes are stored locally, influencing future recommendations</span>. Movie posters and metadata are fetched via <span class="highlight">OMDB API</span>, making the app <span class="highlight">visually rich and deeply interactive</span>.',
      image: 'assets/project/recommendation/act-5.webp',
      color: '#ff9f1c'
    },

    // ACT 6 — CLOUD DEPLOYMENT
    {
      id: 6,
      title: 'Act 6: Deploying to the Cloud',
      content:
        'The backend runs on <span class="highlight">Google Cloud App Engine with full autoscaling capability</span>. <span class="highlight">Flask APIs handle recommendation requests, sentiment queries, and user preference updates</span>. Deploying required <span class="highlight">building optimized checkpoints, writing an app.yaml configuration, and managing dependency layers</span> — turning the project into a <span class="highlight">real-world cloud-native application</span>.',
      image:
        'assets/project/recommendation/act-6.webp',
      color: '#2ec4b6'
    },

    // ACT 7 — IMPACT
    {
      id: 7,
      title: 'Act 7: The Outcome',
      content:
        'By combining <span class="highlight">emotion, user taste, and content intelligence</span>, the system delivered <span class="highlight">significantly more accurate and timely recommendations</span>. <span class="highlight">Newly released movies — usually blind spots for traditional recommenders</span> — became the <span class="highlight">strongest area of improvement</span>. With an <span class="highlight">87% sentiment accuracy and sub-2-second API responses</span>, the project proved the power of <span class="highlight">merging public emotion with machine intelligence</span>.',
      metrics: [
        { label: 'Model Accuracy', value: '87%', icon: '🎯' },
        { label: 'API Response', value: '<2s', icon: '⚡' },
        { label: 'Recommendations', value: '10K+', icon: '🎬' },
        { label: 'User Satisfaction', value: '4.5/5', icon: '⭐' }
      ],
      image: 'assets/project/recommendation/act-7.webp',
      color: '#9b59b6'
    },

    // ACT 8 — BEHIND THE SCENES
    {
      id: 8,
      title: 'Act 8: Behind the Scenes',
      content:
        'A project born during a tight academic timeline turned into a <span class="highlight">deep dive into modern AI engineering</span>. <span class="highlight">GPU limitations forced creative batching strategies</span>, <span class="highlight">Twitter API rate limits required intelligent caching</span>, and <span class="highlight">Google Cloud deployments introduced real DevOps challenges</span>. Watching <span class="highlight">real-time tweets transform into emotional insights</span> was the most rewarding moment — leading to the project being <span class="highlight">open-sourced under MIT license for the community</span>.',
      image: 'assets/project/recommendation/act-8.webp',
      color: '#e91e63'
    }
  ]
};


@Component({
  selector: 'app-movie-recommendation-project',
  standalone: true,
  imports: [CommonModule,AppNavbarComponent,ProjectShowcase],
  template: `
    <app-navbar [menuItems]="allMenuItems()"></app-navbar>
    <app-project-showcase [projectData]="sentimentProject" [githubUrl]="githubUrl"></app-project-showcase>
  `
})
export class ProjectsComponent {
  sentimentProject = SENTIMENT_ANALYSIS_PROJECT;
   profile=''
  menuItems:any[]=[];
    router=inject(Router)
  profileService=inject(ProfileService)
   allMenuItems=signal<any[]>([]);
   githubUrl='https://github.com/Kannan-ark15/Sentiment_MovieRecommendation'
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
