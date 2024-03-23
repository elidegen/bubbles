import { Component } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatWindowComponent, FormsModule, SideMenuComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentUser: CurrentUser;
  openMenu: boolean = false;
  sideMenuOpen: boolean = true;
  threadOpen: boolean = false;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public mainService: MainService,
    public authService: AuthService,
    private router: Router
  ) {
    this.currentUser = authService.currentUser;
  }

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
    this.sideMenuOpen = !this.sideMenuOpen;
  }
}