import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { ProjectShowcase } from '../project-showcase/project-showcase';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-page/profile-service';

export const SQL_PROJECT: ProjectShowcaseData = {
  title: 'SQL Sync Automation',
  subtitle: 'The Database Odyssey',
  description:
    'A unique automation system that <span class="highlight">synchronizes SQL changes intelligently</span> across <span class="highlight">multiple environments</span>, evolving from a simple idea into an <span class="highlight">agentic, MCP-powered innovation</span>.',
  techStack: ['Spring Boot', 'SQL', 'GitHub Copilot', 'MCP'],
  videoUrl: 'assets/project/videos/sql.mp4',
  badge: 'FEATURED',

  chapters: [
    {
      id: 1,
      title: 'Protagonist Introduction',
      content:
        `In our enterprise setup, SQL changes were updated only on the <span class="highlight">developer's server and the production server</span>. However, the <span class="highlight">remaining development servers used by other teams were left outdated</span>. During releases involving many teams, only my changes were available on my server—while the other teams' updates were missing. This forced me to <span class="highlight">manually apply 9–10 other teams' SQL changes every time</span>, leading to <span class="highlight">inconsistency and delays</span>. This recurring problem became the reason and "protagonist moment" that sparked the creation of this project.`,
      image: 'assets/project/sql/act-1.webp',
      color: '#e50914'
    },

    {
      id: 2,
      title: 'Setting Up the Characters',
      content:
        `To solve this challenge, I decided to use the tools and knowledge available to me—<span class="highlight">SQL, Spring Boot, command-line inputs, and GitHub Copilot</span>. These became the core "characters" of the story. With them, I set out to design an <span class="highlight">automation workflow</span> that could <span class="highlight">eliminate manual efforts</span> and keep <span class="highlight">all servers consistent</span>.`,
      image: 'assets/project/sql/act-2.webp',
      color: '#b20710'
    },

    {
      id: 3,
      title: 'Screenplay',
      content:
        `Just like a screenplay defines how scenes flow in a movie, I designed the flow of my system. Before every release, all SQL changes from developers would be stored inside a <span class="highlight">"Migrations" folder</span> alongside a file containing all <span class="highlight">enterprise server IPs</span>. When the system ran, it would read the IP list, <span class="highlight">create a thread pool</span>, and <span class="highlight">execute all SQL files in parallel on every server</span>. Each server would store <span class="highlight">execution details in a dedicated "migrations" database</span>, ensuring <span class="highlight">consistency and auditability</span> across environments.`,
      image: 'assets/project/sql/act-3.webp',
      color: '#8b0000'
    },

    {
      id: 4,
      title: 'Plot Twist',
      content:
        `After completing development, I discovered that the DB team already had an <span class="highlight">automation script capable of running queries on all servers</span>. However, they used it <span class="highlight">**only when a query was explicitly highlighted as affecting all servers**</span>. At the same time, I learned that <span class="highlight">tools like Liquibase already existed</span> with similar functionality. This was the plot twist—my project was no longer unique in its current form, and the story needed to change direction.`,
      image: 'assets/project/sql/act-4.webp',
      color: '#ff6b6b'
    },
    {
      id: 5,
      title: 'Ripple Effect',
      content:
        `A single spark changed everything: instead of developers manually typing SQL queries, what if <span class="highlight">AI generated them automatically</span>? This idea created the ripple effect that transformed the project. The concept evolved—whenever developers made changes in the <span class="highlight">model folder</span>, an <span class="highlight">AI should detect those changes, generate SQL queries for them</span>, and store the output using the <span class="highlight">Jira ID for easy synchronization</span>. This shift made the project <span class="highlight">truly unique and future-ready</span>.`,
      image: 'assets/project/sql/act-5.webp',
      color: '#ff9f1c'
    },
    {
      id: 6,
      title: 'Climax',
      content:
        `The breakthrough happened through the <span class="highlight">Model Context Protocol (MCP)</span>. I designed a <span class="highlight">custom MCP that integrates seamlessly with GitHub Copilot</span>. Now, when a developer commits changes in the model folder, they can simply instruct Copilot to <span class="highlight">"Generate SQL for this Jira ID."</span> The MCP <span class="highlight">detects git diffs</span>, builds a <span class="highlight">structured prompt file using enterprise SQL standards</span>, sends it to a <span class="highlight">Sonnet agent</span>, and stores the <span class="highlight">generated SQL in the Migrations folder—named after the Jira ID</span>. This approach aligns with <span class="highlight">modern agentic coding practices</span> and integrates naturally into the company's workflow.',
      metrics: [
        { label: 'AI Query Generation', value: '100%', icon: '⚙️' },
        { label: 'Manual Effort Reduced', value: '90%', icon: '⬇️' },
        { label: 'Developer Adoption', value: 'High', icon: '🚀' }
      `,
      image: 'assets/project/sql/act-6.webp',
      color: '#2ec4b6'
    },
    {
      id: 7,
      title: 'Behind the Scenes',
      content:
        `Building this project involved <span class="highlight">experimenting with MCP</span>, learning <span class="highlight">agentic flows</span>, and understanding how <span class="highlight">LLMs operate in developer tooling</span>. The journey included <span class="highlight">debugging edge cases</span>, refining the <span class="highlight">prompt builder</span>, and ensuring <span class="highlight">compatibility with enterprise coding standards</span>. Late-night coding, countless test runs, and the excitement of seeing <span class="highlight">AI-generated SQL come alive</span> made this project a memorable engineering experience.`,
      image: 'assets/project/sql/act-7.webp',
      color: '#9b59b6'
    }
  ]
};

@Component({
  selector: 'app-sql-project',
  standalone: true,
  imports: [CommonModule,AppNavbarComponent,ProjectShowcase],
  template: `
  <app-navbar [menuItems]="menuItems()"></app-navbar>
  <app-project-showcase [projectData]="sqlProject" [githubUrl]="githubUrl"></app-project-showcase>
  `,
})
export class SqlProject{
  sqlProject = SQL_PROJECT;
  profile=''
  allMenuItems:any[]=[];
    router=inject(Router)
  profileService=inject(ProfileService)
   menuItems=signal<any[]>([]);
   githubUrl='https://github.com/Kannan-ark15/sqlautomation';
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
    this.allMenuItems = [
      { label: 'Home', route: `/${this.profile}/home` },
      { label: 'Experience', route: `/${this.profile}/experience`,section:'Experience' },
      { label: 'Skills', route: `/${this.profile}/skills`,section:'Skills' },
      { label: 'Projects', route: `/${this.profile}/home`, fragment: 'projects-section' },
      { label: 'Contact Me', route: `/${this.profile}/home`, fragment: 'contact-id' },
    ];

       this.menuItems.set(
      this.allMenuItems.filter((item: { section: string; }) => 
        !item.section || !this.profileService.isSectionRestricted(item.section,this.profile)
      )
    );

  }

}
