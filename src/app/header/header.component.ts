import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu: boolean = false;

  constructor(
    public mainService: MainService,
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

}
