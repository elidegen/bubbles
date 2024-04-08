import { Inject, Injectable, Injector } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, firstValueFrom, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Channel, ChannelService } from './channel.service';
import { AuthService } from './auth.service';
import { MainService } from './main.service';

export interface Reaction {
  user: number,
  emoji: string,
}

export class Message {
  id: number;
  author: number; //ID from User
  reactions: Reaction[];
  source: number; //ID from Channel
  content: string;
  created_at: number;
  attachment?: string[] | null;
  hash: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.author = obj ? obj.author : null;
    this.reactions = obj ? obj.reactions : [];
    this.source = obj ? obj.source : null;
    this.content = obj ? obj.content : '';
    this.created_at = obj ? obj.created_at : null;
    this.hash = obj ? obj.hash : '';
  }
}

export interface MessagesAndThread {
  messages: Message[],
  thread_messages: Message[],
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesFromChatUrl: string = environment.baseUrl + 'messages-and-thread-from-channel/';
  currentThread!: Message;
  threadOpen: boolean = false;
  currentMessages: Message[] = [];
  threads: Message[] = [];
  showNewMessageComp: boolean = true;

  $messagesAndThread: BehaviorSubject<MessagesAndThread> = new BehaviorSubject<MessagesAndThread>({
    messages: [],
    thread_messages: [],
  });

  constructor(
    private http: HttpClient,
    private mainService: MainService,
  ) { }

  async getMessagesAndThread(chatId: number) {
    const data = await firstValueFrom(this.fetchMessagesAndThread(chatId));
    this.$messagesAndThread.next(data);

    this.subscribeMessagesAndThreads();
    this.mainService.deactivateLoader();
  }

  fetchMessagesAndThread(chatId: number): Observable<MessagesAndThread> {
    const url = this.messagesFromChatUrl + chatId;
    return this.http.get<MessagesAndThread>(url);
  }

  subscribeMessagesAndThreads() {
    this.$messagesAndThread.subscribe(data => {
      this.currentMessages = data.messages;
      this.threads = data.thread_messages;
    });
  }

  groupMsgByAuthor(channelId: number, isThread: boolean) {
    let groupedArray = [];
    let currentGroup: Message[] = [];
    const seperatedArray = this.seperateChannelByDay(channelId, isThread);
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

  seperateChannelByDay(channelId: number, isThread: boolean) {
    // const sortedArray = this.sortChannel(channelId);
    const sortedArray = this.filterByChannel(channelId, isThread);
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

  // sortChannel(channelId: number) {
  //   const filteredArray = this.filterByChannel(channelId);
  //   const sortedArray = filteredArray.sort((a, b) => a.created_at - b.created_at);
  //   return sortedArray;
  // }

  filterByChannel(channelId: number, isThread: boolean) {
    if (isThread) {
      return this.threads.filter(obj => obj.source === channelId);
    } else {
      return this.currentMessages;
    }
  }

  getMessage(messageId: number) {
    let index = this.currentMessages.findIndex(obj => obj.id === messageId);
    if (index === -1) {
      index = this.threads.findIndex(obj => obj.id === messageId);
      return this.threads[index];
    } else {
      return this.currentMessages[index];
    }
  }

  openThread(threadId: number) {
    this.currentThread = this.currentMessages.find(obj => obj.id === threadId) as Message;
    this.threadOpen = true;
  }

  async postMessage(endpoint: string, message: Message) {
    const url = environment.baseUrl + endpoint;
    const response = await firstValueFrom(this.http.post(url, message)) as Message;

    if (endpoint === 'messages/') {
      this.currentMessages.push(response);
    } else {
      this.threads.push(response);
    }
  }

  async putMessageOld(message: Message) {
    const endpoint = this.currentMessages.some(obj => obj === message) ? 'messages/' : 'threads/';
    const url = environment.baseUrl + endpoint + message.id + '/';
    await firstValueFrom(this.http.put(url, message));
  }

  async putMessage(message: Message) {
    const endpoint = this.currentMessages.some(obj => obj === message) ? 'messages/' : 'threads/';
    const url = environment.baseUrl + endpoint + message.id + '/';
    const formData = new FormData();

    // // Schleife durch message-Objekt und füge Werte zum FormData hinzu
    // Object.keys(message).forEach(key => {
    //   if (key in message) { // Check if key exists in Message type
    //     const value = message[key];
    //     if (value !== undefined && value !== null) {
    //       formData.append(key, value);
    //     }
    //   }
    // });

    await firstValueFrom(this.http.put(url, formData));
  }

  async updateMessage(message: Message) {
    const url = environment.baseUrl + 'messages/' + message.id + '/';
    const formData = new FormData();
    formData.append('content', message.content);
    const response = await firstValueFrom(this.http.patch(url, formData));
    console.log('edited Msg:', response);
  }

  async deleteMessage(message: Message) {
    const url = environment.baseUrl + 'messages/' + message.id + '/';
    const response = await firstValueFrom(this.http.delete(url));
    console.log('edited Msg:', response);
  }
}