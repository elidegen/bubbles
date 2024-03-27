import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu: boolean = false;

  constructor(
    private router: Router,
    public mainService: MainService,
    ) { }

  logout() {
    this.router.navigate(['/login']);
  }

  openProfile() {
    this.mainService.showPopup = true;
    this.mainService.profilePopup = true;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  toggleSideMenu(){
    this.mainService.sideMenuOpen = !this.mainService.sideMenuOpen;
  }

}
