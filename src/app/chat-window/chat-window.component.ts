import { Component, Input } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { GroupedMessagesComponent } from '../grouped-messages/grouped-messages.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule, MessageBarComponent, ChatHeaderComponent, GroupedMessagesComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @Input() channelToDisplay!: Channel | Message;
  @Input() isThread!: boolean;
  threadMessage: string = '';
  messagesToDisplay: Message[] = [];

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
  ) {
    this.getMessagesToDisplay();
  }

  getMessagesToDisplay() {
    if (this.isThread) {
      this.messagesToDisplay = this.messageService.threads.filter(obj => obj.source === this.channelToDisplay.id);
    } else {
      this.messagesToDisplay = this.messageService.currentMessages;
    }
  }

  // isThread() {
  //   if ('reactions' in this.channelToDisplay)
  //     this.threadMessage = this.channelToDisplay.content;
  //   return 'reactions' in this.channelToDisplay
  // }

  isSeperator(obj: any) {
    return obj instanceof Date
  }

  checkGroupedMsg(messages: any) {
    return messages as Message[];
  }

  createSeperator(date: any) {
    const weekday = date.toLocaleDateString("en-EN", { weekday: 'long' });
    const dateString = date.toLocaleDateString();
    return weekday + ' ' + dateString;
  }
}