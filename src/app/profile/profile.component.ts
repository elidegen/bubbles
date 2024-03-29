import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

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
    private router: Router,
  ) { }

  logout() {
    this.router.navigate(['/login']);
    this.mainService.closePopups();
  }
}