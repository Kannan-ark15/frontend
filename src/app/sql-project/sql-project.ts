import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { ProjectShowcase } from '../project-showcase/project-showcase';

 export const SQL_PROJECT: ProjectShowcaseData = {
  title: 'SQL Sync Automation',
  subtitle: 'The Database Odyssey',
  description: 'An intelligent automation system that streamlines database synchronization across multiple environments, eliminating manual errors and accelerating deployments.',
  techStack: ['Python', 'Django', 'PostgreSQL', 'AWS'],
  videoUrl: 'assets/videos/sql-sync-demo.mp4',
  badge: 'NEW PROJECT',
  chapters: [
    {
      id: 1,
      title: 'Defining the Problem',
      content: 'Managing multiple database environments became a critical challenge. Manual synchronization led to inconsistencies, deployment delays, and countless hours debugging schema conflicts. Teams struggled with outdated data structures across development, staging, and production environments, creating a bottleneck in our development pipeline.',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop',
      color: '#e50914'
    },
    {
      id: 2,
      title: 'Deciding Point Approach',
      content: 'After analyzing the pain points, we decided on a Python-based automation framework. The key decision was to create an intelligent sync engine that could detect schema changes, validate data integrity, and orchestrate deployments across all environments without human intervention. We chose Django for its robust ORM capabilities and PostgreSQL for its reliability.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      color: '#b20710'
    },
    {
      id: 3,
      title: 'Beginning to Develop & Implement',
      content: 'Development started with building the core sync engine. We implemented real-time schema monitoring, automated migration generation, and a robust validation layer to ensure data integrity throughout the synchronization process.',
      code: `class DatabaseSync:
    def __init__(self, source_db, target_db):
        self.source = source_db
        self.target = target_db
    
    def detect_changes(self):
        schema_diff = self.compare_schemas()
        return self.generate_migration(schema_diff)
    
    def execute_sync(self):
        migrations = self.detect_changes()
        self.validate_integrity(migrations)
        self.apply_migration(migrations)
        return self.verify_success()`,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
      color: '#8b0000'
    },
    {
      id: 4,
      title: 'The Plot Twist',
      content: 'Mid-development, we discovered that cloud provider APIs could trigger automatic rollbacks on sync failures. This revelation transformed our approach from a simple automation tool into a fault-tolerant, self-healing deployment system. We integrated AWS Lambda functions for real-time monitoring and Azure DevOps for orchestration.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      color: '#ff6b6b'
    },
    {
      id: 5,
      title: 'Ripple Effect',
      content: 'The automation created a cascade of improvements across the organization. Development teams gained confidence in rapid deployments. QA cycles shortened from days to hours. Database administrators reclaimed valuable time for optimization tasks. The entire SDLC accelerated, enabling faster feature delivery to customers.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      color: '#ff9f1c'
    },
    {
      id: 6,
      title: 'Climax - Results & Metrics',
      content: 'Six months post-deployment, the impact exceeded all expectations. What once took hours now completes in minutes. Zero synchronization errors recorded. Development velocity increased dramatically.',
      metrics: [
        { label: 'Time Saved', value: '85%', icon: '⏱️' },
        { label: 'Sync Errors', value: '0', icon: '✅' },
        { label: 'Deploy Speed', value: '10x', icon: '🚀' },
        { label: 'Team Satisfaction', value: '98%', icon: '😊' }
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      color: '#2ec4b6'
    },
    {
      id: 7,
      title: 'Behind the Scenes',
      content: 'The project consumed 47 cups of coffee ☕ and countless late nights 🌙. Our first production bug was caused by a missing comma in a config file 🐛. Launch day: Zero downtime, zero rollbacks ✨. Won "Best Internal Tool" award at the company innovation summit 🏆. The name "SQL Sync" came from a team brainstorming session 💡.',
      image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop',
      color: '#9b59b6'
    }
  ]
};
@Component({
  selector: 'app-sql-project',
  standalone: true,
  imports: [CommonModule,AppNavbarComponent,ProjectShowcase],
  template: `
  <app-navbar [menuItems]="menuItems"></app-navbar>
  <app-project-showcase [projectData]="sqlProject"></app-project-showcase>
  `,
})
export class SqlProject{
    menuItems = [
    {label:'Home', route:'/profile'},
    { label: 'Experience', route: '/experience', section: 'Experience' },
    { label: 'Skills', route: '/skills', section: 'Skills' },
    { label: 'Projects', route: '/profile', fragment: 'projects-section' },
    { label: 'Contact Me',route: '/profile', fragment: 'contact-id' },
  ];
  sqlProject = SQL_PROJECT;


}
