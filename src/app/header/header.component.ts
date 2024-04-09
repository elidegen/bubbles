import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu: boolean = false;
  showThemes: boolean = false;

  constructor(
    public mainService: MainService,
    public authService: AuthService,
    ) { }

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

  setTheme(color: string){
    console.log('theme');
    // document.documentElement.style.setProperty('var(--color1)', color)
  }
}