import { Component, Input } from '@angular/core';
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
export class ChatWindowComponent {
  @Input() channelToDisplay!: Channel | Message;
  @Input() isThread!: boolean;
  threadMessage: string = '';
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

  selectUser($event: User[]) {
    const user = $event[0];
    this.createDirectMessage(user);
  }

  async createDirectMessage(user: User) {
    console.log('createmsg user', user);

    const userId = user.id || 0;
    if (!this.channelService.directMessages.some(obj => obj.members.includes(userId))) {
      console.log('directmessage exist?', this.channelService.directMessages.some(obj => obj.members.includes(userId)));

      const newChannel: Channel = {
        id: 0,
        name: 'DirectMessage',
        members: [userId, this.authService.currentUser.id],
        is_channel: false,
        read_by: [],
        hash: '',
        description: '',
        picture: undefined,
      }

      const url = environment.baseUrl + 'channels/';
      const response = await firstValueFrom(this.http.post(url, newChannel)) as Channel;
      await this.channelService.getChatsForUser();

      this.channelService.openChannel(response.id);

    } else {
      this.channelService.openChannel(this.channelService.directMessages.find(obj => obj.members.includes(userId))!.id)
    }

  }

  // async postChannel() {
  //   const url = environment.baseUrl + 'channels/';
  //   const formData = new FormData();

  //   if (this.imgSelected) {
  //     formData.append('name', this.newChannel.name);
  //     formData.append('description', JSON.stringify(this.newChannel.description));
  //     this.newChannel.members.forEach(memberId => {
  //       formData.append('members', memberId.toString());
  //     });
  //     formData.append('is_channel', this.newChannel.is_channel.toString());
  //     formData.append('picture', this.imgSelected);
  //   };
  //   const response = await firstValueFrom(this.http.post(url, formData)) as Channel;
  //   console.log('created and uploaded channel: ', response);
  //   this.mainService.closePopups();
  // }
}