import { Injectable } from '@angular/core';


export interface Message {
  id: number,
  author: number, //ID from current user
  isThread: boolean,
  source: number, //ID from channel or message when "isThread" === true
  content: string, 
  created_at: Date,
  thread_messages: number[]; // Array with ID's from threadmessages
}


@Injectable({
  providedIn: 'root'
})


export class ChatService {

  messages: Message[] = [
    {
      id: 1,
      author: 123,
      isThread: false,
      source: 456,
      content: "Hello, how are you?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 2,
      author: 456,
      isThread: false,
      source: 789,
      content: "I'm doing great, thanks!",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 3,
      author: 789,
      isThread: true,
      source: 2,
      content: "That's awesome to hear!",
      created_at: new Date(),
      thread_messages: [4]
    },
    {
      id: 4,
      author: 123,
      isThread: true,
      source: 3,
      content: "Yeah, it really is!",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 5,
      author: 789,
      isThread: false,
      source: 101,
      content: "Hey, what's up?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 6,
      author: 101,
      isThread: true,
      source: 5,
      content: "Not much, just chilling.",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 7,
      author: 123,
      isThread: false,
      source: 456,
      content: "Anyone here?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 8,
      author: 456,
      isThread: false,
      source: 789,
      content: "Yes, I'm here!",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 9,
      author: 789,
      isThread: true,
      source: 8,
      content: "What's going on?",
      created_at: new Date(),
      thread_messages: [10]
    },
    {
      id: 10,
      author: 123,
      isThread: true,
      source: 9,
      content: "Just hanging out.",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 11,
      author: 789,
      isThread: false,
      source: 101,
      content: "Good morning!",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 12,
      author: 101,
      isThread: false,
      source: 123,
      content: "Morning! How are you?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 13,
      author: 123,
      isThread: true,
      source: 12,
      content: "I'm good, thanks!",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 14,
      author: 101,
      isThread: false,
      source: 123,
      content: "Hey, are you free tonight?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 15,
      author: 123,
      isThread: true,
      source: 14,
      content: "Yes, I am. What's up?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 16,
      author: 101,
      isThread: false,
      source: 123,
      content: "Let's grab dinner together!",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 17,
      author: 123,
      isThread: true,
      source: 16,
      content: "Sounds great! Where should we meet?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 18,
      author: 101,
      isThread: false,
      source: 123,
      content: "How about that Italian place downtown?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 19,
      author: 123,
      isThread: true,
      source: 18,
      content: "Perfect! What time?",
      created_at: new Date(),
      thread_messages: []
    },
    {
      id: 20,
      author: 101,
      isThread: false,
      source: 123,
      content: "Let's aim for 7 PM.",
      created_at: new Date(),
      thread_messages: []
    }
  ];
  


  constructor() { }

  
  



}
