import { Component } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';

@Component({
  selector: 'app-about',
  imports: [AppNavbarComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
    menuItems = [
    { label: 'Experience', route: '/experience' },
    { label: 'Skills', route: '/skills' },
    { label: 'Certifications', route: '/certifications' },
    { label: 'Contact Me', route: '/contact' }
  ];

}
