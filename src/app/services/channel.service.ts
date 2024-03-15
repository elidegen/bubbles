import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Channel {
  id:number, 
  name: string,
  users: number[], // Array of user ID's inside the channel
  messages: number[], // Array of message ID's inside the channel
}


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }


}
