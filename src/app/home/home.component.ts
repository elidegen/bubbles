import { Component } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { ChannelPreviewComponent } from '../channel-preview/channel-preview.component';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MessageComponent, ChannelPreviewComponent],
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
