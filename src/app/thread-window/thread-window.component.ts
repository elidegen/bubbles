import { Component, Input, ViewChild } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';
import { HttpClient } from '@angular/common/http';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { GroupedMessagesComponent } from '../grouped-messages/grouped-messages.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-thread-window',
  standalone: true,
  imports: [MessageBarComponent, GroupedMessagesComponent, SearchComponent],
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss'
})
export class ThreadWindowComponent {
  @Input() threadToDisplay!: Message;
  @ViewChild('chatWrapper') chatWrapper!: any;
  messagesToDisplay: Message[] = [];
  threadMessage: string = '';

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
    public mainService: MainService,
  ) {
    this.getMessagesToDisplay();
  }

  getMessagesToDisplay() {
    this.messagesToDisplay = this.messageService.threads.filter(obj => obj.source === this.threadToDisplay.id);
  }

}
