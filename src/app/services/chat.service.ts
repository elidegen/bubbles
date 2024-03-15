import { Injectable } from '@angular/core';


export interface Message {
  id: number,
  author: number, //ID from User
  channel: number, //ID from Channel
  content: string, 
  created_at: Date,
  thread_messages: number[]; // Array with ID's from threadmessages
}

export interface ThreadMessage {
  id: number,
  author: number, //ID from User
  message: number, //ID from Message
  content: string, 
  created_at: Date,
  thread_messages: number[]; // Array with ID's from threadmessages
}

@Injectable({
  providedIn: 'root'
})


export class ChatService {

  constructor() { }


}
