import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-netflix-intro',
  templateUrl: './netflix-intro.component.html',
  styleUrls: ['./netflix-intro.component.scss']
})
export class NetflixIntroComponent {
  @Input() letter: 'K' = 'K';
}