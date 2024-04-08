import { Component } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MainService } from '../services/main.service';
import { NewMessageComponent } from '../new-message/new-message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatWindowComponent, FormsModule, SideMenuComponent,CommonModule, HeaderComponent, NewMessageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentUser: CurrentUser;
  threadOpen: boolean = false;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public mainService: MainService,
    public authService: AuthService,
  ) {
    this.currentUser = authService.currentUser;
  }
}