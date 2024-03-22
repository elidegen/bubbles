import { Injectable } from '@angular/core';
import { Channel } from './channel.service';
import { AuthService } from './auth.service';

export interface User {
  id?: number,
  name: string,
  email: string,
  profile_pic?: string,
  password?: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [
    {
      id: 10,
      username: "CurrentUser",
      email: "joshua@mail.com",
    },
    {
      id: 11,
      username: "Joshua",
      email: "joshua@mail.com",
    },
    {
      id: 12,
      username: "Elijah",
      email: "elijah@mail.com",
    },
    {
      id: 13,
      username: "Max",
      email: "max@mail.com",
    },
    {
      id: 14,
      username: "Anna",
      email: "anna@mail.com",
    }
  ]

  constructor(
    private authService: AuthService,
  ) { }

  getUser(userId: number) {
    return this.users.find(obj => obj.id === userId);
  }

  getInterlocutor(chatToCheck: Channel) {
    const interlocutorId = chatToCheck!.members.find(obj => obj !== this.authService.currentUser.id);
    const interlocutor = this.getUser(interlocutorId!);
    return interlocutor;
  }
}