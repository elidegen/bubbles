import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface Channel {
  id: number,
  name: string,
  description?: string, // optional because direct messages doesnt have
  members: number[], // Array of user ID's inside the channel
  isChannel: boolean
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
      isChannel: true
    },
    {
      id: 21,
      name: 'testchannel2',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      isChannel: true
    },
    {
      id: 22,
      name: 'testchannel3',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      isChannel: true
    },
    {
      id: 23,
      name: 'Joshua',
      members: [10, 11],
      isChannel: false
    },
    {
      id: 24,
      name: 'Elijah',
      members: [10, 11],
      isChannel: false
    },
    {
      id: 25,
      name: 'Anna',
      members: [10, 11],
      isChannel: false
    },
    {
      id: 26,
      name: 'Moritz',
      members: [10, 11],
      isChannel: false
    },
    {
      id: 27,
      name: 'Sabine',
      members: [10, 11],
      isChannel: false
    },
    {
      id: 28,
      name: 'Claudia',
      members: [10, 11],
      isChannel: false
    },
    {
      id: 29,
      name: 'testchannel4',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      isChannel: true
    },
    {
      id: 30,
      name: 'testchannel5',
      description: 'this is description',
      members: [10, 11, 12, 13, 14],
      isChannel: true
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
      return channel.isChannel === true && channel.members.includes(this.authService.currentUser.id)
    }); //filters only channels that have currentuser as member

    this.directMessages = this.chats.filter(channel => {
      return channel.isChannel === false && channel.members.includes(this.authService.currentUser.id)
    });
  }
}