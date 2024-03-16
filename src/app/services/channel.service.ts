import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Channel {
  id: number,
  name: string,
  users: number[], // Array of user ID's inside the channel
}


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  channels = [
    {
      id: 20,
      name: 'testchannel1',
      users: [10, 11, 12, 13, 14],
    },
    {
      id: 21,
      name: 'testchannel2',
      users: [10, 11, 12, 13, 14],
    },
    {
      id: 22,
      name: 'testchannel3',
      users: [10, 11, 12, 13, 14],
    }
  ];

  constructor() { }



}
