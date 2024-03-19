import { Component } from '@angular/core';
import { ChannelPreviewComponent } from '../channel-preview/channel-preview.component';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ChannelPreviewComponent,],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
    public mainService: MainService
  ) { }

  newChannelDialog() {
    this.mainService.showPopup = true;
    this.mainService.addChannelPopup = true;
  }
}