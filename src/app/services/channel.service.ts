import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export class Channel {
  id: number;
  name: string;
  description?: string; // optional because direct messages doesnt have
  members: number[]; // Array of user ID's inside the channel
  is_channel: boolean;
  picture: null | string;
  read_by: number[];

  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.name = obj ? obj.name : '';
    this.description = obj ? obj.description : '';
    this.members = obj ? obj.members : [];
    this.is_channel = obj ? obj.is_channel : false;
    this.picture = obj ? obj.picture : '';
    this.read_by = obj ? obj.read_by : [];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  getChannelsUrl: string = environment.baseUrl + 'channels-for-user/' + this.authService.currentUser.id;

  getChatsForUser() {
    this.http.get<Channel[]>(this.getChannelsUrl).subscribe(response => {
      this.$chats.next(response);
      this.updateChats();
    }, error => {
      
    });
  }

  updateChats(){
    this.$chats.subscribe( data => {
      this.chats = data;
      this.filterChats();
    });
  }



  $chats: BehaviorSubject<Channel[]> = new BehaviorSubject<Channel[]>([]);

  chats: Channel[] = [
    {
      id: 20,
      name: 'testchannel1',
      description: 'this is description',
      members: [10, 11, 12],
      is_channel: true,
      picture: 'assets/img/profile_placeholder_green.svg',
      read_by: [],
    },
    {
      id: 21,
      name: 'testchannel2',
      description: 'this is description',
      members: [11, 13, 12, 10, 14],
      is_channel: true,
      picture: 'assets/img/profile_placeholder_blue.svg',
      read_by: [],
    },
    {
      id: 22,
      name: 'testchannel3',
      description: 'this is description',
      members: [11, 12, 10, 13],
      is_channel: true,
      picture: 'assets/img/profile_placeholder_red.svg',
      read_by: [],
    },
    {
      id: 23,
      name: 'Joshua',
      members: [10, 11],
      is_channel: false,
      picture: '',
      read_by: [],
    },
    {
      id: 24,
      name: 'Elijah',
      members: [12, 10],
      is_channel: false,
      picture: '',
      read_by: [],
    },
    {
      id: 25,
      name: 'Anna',
      members: [10, 14],
      is_channel: false,
      picture: '',
      read_by: [],
    },
    {
      id: 26,
      name: 'Moritz',
      members: [10, 13],
      is_channel: false,
      picture: '',
      read_by: [],
    },
    {
      id: 27,
      name: 'Sabine',
      members: [10, 12],
      is_channel: false,
      picture: '',
      read_by: [],
    },
    {
      id: 28,
      name: 'Claudia',
      members: [10, 11],
      is_channel: false,
      picture: '',
      read_by: [],
    },
    {
      id: 29,
      name: 'testchannel4',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      is_channel: true,
      picture: '',
      read_by: [],
    },
    {
      id: 30,
      name: 'testchannel5',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      is_channel: true,
      picture: '',
      read_by: [],
    }
  ];

  channels: Channel[] = [];
  directMessages: Channel[] = [];
  currentChannel!: Channel;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient,
  ) {
    
    let localStorageAsString = localStorage.getItem('currentChannel');
    this.currentChannel = JSON.parse(localStorageAsString as string);
  }

  openChannel(id: number) {
    this.currentChannel = this.chats.find(obj => obj.id === id) as Channel;
    localStorage.setItem('currentChannel', JSON.stringify(this.currentChannel));
    this.setRead(id);
  }

  filterChats() {
    this.channels = this.chats.filter(channel => {
      return channel.is_channel === true; // && channel.members.includes(this.authService.currentUser.id)// && this.checkMsg(channel.id);
    }); //filters only channels that have currentuser as member

    this.directMessages = this.chats.filter(channel => {
      return channel.is_channel === false && channel.members.includes(this.authService.currentUser.id)// && this.checkMsg(channel.id);
    });
  }

  checkMsg(chatId: number) { // only render channels with messages?
    let messagesOfChat = this.messageService.messages.filter(obj => obj.source === chatId);
    return messagesOfChat.length > 0
  }

  sortChats(arrayToSort: Channel[]) {
    let chatLastMsgSorted = [];
    for (let i = 0; i < arrayToSort.length; i++) {
      let msgsOfChat = this.messageService.messages.filter(obj => obj.source === arrayToSort[i].id);
      msgsOfChat.sort((a, b) => a.created_at - b.created_at);
      let lastMsg = msgsOfChat[msgsOfChat.length - 1];
      if (lastMsg)
        chatLastMsgSorted.push(lastMsg);
    }
    chatLastMsgSorted.sort((a, b) => a.created_at - b.created_at);
    return chatLastMsgSorted;
  }

  getChannel(channelId: number) {
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
}