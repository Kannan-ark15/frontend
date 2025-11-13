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
      link: 'https://mail.google.com/mail/?view=cm&to=kannanar464@gmail.com&su=Hello&body=Hi%20there!',
      color: '#e50914',
    },
    {
      name: 'GitHub',
      iconComponent: Github,
      link: 'https://github.com/Kannan-ark15',
      color: '#6e5494',
    },
    {
      name: 'LinkedIn',
      iconComponent: Linkedin,
      link: 'https://www.linkedin.com/in/ar-kannan',
      color: '#0a66c2',
    },
  ];
}