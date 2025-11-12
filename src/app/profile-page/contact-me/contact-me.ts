import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  imports: [CommonModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe {
  contacts = [
    {
      name: 'Email',
      icon: '📧',
      link: 'mailto:yourname@example.com',
      color: '#e50914',
    },
    {
      name: 'GitHub',
      icon: '🐙',
      link: 'https://github.com/yourusername',
      color: '#6e5494',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      link: 'https://www.linkedin.com/in/yourusername/',
      color: '#0a66c2',
    },
  ];
}
