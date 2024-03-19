import { Component, Input } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Channel, ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageBarComponent } from '../message-bar/message-bar.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MessageComponent, FormsModule, MessageBarComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @Input() channelToDisplay!: Channel;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
  ) { }

}