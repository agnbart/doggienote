import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { CardComponent } from '../ui/card/card.component';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'dg-landing-page',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent { 
  
}