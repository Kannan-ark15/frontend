// In your parent component
import { Component } from '@angular/core';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcase } from '../project-showcase/project-showcase';

export const SENTIMENT_ANALYSIS_PROJECT: ProjectShowcaseData = {
  title: 'AI Movie Recommender',
  subtitle: '',
  description:
    'A cinematic fusion of content-based filtering and live sentiment intelligence — powered by PyTorch, Twitter data, and cloud-scale deployment. This system brings movie recommendations to life by analyzing public emotion in real time.',

  techStack: ['PyTorch', 'Python', 'Android', 'Java', 'Google Cloud', 'Twitter API'],
  videoUrl: 'assets/videos/movie-recommender-demo.mp4',
  badge: 'AI POWERED',

  chapters: [
    // ACT 1 — PROBLEM SETUP
    {
      id: 1,
      title: 'Act 1: The Unspoken Problem',
      content:
        'Traditional recommender systems see users, not emotions. They rely on outdated ratings and static metadata, missing out on the massive universe of real-time public sentiment. Thousands of people express opinions about movies every minute — but none of that emotion ever reaches the user. This project began with a single question:“What if recommendations could feel the pulse of the world in real time?”',
      image: 'assets/project/recommendation/act-1.png',
      color: '#e50914'
    },

    // ACT 2 — ARCHITECTURE & RESEARCH
    {
      id: 2,
      title: 'Act 2: Designing the Intelligence Engine',
      content:
        'We architected a hybrid intelligence system: content-based filtering fused with a live sentiment analyzer. A PyTorch LSTM model handles emotional understanding, a Flask backend orchestrates recommendation logic, and an Android app delivers a smooth user experience. The ecosystem runs on Google Cloud App Engine for effortless scalability. Every layer was meticulously designed to transform raw social conversations into intelligent movie suggestions.',
      image: 'assets/project/recommendation/act-2.png',
      color: '#b20710'
    },

    // ACT 3 — MODEL CREATION
    {
      id: 3,
      title: 'Act 3: Crafting the Emotion Model',
      content:
        'A custom PyTorch model was trained on thousands of real movie-related tweets. The pipeline cleaned, tokenized, and embedded tweet data before passing them into stacked LSTMs that capture emotional tone. Using GPU-accelerated training on Google Colab, the model learned to classify sentiments as positive, negative, or neutral — becoming the emotional backbone of the entire system.',
      image: 'assets/project/recommendation/act-3.png',
      color: '#8b0000'
    },

    // ACT 4 — REAL-TIME SENTIMENT INTEGRATION
    {
      id: 4,
      title: 'Act 4: Bringing Twitter Into the Equation',
      content:
        'A custom TwitterAnalyzer module streams live tweets for any movie. Each tweet is fed into the sentiment model to derive a dynamic positivity score. That score is then combined with content-based similarity metrics, producing recommendations that evolve with real-world discussions. The system even includes a live sentiment dashboard — a window into the emotional landscape of social media.',
      image: 'assets/project/recommendation/act-4.png',
      color: '#ff6b6b'
    },

    // ACT 5 — THE ANDROID EXPERIENCE
    {
      id: 5,
      title: 'Act 5: The Mobile Interface',
      content:
        'A native Android app forms the face of the system. Sleek fragments display personalized suggestions, trending movies, search insights, and sentiment visualizations. User likes/dislikes are stored locally, influencing future recommendations. Movie posters and metadata are fetched via OMDB API, making the app visually rich and deeply interactive.',
      image: 'assets/project/recommendation/act-5.png',
      color: '#ff9f1c'
    },

    // ACT 6 — CLOUD DEPLOYMENT
    {
      id: 6,
      title: 'Act 6: Deploying to the Cloud',
      content:
        'The backend runs on Google Cloud App Engine with full autoscaling capability. Flask APIs handle recommendation requests, sentiment queries, and user preference updates. Deploying required building optimized checkpoints, writing an app.yaml configuration, and managing dependency layers — turning the project into a real-world cloud-native application.',
      image:
        'assets/project/recommendation/act-6.png',
      color: '#2ec4b6'
    },

    // ACT 7 — IMPACT
    {
      id: 7,
      title: 'Act 7: The Outcome',
      content:
        'By combining emotion, user taste, and content intelligence, the system delivered significantly more accurate and timely recommendations. Newly released movies — usually blind spots for traditional recommenders — became the strongest area of improvement. With an 87% sentiment accuracy and sub-2-second API responses, the project proved the power of merging public emotion with machine intelligence.',
      metrics: [
        { label: 'Model Accuracy', value: '87%', icon: '🎯' },
        { label: 'API Response', value: '<2s', icon: '⚡' },
        { label: 'Recommendations', value: '10K+', icon: '🎬' },
        { label: 'User Satisfaction', value: '4.5/5', icon: '⭐' }
      ],
      image: 'assets/project/recommendation/act-7.png',
      color: '#9b59b6'
    },

    // ACT 8 — BEHIND THE SCENES
    {
      id: 8,
      title: 'Act 8: Behind the Scenes',
      content:
        'A project born during a tight academic timeline turned into a deep dive into modern AI engineering. GPU limitations forced creative batching strategies, Twitter API rate limits required intelligent caching, and Google Cloud deployments introduced real DevOps challenges. Watching real-time tweets transform into emotional insights was the most rewarding moment — leading to the project being open-sourced under MIT license for the community.',
      image: 'assets/project/recommendation/act-8.png',
      color: '#e91e63'
    }
  ]
};


@Component({
  selector: 'app-movie-recommendation-project',
  standalone: true,
  imports: [CommonModule,AppNavbarComponent,ProjectShowcase],
  template: `
    <app-navbar [menuItems]="menuItems"></app-navbar>
    <app-project-showcase [projectData]="sentimentProject"></app-project-showcase>
  `
})
export class ProjectsComponent {
    menuItems = [
    {label:'Home', route:'/profile'},
    { label: 'Experience', route: '/experience', section: 'Experience' },
    { label: 'Skills', route: '/skills', section: 'Skills' },
    { label: 'Projects', route: '/profile', fragment: 'projects-section' },
    { label: 'Contact Me',route: '/profile', fragment: 'contact-id' },
  ];
  sentimentProject = SENTIMENT_ANALYSIS_PROJECT;
}
