import { Component, Input } from '@angular/core';

@Component({
  selector: 'dg-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() imgSrc: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
}
