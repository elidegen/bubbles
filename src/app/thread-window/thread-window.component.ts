import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { GroupedMessagesComponent } from '../grouped-messages/grouped-messages.component';
import { SearchComponent } from '../search/search.component';
import { MessageComponent } from '../message/message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thread-window',
  standalone: true,
  imports: [MessageBarComponent, GroupedMessagesComponent, SearchComponent, CommonModule],
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss'
})
export class ThreadWindowComponent implements OnInit {
  @Input() threadToDisplay!: Message;
  @ViewChild('chatWrapper') chatWrapper!: any;
  messagesToDisplay: Message[] = [];
  threadMessage: string = '';

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
    public mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.getMessagesToDisplay();
  }

  getMessagesToDisplay() {
    this.messagesToDisplay = this.messageService.threads.filter(obj => obj.source === this.threadToDisplay.id);
  }

  getThreadMessage() {
    this.threadMessage = this.threadToDisplay.content;
  }

  closeThread() {
    this.messageService.threadOpen = false;
  }

  getImg(attachment: any) {
    if (typeof attachment === 'string') {
      return this.channelService.getImg(attachment)
    }
    return false
  }
}