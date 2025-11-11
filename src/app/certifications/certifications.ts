import { Component } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';

@Component({
  selector: 'app-certifications',
  imports: [AppNavbarComponent],
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

}
