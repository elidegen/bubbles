import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthService } from './auth.service';
import { Message, MessageService } from './message.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { User, UserService } from './user.service';
import { MainService } from './main.service';
import { MessageContent } from '../message-bar/message-bar.component';
import { FormsModule } from '@angular/forms';

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
  @Output() scrollToBottom = new EventEmitter<any>();
  @Output() updateHeader = new EventEmitter<any>();
  @Output() renderGroupMember = new EventEmitter<any>();
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
    this.setCurrentChannel();
  }

  setCurrentChannel() {
    let localStorageAsString = localStorage.getItem('currentChannel');
    this.currentChannel = JSON.parse(localStorageAsString as string);
    if (this.currentChannel) {
      if (!this.currentChannel.members.some(obj => obj === this.authService.currentUser.id))
        localStorage.removeItem('currentChannel');
      this.messageService.getMessagesAndThread(this.currentChannel.id);
    } else {
      this.mainService.deactivateLoader();
    }
  }

  async getChatsForUser() {
    try {
      const data = await firstValueFrom(this.fetchChatsAndPreview());
      this.$chatsAndPreview.next(data);
      this.subscribeChatsAndPreview();
      this.mainService.deactivateLoader();
    } catch (error) {
      console.error('Error by fetching Chats:', error);
      throw error;
    }
  }

  fetchChatsAndPreview(): Observable<ChatsAndPreview> {
    const url: string = environment.baseUrl + 'channels-and-preview/' + this.authService.currentUser.id;
    return this.http.get<ChatsAndPreview>(url);
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
    this.mainService.showNewMessageSearch = false;
    this.currentChannel = this.chats.find(obj => obj.id === id) as Channel;
    localStorage.setItem('currentChannel', JSON.stringify(this.currentChannel));
    this.setRead(id);
    this.messageService.getMessagesAndThread(id);
    this.messageService.threadOpen = false;
    setTimeout(() => {
      this.scrollToBottom.emit();
      this.renderGroupMember.emit();
      this.updateHeader.emit();
    }, 100);
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
    return this.channels.find(obj => obj.id === channelId) as Channel;
  }

  async setUnread(channelId: number) {
    const url = environment.baseUrl + 'channels/' + channelId + '/';
    const index = this.chats.findIndex(obj => obj.id === channelId);
    this.chats[index].read_by = [this.authService.currentUser.id];
    const formData = new FormData();
    formData.append('read_by', this.authService.currentUser.id.toString());
    await firstValueFrom(this.http.patch<Channel>(url, formData));
  }

  async setRead(channelId: number) {
    const url = environment.baseUrl + 'channels/' + channelId + '/';
    const index = this.chats.findIndex(obj => obj.id === channelId);
    if (!this.chats[index].read_by.includes(this.authService.currentUser.id)) {
      this.chats[index].read_by.push(this.authService.currentUser.id);
    }
    const formData = new FormData();
    this.chats[index].read_by.forEach((memberId) => {
      formData.append('read_by', memberId.toString());
    })
    await firstValueFrom(this.http.patch<Channel>(url, formData));
  }

  sendMsg(messageContent: MessageContent, isThread: boolean) {
    let newMessage: Message = {
      id: 0,
      author: this.authService.currentUser.id,
      reactions: [],
      source: isThread ? this.messageService.currentThread.id : this.currentChannel.id,
      content: messageContent.content,
      created_at: new Date().getTime(),
      hash: '',
      attachment: messageContent.attachment
    }
    const formData = this.getMessageForm(newMessage, isThread);
    if (isThread) {
      this.postMessage('threads/', formData);
    } else {
      this.postMessage('messages/', formData);
      this.setUnread(this.currentChannel.id);
    }
  }

  async deleteMessage(message: Message) {
    let index = null;
    let url = '';
    if (this.messageService.currentMessages.some(obj => obj.id === message.id)) {
      index = this.messageService.currentMessages.findIndex(obj => obj.id === message.id);
      this.messageService.currentMessages.splice(index, 1);
      url = environment.baseUrl + 'messages/' + message.id + '/';
    } else {
      index = this.messageService.threads.findIndex(obj => obj.id === message.id);
      this.messageService.threads.splice(index, 1);
      url = environment.baseUrl + 'threads/' + message.id + '/';
    }
    await firstValueFrom(this.http.delete(url));
  }

  async postMessage(endpoint: string, message: FormData) {
    const url = environment.baseUrl + endpoint;
    const response = await firstValueFrom(this.http.post(url, message)) as Message;
    if (endpoint === 'messages/') {
      this.messageService.currentMessages.push(response);
      this.replacePreview(response);
    } else {
      this.messageService.threads.push(response);
    }
  }

  replacePreview(message: Message) {
    const index = this.chatPreviews.findIndex(obj => obj.source === message.source);
    if(index == -1){
      this.chatPreviews.push(message);
    } else {
      this.chatPreviews[index] = message;
    }
  }

  getMessageForm(newMessage: Message, isThread: boolean) {
    const formData = new FormData();
    formData.append('author', this.authService.currentUser.id.toString());
    if (newMessage.reactions.length > 0) {
      formData.append('reactions', JSON.stringify(newMessage.reactions));
    }
    formData.append('source', isThread ? this.messageService.currentThread.id.toString() : this.currentChannel.id.toString());
    formData.append('content', newMessage.content);
    if (newMessage.attachment instanceof File) {
      formData.append('attachment', newMessage.attachment);
    }
    return formData;
  }

  getImg(imgUrl: string | undefined | null) {
    if (imgUrl) {
      if (imgUrl.startsWith('https:')) {
        return imgUrl; //if full link is available just return full link
      } else {
        return environment.baseUrl.slice(0, -1) + imgUrl;
      }
    } else {
      return 'assets/img/profile_placeholder.svg';
    }
  }

  isSeperator(obj: any) {
    return obj instanceof Date
  }

  createSeperator(date: any) {
    const weekday = date.toLocaleDateString("en-EN", { weekday: 'long' });
    const dateString = date.toLocaleDateString();
    return weekday + ' ' + dateString;
  }

  checkGroupedMsg(messages: any) {
    return messages as Message[];
  }

  async selectDirectMessage(user: User) {
    const userId = user.id || 0;
    if (!this.dmAlreadyExist(userId)) {
      this.createDmWithUser(userId);
    } else {
      this.openChannel(this.directMessages.find(obj => obj.members.includes(userId))!.id);
    }
  }

  dmAlreadyExist(userId: number) {
    return this.directMessages.some(obj => obj.members.includes(userId));
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
    await this.getChatsForUser(); //remove
    this.openChannel(response.id);
  }
}