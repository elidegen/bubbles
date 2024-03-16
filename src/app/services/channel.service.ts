import { Injectable } from '@angular/core';

export interface Channel {
  id: number,
  name: string,
  users: number[], // Array of user ID's inside the channel
  isChannel: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  chats = [
    {
      id: 20,
      name: 'testchannel1',
      users: [10, 11, 12, 13, 14],
      isChannel: true
    },
    {
      id: 21,
      name: 'testchannel2',
      users: [10, 11, 12, 13, 14],
      isChannel: true
    },
    {
      id: 22,
      name: 'testchannel3',
      users: [10, 11, 12, 13, 14],
      isChannel: true
    },
    {
      id: 23,
      name: 'Joshua',
      users: [10, 11],
      isChannel: false
    },
    {
      id: 24,
      name: 'Elijah',
      users: [10, 11],
      isChannel: false
    },
    {
      id: 25,
      name: 'Anna',
      users: [10, 11],
      isChannel: false
    }
  ];
  channels: Channel[];
  directMessages: Channel[];

  constructor() { 
    this.channels = this.chats.filter(obj => obj.isChannel === true);
    this.directMessages = this.chats.filter(obj => obj.isChannel === false);
  }

}