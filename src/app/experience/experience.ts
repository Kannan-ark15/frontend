import { Component } from '@angular/core';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';

@Component({
  selector: 'app-experience',
  imports: [AppNavbarComponent],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
    menuItems = [
    { label: 'Profession', route: '/profession' },
    { label: 'Skills', route: '/skills' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact Me', route: '/contact' }
  ];

}
