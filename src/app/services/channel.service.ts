import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export class Channel {
  id: number;
  name: string;
  description?: string; // optional because direct messages doesnt have
  members: number[]; // Array of user ID's inside the channel
  is_channel: boolean;
  picture: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.name = obj ? obj.name : '';
    this.description = obj ? obj.description : '';
    this.members = obj ? obj.members : [];
    this.is_channel = obj ? obj.is_channel : false;
    this.picture = obj ? obj.picture : '';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  chats: Channel[] = [
    {
      id: 20,
      name: 'testchannel1',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      is_channel: true,
      picture: 'assets/img/profile_placeholder_green.svg',
    },
    {
      id: 21,
      name: 'testchannel2',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      is_channel: true,
      picture: 'assets/img/profile_placeholder_blue.svg',
    },
    {
      id: 22,
      name: 'testchannel3',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      is_channel: true,
      picture: 'assets/img/profile_placeholder_red.svg',
    },
    {
      id: 23,
      name: 'Joshua',
      members: [10, 11],
      is_channel: false,
      picture: '',
    },
    {
      id: 24,
      name: 'Elijah',
      members: [12, 10],
      is_channel: false,
      picture: '',
    },
    {
      id: 25,
      name: 'Anna',
      members: [10, 14],
      is_channel: false,
      picture: '',
    },
    {
      id: 26,
      name: 'Moritz',
      members: [10, 13],
      is_channel: false,
      picture: '',
    },
    {
      id: 27,
      name: 'Sabine',
      members: [10, 12],
      is_channel: false,
      picture: '',
    },
    {
      id: 28,
      name: 'Claudia',
      members: [10, 11],
      is_channel: false,
      picture: '',
    },
    {
      id: 29,
      name: 'testchannel4',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      is_channel: true,
      picture: '',
    },
    {
      id: 30,
      name: 'testchannel5',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      is_channel: true,
      picture: '',
    }
  ];
  channels: Channel[] = [];
  directMessages: Channel[] = [];
  currentChannel!: Channel;

  constructor(
    private authService: AuthService,
  ) {
    this.filterChats();
    let localStorageAsString = localStorage.getItem('currentChannel');
    this.currentChannel = JSON.parse(localStorageAsString as string);
  }

  openChannel(id: number) {
    this.currentChannel = this.chats.find(obj => obj.id === id) as Channel;
    localStorage.setItem('currentChannel', JSON.stringify(this.currentChannel));
  }

  filterChats() {
    this.channels = this.chats.filter(channel => {
      return channel.is_channel === true && channel.members.includes(this.authService.currentUser.id)
    }); //filters only channels that have currentuser as member

    this.directMessages = this.chats.filter(channel => {
      return channel.is_channel === false && channel.members.includes(this.authService.currentUser.id)
    });
  }

  getChannel(channelId: number) {
    return this.channels.find(obj => obj.id === channelId);
  }
}