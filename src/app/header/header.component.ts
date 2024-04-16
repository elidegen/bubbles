import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainService } from '../services/main.service';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SideMenuButtonComponent } from '../svgs/side-menu-button/side-menu-button.component';
import { ColorPickerComponent } from '../svgs/color-picker/color-picker.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchComponent, FormsModule, SideMenuButtonComponent, ColorPickerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu: boolean = false;
  showThemes: boolean = false;
  selectedTheme: string = localStorage.getItem('selectedTheme') || 'purple';
  @ViewChild('picker') picker!: ElementRef;

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

  toggleSideMenu() {
    this.mainService.sideMenuOpen = !this.mainService.sideMenuOpen;
  }

  saveTheme() {
    localStorage.setItem('selectedTheme', this.selectedTheme);
  }

  showThemesPicker() {
    this.showThemes = !this.showThemes;    
    this.picker.nativeElement.classList.remove('invisible');
  }
}