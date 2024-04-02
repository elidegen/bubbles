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
  $chats: BehaviorSubject<Channel[]> = new BehaviorSubject<Channel[]>([]);
  channels: Channel[] = [];
  directMessages: Channel[] = [];
  currentChannel!: Channel;
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

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient,
    private userService: UserService,
    private mainService: MainService,
  ) {
    let localStorageAsString = localStorage.getItem('currentChannel');
    this.currentChannel = JSON.parse(localStorageAsString as string);
  }


  getImg(imgUrl:string | undefined){
    if (imgUrl != null) {
      return environment.baseUrl.slice(0, -1) + imgUrl;
    } else {
      return 'assets/img/profile_placeholder.svg';
    }
    
  }

  // getChatsForUserOld() {
  //   this.fetchChatsForUser().pipe(take(1)).subscribe(
  //     {
  //       next: (data: Channel[]) => {
  //         this.$chats.next(data);
  //         this.updateChats();

  //       },
  //       error: () => {
  //         this.mainService.errorLog('Error by fetching channels')
  //       }
  //     });
  // }

  async getChatsForUser() {
    const data = await firstValueFrom(this.fetchChatsForUser());
    this.$chats.next(data);
    this.updateChats();
    console.log('chats', this.chats);
    this.mainService.deactivateLoader();
  }

  fetchChatsForUser(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.getChannelsUrl);
  }

  updateChats() {
    this.$chats.subscribe(data => {
      this.chats = data;
      this.filterChats();
      this.collectData();
      this.userService.getUsers();
      this.messageService.getMessages();
    });
  }

  /**
   * For each chat, we collect the members to fetch the userdata from. 
   * this.userService.collectUsers(member) : We collect an sort the members to prevent fetching userdata twice.
   */
  collectData() {
    this.chats.forEach(chat => {
      for (let member of chat.members) {
        this.userService.collectChatMembers(member);
      }
      this.messageService.chatCollection.push(chat.id);
    });
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

  sendMsg(messageContent: string, currentChat: Channel | Message) {
    if (messageContent.trim()) {
      let newMessage: Message = {
        id: 0,
        author: this.authService.currentUser.id,
        reactions: [],
        source: currentChat.id,
        content: messageContent,
        created_at: new Date().getTime(),
      } 
      this.messageService.messages.push(newMessage); //send newMessage to backend
      // if ('is_channel' in currentChat)
      //   this.channelService.setUnread(currentChat.id);
    }
  }
}