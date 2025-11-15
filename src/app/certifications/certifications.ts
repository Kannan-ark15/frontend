import { Component, inject } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule,GraduationCap,Book,Trophy,Target,Star,Rocket} from 'lucide-angular';
import { ProfileService } from '../profile-page/profile-service';
import { Router } from '@angular/router';
interface Certificate {
  title: string;
  issuer: string;
  platform: string;
  platformColor: string;
  icon: any;
  date: string;
  duration?: string;
  skills: string[];
  link: string;
}

interface Stat {
  icon: any;
  value: string;
  label: string;
}

@Component({
  selector: 'app-certifications',
  imports: [AppNavbarComponent, CommonModule,LucideAngularModule],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css',
})
export class Certifications {
    certificates: Certificate[] = [
    {
      title: 'Web Development Bootcamp',
      issuer: 'Udemy',
      platform: 'UDEMY',
      platformColor: 'linear-gradient(135deg, #a435f0 0%, #7c1fd6 100%)',
      icon: GraduationCap,
      date: 'Jan 12 2023',
      duration: 'Self-paced',
      skills: ['Web Development', 'Rest-Api','O-Auth','MERN Stack','MongoDB'],
      link: 'https://www.udemy.com/certificate/UC-ef297470-5dcd-4212-9c17-0eb24527fb2f/'
    },
    {
      title: 'Machine Learning',
      issuer: 'Coursera',
      platform: 'COURSERA',
      platformColor: 'linear-gradient(135deg, #0056d2 0%, #003d99 100%)',
      icon: Book,
      date: '03 March 2022',
      duration: '3 Months',
      skills: ['ML Algorithms', 'Supervised Learning', 'Unsupervised Learning','Reinforcement Learning'],
      link: 'https://www.coursera.org/account/accomplishments/verify/3Q8RZMY4DKVU?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course'
    },
    {
      title: 'Python For Everybody',
      issuer: 'Coursera',
      platform: 'COURSERA',
      platformColor: 'linear-gradient(135deg, #0056d2 0%, #003d99 100%)',
      icon: Trophy,
      date: 'June 1 2021',
      duration: '2 Months 10 Days',
      skills: ['Python', 'Web-Scraping', 'Dataretreival with Python'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/C3Y2KJDBA9KY?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n'
    }
  ];

  stats: Stat[] = [
    { icon: Target, value: '3+', label: 'Certifications' },
    { icon: Book, value: '2+', label: 'Platforms' },
    { icon: Star, value: '100%', label: 'Completion Rate' },
    { icon: Rocket, value: 'Active', label: 'Learning Journey' }
  ];
  menuItems:any[]=[]
  profile=''
  router=inject(Router);
  profileService=inject(ProfileService)
  openCertificate(link: string): void {
    window.open(link, '_blank');
  }

  ngOnInit(){
     const currentUrl = this.router.url;
    const profileMatch = currentUrl.match(/\/(recruiter|developer|stalker)\//);
    
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
}