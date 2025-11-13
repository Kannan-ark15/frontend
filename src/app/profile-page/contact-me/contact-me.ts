import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Mail, Github, Linkedin } from 'lucide-angular';

interface Contact {
  name: string;
  iconComponent: any;
  link: string;
  color: string;
}

@Component({
  selector: 'app-contact-me',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe {
  contacts: Contact[] = [
    {
      name: 'Email',
      iconComponent: Mail,
      link: 'mailto:yourname@example.com',
      color: '#e50914',
    },
    {
      name: 'GitHub',
      iconComponent: Github,
      link: 'https://github.com/yourusername',
      color: '#6e5494',
    },
    {
      name: 'LinkedIn',
      iconComponent: Linkedin,
      link: 'https://www.linkedin.com/in/yourusername/',
      color: '#0a66c2',
    },
  ];
}