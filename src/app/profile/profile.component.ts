import { Component } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(
    public mainService: MainService,
  ) { }

}
