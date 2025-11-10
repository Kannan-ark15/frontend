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
    { label: 'Profession', route: '/profession' },
    { label: 'Skills', route: '/skills' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact Me', route: '/contact' }
  ];

}
