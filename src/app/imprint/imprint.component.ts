import { Component } from '@angular/core';
import { CloseComponent } from '../svgs/close/close.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CloseComponent, RouterLink],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
}
