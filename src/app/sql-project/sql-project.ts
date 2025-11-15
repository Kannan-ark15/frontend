import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { ProjectShowcase } from '../project-showcase/project-showcase';

export const SQL_PROJECT: ProjectShowcaseData = {
  title: 'SQL Sync Automation',
  subtitle: 'The Database Odyssey',
  description:
    'A unique automation system that synchronizes SQL changes intelligently across multiple environments, evolving from a simple idea into an agentic, MCP-powered innovation.',
  techStack: ['Spring Boot', 'SQL', 'GitHub Copilot', 'MCP'],
  videoUrl: 'assets/videos/sql-sync-demo.mp4',
  badge: 'FEATURED',

  chapters: [

    {
      id: 1,
      title: 'Protagonist Introduction',
      content:
        'In our enterprise setup, SQL changes were updated only on the developer’s server and the production server. However, the remaining development servers used by other teams were left outdated. During releases involving many teams, only my changes were available on my server—while the other teams’ updates were missing. This forced me to manually apply 9–10 other teams’ SQL changes every time, leading to inconsistency and delays. This recurring problem became the reason and “protagonist moment” that sparked the creation of this project.',
      image: 'assets/project/sql/act-1.png',
      color: '#e50914'
    },

    {
      id: 2,
      title: 'Setting Up the Characters',
      content:
        'To solve this challenge, I decided to use the tools and knowledge available to me—SQL, Spring Boot, command-line inputs, and GitHub Copilot. These became the core “characters” of the story. With them, I set out to design an automation workflow that could eliminate manual efforts and keep all servers consistent.',
      image: 'assets/project/sql/act-2.png',
      color: '#b20710'
    },

    {
      id: 3,
      title: 'Screenplay',
      content:
        'Just like a screenplay defines how scenes flow in a movie, I designed the flow of my system. Before every release, all SQL changes from developers would be stored inside a “Migrations” folder alongside a file containing all enterprise server IPs. When the system ran, it would read the IP list, create a thread pool, and execute all SQL files in parallel on every server. Each server would store execution details in a dedicated “migrations” database, ensuring consistency and auditability across environments.',
      image: 'assets/project/sql/act-3.png',
      color: '#8b0000'
    },

    {
      id: 4,
      title: 'Plot Twist',
      content:
        'After completing development, I discovered that the DB team already had an automation script capable of running queries on all servers. However, they used it **only when a query was explicitly highlighted as affecting all servers**. At the same time, I learned that tools like Liquibase already existed with similar functionality. This was the plot twist—my project was no longer unique in its current form, and the story needed to change direction.',
      image: 'assets/project/sql/act-4.png',
      color: '#ff6b6b'
    },
    {
      id: 5,
      title: 'Ripple Effect',
      content:
        'A single spark changed everything: instead of developers manually typing SQL queries, what if AI generated them automatically? This idea created the ripple effect that transformed the project. The concept evolved—whenever developers made changes in the model folder, an AI should detect those changes, generate SQL queries for them, and store the output using the Jira ID for easy synchronization. This shift made the project truly unique and future-ready.',
      image: 'assets/project/sql/act-5.png',
      color: '#ff9f1c'
    },
    {
      id: 6,
      title: 'Climax',
      content:
        'The breakthrough happened through the Model Context Protocol (MCP). I designed a custom MCP that integrates seamlessly with GitHub Copilot. Now, when a developer commits changes in the model folder, they can simply instruct Copilot to “Generate SQL for this Jira ID.” The MCP detects git diffs, builds a structured prompt file using enterprise SQL standards, sends it to a Sonnet agent, and stores the generated SQL in the Migrations folder—named after the Jira ID. This approach aligns with modern agentic coding practices and integrates naturally into the company’s workflow.',
      metrics: [
        { label: 'AI Query Generation', value: '100%', icon: '⚙️' },
        { label: 'Manual Effort Reduced', value: '90%', icon: '⬇️' },
        { label: 'Developer Adoption', value: 'High', icon: '🚀' }
      ],
      image: 'assets/project/sql/act-6.png',
      color: '#2ec4b6'
    },
    {
      id: 7,
      title: 'Behind the Scenes',
      content:
        'Building this project involved experimenting with MCP, learning agentic flows, and understanding how LLMs operate in developer tooling. The journey included debugging edge cases, refining the prompt builder, and ensuring compatibility with enterprise coding standards. Late-night coding, countless test runs, and the excitement of seeing AI-generated SQL come alive made this project a memorable engineering experience.',
      image: 'assets/project/sql/act-7.png',
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
