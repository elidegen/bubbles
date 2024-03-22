import { Injectable } from '@angular/core';

export class Message {
  id: number;
  author: number; //ID from User
  reactions: [];
  in_thread: boolean;
  source: number; //ID from Channel
  content: string;
  created_at: Date;

  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.author = obj ? obj.author : null;
    this.reactions = obj ? obj.reactions : [];
    this.in_thread = obj ? obj.in_thread : false;
    this.source = obj ? obj.source : null;
    this.content = obj ? obj.content : '';
    this.created_at = obj ? obj.created_at : new Date();
  }
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messages: Message[] = [
    {
      id: 30,
      author: 10,
      reactions: [],
      in_thread: false,
      source: 20,
      content: "Hello, how are you?",
      created_at: new Date(),
    },
    {
      id: 31,
      author: 11,
      reactions: [],
      in_thread: false,
      source: 20,
      content: "I'm doing great, thanks!",
      created_at: new Date(),
    },
    {
      id: 32,
      author: 12,
      reactions: [],
      in_thread: false,
      source: 20,
      content: "That's awesome to hear!",
      created_at: new Date(),
    },
    {
      id: 33,
      author: 13,
      reactions: [],
      in_thread: false,
      source: 20,
      content: "Yeah, it really is!",
      created_at: new Date(),
    },
    {
      id: 34,
      author: 14,
      reactions: [],
      in_thread: false,
      source: 20,
      content: "Hey, what's up?",
      created_at: new Date(),
    },
    {
      id: 35,
      author: 10,
      reactions: [],
      in_thread: false,
      source: 21,
      content: "Not much, just chilling.",
      created_at: new Date(),
    },
    {
      id: 36,
      author: 11,
      reactions: [],
      in_thread: false,
      source: 21,
      content: "Anyone here?",
      created_at: new Date(),
    },
    {
      id: 37,
      author: 12,
      reactions: [],
      in_thread: false,
      source: 21,
      content: "Yes, I'm here!",
      created_at: new Date(),
    },
    {
      id: 38,
      author: 13,
      reactions: [],
      in_thread: false,
      source: 21,
      content: "What's going on?",
      created_at: new Date(),
    },
    {
      id: 39,
      author: 14,
      reactions: [],
      in_thread: false,
      source: 21,
      content: "Just hanging out.",
      created_at: new Date(),
    },
    {
      id: 40,
      author: 10,
      reactions: [],
      in_thread: false,
      source: 22,
      content: "Good morning!",
      created_at: new Date(),
    },
    {
      id: 41,
      author: 11,
      reactions: [],
      in_thread: false,
      source: 22,
      content: "Morning! How are you?",
      created_at: new Date(),
    },
    {
      id: 42,
      author: 12,
      reactions: [],
      in_thread: false,
      source: 22,
      content: "I'm good, thanks!",
      created_at: new Date(),
    },
    {
      id: 43,
      author: 13,
      reactions: [],
      in_thread: false,
      source: 22,
      content: "Hey, are you free tonight?",
      created_at: new Date(),
    },
    {
      id: 44,
      author: 14,
      reactions: [],
      in_thread: false,
      source: 22,
      content: "Yes, I am. What's up?",
      created_at: new Date(),
    },
    {
      id: 45,
      author: 10,
      reactions: [],
      in_thread: false,
      source: 22,
      content: "Let's grab dinner together!",
      created_at: new Date(),
    }
  ];
  currentThread!: Message;

  constructor() {
    let localStorageAsString = localStorage.getItem('currentThread');
    this.currentThread = JSON.parse(localStorageAsString as string);
  }

  filterByChannel(channelId: number) {
    const filteredArray = this.messages.filter(obj => obj.source == channelId);
    return filteredArray;
  }

  getMessage(messageId: number){
    return this.messages.find(obj => obj.id === messageId);
  }

  openThread(id: number) {
    console.log(id);

    this.currentThread = this.messages.find(obj => obj.id === id) as Message;
    localStorage.setItem('currentThread', JSON.stringify(this.currentThread));
  }
}