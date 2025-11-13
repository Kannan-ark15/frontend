import { Component } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { CommonModule } from '@angular/common';

interface Certificate {
  title: string;
  issuer: string;
  platform: string;
  platformColor: string;
  icon: string;
  date: string;
  duration?: string;
  skills: string[];
  link: string;
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-certifications',
  imports: [AppNavbarComponent, CommonModule],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css',
})
export class Certifications {
  menuItems = [
    { label: 'Experience', route: '/experience' },
    { label: 'Skills', route: '/skills' },
    { label: 'Certifications', route: '/certifications' },
    { label: 'Contact Me', route: '/contact' }
  ];

  certificates: Certificate[] = [
    {
      title: 'Complete Course',
      issuer: 'Udemy',
      platform: 'UDEMY',
      platformColor: 'linear-gradient(135deg, #a435f0 0%, #7c1fd6 100%)',
      icon: '🎓',
      date: 'Completed 2024',
      duration: 'Self-paced',
      skills: ['Web Development', 'Programming', 'Professional Skills'],
      link: 'https://www.udemy.com/certificate/UC-ef297470-5dcd-4212-9c17-0eb24527fb2f/'
    },
    {
      title: 'Course Completion',
      issuer: 'Coursera',
      platform: 'COURSERA',
      platformColor: 'linear-gradient(135deg, #0056d2 0%, #003d99 100%)',
      icon: '📚',
      date: 'Completed 2024',
      duration: 'Online Course',
      skills: ['Academic Learning', 'Skill Development', 'Professional Growth'],
      link: 'https://www.coursera.org/account/accomplishments/verify/3Q8RZMY4DKVU?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course'
    },
    {
      title: 'Specialization Certificate',
      issuer: 'Coursera',
      platform: 'COURSERA',
      platformColor: 'linear-gradient(135deg, #0056d2 0%, #003d99 100%)',
      icon: '🏆',
      date: 'Completed 2024',
      duration: 'Multi-Course Program',
      skills: ['Advanced Topics', 'Comprehensive Learning', 'Expert Level'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/C3Y2KJDBA9KY?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n'
    }
  ];

  stats: Stat[] = [
    { icon: '🎯', value: '3+', label: 'Certifications' },
    { icon: '📖', value: '2+', label: 'Platforms' },
    { icon: '⭐', value: '100%', label: 'Completion Rate' },
    { icon: '🚀', value: 'Active', label: 'Learning Journey' }
  ];

  openCertificate(link: string): void {
    window.open(link, '_blank');
  }
}