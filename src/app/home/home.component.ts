import { Component } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from '../side-menu/side-menu.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatWindowComponent, FormsModule, SideMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentUser: CurrentUser;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
  ) {
    this.currentUser = authService.currentUser;
  }
}
