import { Injectable } from '@angular/core';
import { Channel } from './channel.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, take } from 'rxjs';
import { MainService } from './main.service';

export interface User {
  id?: number,
  name: string,
  email: string,
  picture: string,
  password?: string,
  is_online: boolean,
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = environment.baseUrl + 'users/';
  chatMembers: number[] = [];
  users: User[] = [
    {
      id: 1,
      name: "USER1",
      email: "joshua@mail.com",
      picture: 'assets/img/profile_placeholder_blue.svg',
      is_online: false,
    },
    {
      id: 10,
      name: "CurrentUser",
      email: "joshua@mail.com",
      picture: 'assets/img/profile_placeholder_blue.svg',
      is_online: false,
    },
    {
      id: 11,
      name: "Joshua",
      email: "joshua@mail.com",
      picture: 'assets/img/profile_placeholder_red.svg',
      is_online: false,
    },
    {
      id: 12,
      name: "Elijah",
      email: "elijah@mail.com",
      picture: 'assets/img/profile_placeholder_green.svg',
      is_online: false,
    },
    {
      id: 13,
      name: "Max",
      email: "max@mail.com",
      picture: 'assets/img/profile_placeholder.svg',
      is_online: false,
    },
    {
      id: 14,
      name: "Anna",
      email: "anna@mail.com",
      picture: 'assets/img/profile_placeholder_blue.svg',
      is_online: false,
    }
  ]

  constructor(
    private authService: AuthService,
    private mainService: MainService,
    private http: HttpClient
  ) { }

  // getUsers() {
  //   this.users = [];
  //   console.log('chatmembers', this.chatMembers);
  //   this.chatMembers.forEach(member => {
  //     this.fetchUser(member).pipe(take(1)).subscribe(
  //       {
  //         next: (data: User) => {
  //           console.log('getUsers Data', data);

  //           this.users.push(data);
  //         },

  //         complete: () => {
  //           console.log('users:', this.users);
  //         }
  //       }
  //     )
  //   });
  // }

  async getUsers() {
    this.users = [];
    for (const member of this.chatMembers) {
      const user = await firstValueFrom(this.fetchUser(member));
      this.users.push(user)
    }
    console.log('users', this.users);
    this.mainService.deactivateLoader();
  }

  fetchUser(member: number): Observable<User> {
    const url = this.userUrl + member;
    return this.http.get<User>(url);
  }

  collectChatMembers(member: number) {
    if (!this.chatMembers.includes(member)) {
      this.chatMembers.push(member);
    }
  }

  getUser(userId: number) {
    return this.users.find(obj => obj.id === userId) as User;
  }

  getInterlocutor(chatToCheck: Channel) {
    const interlocutorId = chatToCheck!.members.find(obj => obj !== this.authService.currentUser.id);
    const interlocutor = this.getUser(interlocutorId!);
    return interlocutor;
  }
}