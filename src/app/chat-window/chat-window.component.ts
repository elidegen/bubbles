import { Component, Input } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Channel, ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MessageComponent, FormsModule, MessageBarComponent, ChatHeaderComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @Input() channelToDisplay!: Channel | Message;
  threadMessage: string = '';

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
  ) { }

  isThread(){
    if('in_thread' in this.channelToDisplay)
    this.threadMessage = this.channelToDisplay.content;
    return 'in_thread' in this.channelToDisplay
  }
}