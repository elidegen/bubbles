import { Injectable } from '@angular/core';

export class Message {
  id: number;
  author: number; //ID from User
  reactions: [];
  source: number; //ID from Channel
  content: string;
  created_at: number;

  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.author = obj ? obj.author : null;
    this.reactions = obj ? obj.reactions : [];
    this.source = obj ? obj.source : null;
    this.content = obj ? obj.content : '';
    this.created_at = obj ? obj.created_at : null;
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
      source: 20,
      content: "Hello, how are you?",
      created_at: 1641415700000,
    },
    {
      id: 31,
      author: 11,
      reactions: [],
      source: 20,
      content: "I'm doing great, thanks!",
      created_at: 1641666855555,
    },
    {
      id: 32,
      author: 12,
      reactions: [],
      source: 20,
      content: "That's awesome to hear!",
      created_at: 1641510666666,
    },
    {
      id: 33,
      author: 13,
      reactions: [],
      source: 20,
      content: "Yeah, it really is!",
      created_at: 1700000000000,
    },
    {
      id: 34,
      author: 14,
      reactions: [],
      source: 20,
      content: "Guten Tag",
      created_at: 1641333333332,
    },
    {
      id: 35,
      author: 13,
      reactions: [],
      source: 20,
      content: "Moin",
      created_at: 1641333333334,
    },
    {
      id: 36,
      author: 14,
      reactions: [],
      source: 20,
      content: "Grüeziwohl",
      created_at: 1641423777775,
    },
    {
      id: 37,
      author: 13,
      reactions: [],
      source: 20,
      content: "Servus",
      created_at: 1641423777774,
    },
    {
      id: 38,
      author: 14,
      reactions: [],
      source: 20,
      content: "Hallöchen",
      created_at: 1641333333331,
    },
    {
      id: 39,
      author: 10,
      reactions: [],
      source: 21,
      content: "Not much, just chilling.",
      created_at: 1641564444443,
    },
    {
      id: 40,
      author: 11,
      reactions: [],
      source: 21,
      content: "Anyone here?",
      created_at: 1641488888540,
    },
    {
      id: 41,
      author: 12,
      reactions: [],
      source: 21,
      content: "Yes, I'm here!",
      created_at: 1641587777770,
    },
    {
      id: 42,
      author: 13,
      reactions: [],
      source: 21,
      content: "What's going on?",
      created_at: 1641604444440,
    },
    {
      id: 43,
      author: 14,
      reactions: [],
      source: 21,
      content: "Just hanging out.",
      created_at: 1641458555550,
    },
    {
      id: 44,
      author: 10,
      reactions: [],
      source: 22,
      content: "Good morning!",
      created_at: 1641611116540,
    },
    {
      id: 45,
      author: 11,
      reactions: [],
      source: 22,
      content: "Morning! How are you?",
      created_at: 1641444461540,
    },
    {
      id: 46,
      author: 12,
      reactions: [],
      source: 22,
      content: "I'm good, thanks!",
      created_at: 1641444444440,
    },
    {
      id: 47,
      author: 13,
      reactions: [],
      source: 22,
      content: "Hey, are you free tonight?",
      created_at: 1641595747470,
    },
    {
      id: 48,
      author: 14,
      reactions: [],
      source: 22,
      content: "Yes, I am. What's up?",
      created_at: 1641658826540,
    },
    {
      id: 49,
      author: 10,
      reactions: [],
      source: 22,
      content: "Let's grab dinner together!",
      created_at: 1711154458965,
    },
    {
      id: 50,
      author: 10,
      reactions: [],
      source: 23,
      content: "Hey magst du pizza?",
      created_at: 1711154815648,
    },
    {
      id: 51,
      author: 11,
      reactions: [],
      source: 23,
      content: "Lieber döner",
      created_at: 1641495456789,
    },
    {
      id: 52,
      author: 10,
      reactions: [],
      source: 23,
      content: "das coolste wäre ein burger",
      created_at: 1711154834589,
    },
    {
      id: 53,
      author: 10,
      reactions: [],
      source: 23,
      content: "ich würde gerne mexikanisch essen!",
      created_at: 1711154458965,
    },
    {
      id: 54,
      author: 10,
      reactions: [],
      source: 23,
      content: "Hallo ich bin auf diät nehmt ein bisschen rücksicht!",
      created_at: 1641495695684,
    }
  ];

  currentThread!: Message;
  threadOpen: boolean = false;

  constructor() {
    let localStorageAsString = localStorage.getItem('currentThread');
    this.currentThread = JSON.parse(localStorageAsString as string);
  }

  groupMsgByAuthor(channelId: number) {
    let groupedArray = [];
    let currentGroup: any[] = [];
    const seperatedArray = this.seperateChannelByDay(channelId);
    for (let i = 0; i < seperatedArray.length; i++) {
      if ('author' in seperatedArray[i]) {
        const message = seperatedArray[i] as Message;
        if (currentGroup.length != 0 && currentGroup[0].author !== message.author) {
          groupedArray.push(currentGroup);
          currentGroup = [];
        }
        currentGroup.push(message);
      } else {
        if (currentGroup.length > 0)
          groupedArray.push(currentGroup);
        currentGroup = [];
        groupedArray.push(seperatedArray[i]);
      }
    }
    groupedArray.push(currentGroup);
    return groupedArray;
  }

  seperateChannelByDay(channelId: number) {
    const sortedArray = this.sortChannel(channelId);
    let seperatedArray = [];
    let currentDay;
    for (let i = 0; i < sortedArray.length; i++) {
      const compareDate = new Date(sortedArray[i].created_at)
      if (!currentDay || !this.sameDay(currentDay, compareDate)) {
        currentDay = compareDate;
        seperatedArray.push(currentDay);
      }
      seperatedArray.push(sortedArray[i])
    }
    return seperatedArray;
  }

  sameDay(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  sortChannel(channelId: number) {
    const filteredArray = this.filterByChannel(channelId);
    const sortedArray = filteredArray.sort((a, b) => a.created_at - b.created_at);
    return sortedArray;
  }

  filterByChannel(channelId: number) {
    return this.messages.filter(obj => obj.source == channelId);
  }

  getMessage(messageId: number) {
    return this.messages.find(obj => obj.id === messageId);
  }

  openThread(id: number) {
    this.currentThread = this.messages.find(obj => obj.id === id) as Message;
    localStorage.setItem('currentThread', JSON.stringify(this.currentThread));
    this.threadOpen = true;
  }
}