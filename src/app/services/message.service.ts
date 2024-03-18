import { Injectable } from '@angular/core';
import { filter } from 'rxjs';

export interface Message {
  id: number,
  author: number, //ID from User
  isThread: boolean;
  source: number, //ID from Channel
  content: string,
  created_at: Date,
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messages: Message[] = [
    {
      id: 30,
      author: 10,
      isThread: false,
      source: 20,
      content: "Hello, how are you?",
      created_at: new Date(),
    },
    {
      id: 31,
      author: 11,
      isThread: false,
      source: 20,
      content: "I'm doing great, thanks!",
      created_at: new Date(),
    },
    {
      id: 32,
      author: 12,
      isThread: false,
      source: 20,
      content: "That's awesome to hear!",
      created_at: new Date(),
    },
    {
      id: 33,
      author: 13,
      isThread: false,
      source: 20,
      content: "Yeah, it really is!",
      created_at: new Date(),
    },
    {
      id: 34,
      author: 14,
      isThread: false,
      source: 20,
      content: "Hey, what's up?",
      created_at: new Date(),
    },
    {
      id: 35,
      author: 10,
      isThread: false,
      source: 21,
      content: "Not much, just chilling.",
      created_at: new Date(),
    },
    {
      id: 36,
      author: 11,
      isThread: false,
      source: 21,
      content: "Anyone here?",
      created_at: new Date(),
    },
    {
      id: 37,
      author: 12,
      isThread: false,
      source: 21,
      content: "Yes, I'm here!",
      created_at: new Date(),
    },
    {
      id: 38,
      author: 13,
      isThread: false,
      source: 21,
      content: "What's going on?",
      created_at: new Date(),
    },
    {
      id: 39,
      author: 14,
      isThread: false,
      source: 21,
      content: "Just hanging out.",
      created_at: new Date(),
    },
    {
      id: 40,
      author: 10,
      isThread: false,
      source: 22,
      content: "Good morning!",
      created_at: new Date(),
    },
    {
      id: 41,
      author: 11,
      isThread: false,
      source: 22,
      content: "Morning! How are you?",
      created_at: new Date(),
    },
    {
      id: 42,
      author: 12,
      isThread: false,
      source: 22,
      content: "I'm good, thanks!",
      created_at: new Date(),
    },
    {
      id: 43,
      author: 13,
      isThread: false,
      source: 22,
      content: "Hey, are you free tonight?",
      created_at: new Date(),
    },
    {
      id: 44,
      author: 14,
      isThread: false,
      source: 22,
      content: "Yes, I am. What's up?",
      created_at: new Date(),
    },
    {
      id: 45,
      author: 10,
      isThread: false,
      source: 22,
      content: "Let's grab dinner together!",
      created_at: new Date(),
    }
  ];

  constructor() { }

  filterByChannel(channelId: number) {
    const filteredArray = this.messages.filter(obj => obj.source == channelId);
    return filteredArray;
  }
}