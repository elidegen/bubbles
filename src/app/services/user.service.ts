import { Injectable } from '@angular/core';
import { Channel } from './channel.service';
import { AuthService } from './auth.service';

export interface User {
  id?: number,
  name: string,
  email: string,
  picture: string,
  password?: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    {
      id: 10,
      name: "CurrentUser",
      email: "joshua@mail.com",
      picture: 'assets/img/profile_placeholder_blue.svg',
    },
    {
      id: 11,
      name: "Joshua",
      email: "joshua@mail.com",
      picture: 'assets/img/profile_placeholder_red.svg',
    },
    {
      id: 12,
      name: "Elijah",
      email: "elijah@mail.com",
      picture: 'assets/img/profile_placeholder_green.svg',
    },
    {
      id: 13,
      name: "Max",
      email: "max@mail.com",
      picture: 'assets/img/profile_placeholder.svg',
    },
    {
      id: 14,
      name: "Anna",
      email: "anna@mail.com",
      picture: 'assets/img/profile_placeholder_blue.svg',
    }
  ]

  constructor(
    private authService: AuthService,
  ) { }

  getUser(userId: number) {
    return this.users.find(obj => obj.id === userId) as User;
  }

  getInterlocutor(chatToCheck: Channel) {
    const interlocutorId = chatToCheck!.members.find(obj => obj !== this.authService.currentUser.id);
    const interlocutor = this.getUser(interlocutorId!);
    return interlocutor;
  }
}