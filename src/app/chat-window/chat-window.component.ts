import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageBarComponent } from '../message-bar/message-bar.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { GroupedMessagesComponent } from '../grouped-messages/grouped-messages.component';
import { MainService } from '../services/main.service';
import { SearchComponent } from '../search/search.component';
import { User } from '../services/user.service';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule, MessageBarComponent, ChatHeaderComponent, GroupedMessagesComponent, SearchComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {
  @Input() channelToDisplay!: Channel;
  @ViewChild('chatWrapper') chatWrapper!: any;
  messagesToDisplay: Message[] = [];

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
    public mainService: MainService,
    private http: HttpClient,
  ) {
    this.getMessagesToDisplay();
  }

  ngOnInit(): void {
    this.channelService.scrollToBottom.subscribe(() => {
      this.scrollToBottom();
    })
  }

  scrollToBottom() {
    this.chatWrapper.nativeElement.scrollTop = this.chatWrapper.nativeElement.scrollHeight;
  }

  getMessagesToDisplay() {
    this.messagesToDisplay = this.messageService.currentMessages;
  }

  selectUser($event: User[]) {
    const user = $event[0];
    if (user.id === this.authService.currentUser.id) {
      this.dmWithSelf();
    } else {
      this.createDirectMessage(user);
    }
  }

  dmWithSelf() {
    if (this.currentUserDmAlreadyExist()) {
      const channel = this.channelService.directMessages.find(obj => obj.members.length === 1 && obj.members.includes(this.authService.currentUser.id))!.id

      this.channelService.openChannel(channel);
    } else {
      this.createDmWithUser(this.authService.currentUser.id);
    }
  }

  async createDirectMessage(user: User) {
    const userId = user.id || 0;
    if (!this.dmAlreadyExist(userId)) {
      this.createDmWithUser(userId);
    } else {
      this.channelService.openChannel(this.channelService.directMessages.find(obj => obj.members.includes(userId))!.id);
    }
  }

  async createDmWithUser(userId: number) {
    let members = [];
    members.push(userId);
    members.push(this.authService.currentUser.id);
    const newChannel: Channel = {
      id: 0,
      name: 'DirectMessage',
      members: members,
      is_channel: false,
      read_by: [],
      hash: '',
      description: '',
      picture: undefined,
    }
    const url = environment.baseUrl + 'channels/';
    const response = await firstValueFrom(this.http.post(url, newChannel)) as Channel;
    await this.channelService.getChatsForUser(); //remove
    this.channelService.openChannel(response.id);
  }

  dmAlreadyExist(userId: number) {
    return this.channelService.directMessages.some(obj => obj.members.includes(userId));
  }

  currentUserDmAlreadyExist() {
    return this.channelService.directMessages.some(obj => obj.members.length === 1 && obj.members.includes(this.authService.currentUser.id));
  }
}