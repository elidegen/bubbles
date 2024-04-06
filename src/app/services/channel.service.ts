import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Message, MessageService } from './message.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { MainService } from './main.service';

export class Channel {
  id: number;
  name: string;
  description?: string; // optional because direct messages doesnt have
  members: number[]; // Array of user ID's inside the channel
  is_channel: boolean;
  picture?: string;
  read_by: number[];
  hash: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.name = obj ? obj.name : '';
    this.description = obj ? obj.description : '';
    this.members = obj ? obj.members : [];
    this.is_channel = obj ? obj.is_channel : false;
    this.picture = obj ? obj.picture : '';
    this.read_by = obj ? obj.read_by : [];
    this.hash = obj ? obj.hash : '';
  }
}

export interface ChatsAndPreview {
  channels: Channel[],
  preview_messages: Message[],
}

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  getChannelsUrl: string = environment.baseUrl + 'channels-and-preview/' + this.authService.currentUser.id;
  $chatsAndPreview: BehaviorSubject<ChatsAndPreview> = new BehaviorSubject<ChatsAndPreview>({
    channels: [],
    preview_messages: [],
  });
  channels: Channel[] = [];
  directMessages: Channel[] = [];
  currentChannel!: Channel;
  chatPreviews: Message[] = [];
  chats: Channel[] = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient,
    private userService: UserService,
    private mainService: MainService,
  ) {
    let localStorageAsString = localStorage.getItem('currentChannel');
    this.currentChannel = JSON.parse(localStorageAsString as string);
    if (this.currentChannel) {
      messageService.getMessagesAndThread(this.currentChannel.id);
    } else {
      this.mainService.deactivateLoader();
    }
  }

  getImg(imgUrl: string | undefined) {
    if (imgUrl != null) {
      return environment.baseUrl.slice(0, -1) + imgUrl;
    } else {
      return 'assets/img/profile_placeholder.svg';
    }
  }

  async getChatsForUser() {
    const data = await firstValueFrom(this.fetchChatsAndPreview());
    this.$chatsAndPreview.next(data);
    this.subscribeChatsAndPreview();
    this.mainService.deactivateLoader();
  }

  fetchChatsAndPreview(): Observable<ChatsAndPreview> {
    return this.http.get<ChatsAndPreview>(this.getChannelsUrl);
  }

  subscribeChatsAndPreview() {
    this.$chatsAndPreview.subscribe(data => {
      this.chats = data.channels;
      this.chatPreviews = data.preview_messages;
      console.log('previews:', this.chatPreviews);
      console.log('chats: ', this.chats);
      this.filterChats();
      this.userService.getUsers();
    });
  }

  openChannel(id: number) {
    this.currentChannel = this.chats.find(obj => obj.id === id) as Channel;
    console.log('openChannel', this.currentChannel);
    localStorage.setItem('currentChannel', JSON.stringify(this.currentChannel));
    this.setRead(id);
    this.messageService.getMessagesAndThread(id);
    this.messageService.threadOpen = false;
  }

  filterChats() {
    this.channels = this.chats.filter(channel => channel.is_channel === true); //filters only channels that have currentuser as member
    this.directMessages = this.chats.filter(channel => channel.is_channel === false);
  }

  checkMsg(chatId: number) { // only render channels with messages?
    let messagesOfChat = this.messageService.currentMessages.filter(obj => obj.source === chatId);
    return messagesOfChat.length > 0
  }

  getChannel(channelId: number) {
    console.log('channelId', channelId);
    
    return this.channels.find(obj => obj.id === channelId) as Channel;
  }

  setUnread(channelId: number) {
    const index = this.chats.findIndex(obj => obj.id === channelId);
    this.chats[index].read_by = [this.authService.currentUser.id];
  }

  setRead(channelId: number) {
    const index = this.chats.findIndex(obj => obj.id === channelId);
    if (!this.chats[index].read_by.includes(this.authService.currentUser.id)) {
      this.chats[index].read_by = [this.authService.currentUser.id];
    }
  }

  sendMsg(messageContent: string, isThread: boolean) {
    if (messageContent.trim()) {
      let newMessage: Message = {
        id: 0,
        author: this.authService.currentUser.id,
        reactions: [],
        source: isThread ? this.messageService.currentThread.id : this.currentChannel.id,
        content: messageContent,
        created_at: new Date().getTime(),
        hash: ''
      }

      if (isThread) {
        this.messageService.postMessage('threads/', newMessage);
      } else {
        this.messageService.postMessage('messages/', newMessage);
        this.setUnread(this.currentChannel.id);
      }
    }
  }
}