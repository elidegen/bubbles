import { Component } from '@angular/core';
import { DummyService } from '../services/dummy.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public ds: DummyService) {

  }
}
