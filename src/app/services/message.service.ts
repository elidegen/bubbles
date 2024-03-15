import { Injectable } from '@angular/core';

export interface Message {
  id: number,
  author: number, //ID from User
  isThread: boolean;
  source: number, //ID from Channel
  content: string, 
  created_at: Date,
  thread_messages: number[]; // Array with ID's from threadmessages
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor() { }
}