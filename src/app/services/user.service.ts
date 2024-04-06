import { Injectable } from '@angular/core';
import { Channel } from './channel.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { MainService } from './main.service';

export interface User {
  id?: number,
  username: string;
  email: string,
  picture: string | null,
  password?: string,
  is_online: boolean,
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = environment.baseUrl + 'users/';
  chatMembers: number[] = [];
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private mainService: MainService,
    private http: HttpClient
  ) { }

  async getUsers() {
    this.users = await firstValueFrom(this.fetchUsers());
    console.log('users', this.users);
    this.mainService.deactivateLoader();
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getUser(userId: number) {
    return this.users.find(obj => obj.id === userId) as User;
  }

  getInterlocutor(chatToCheck: Channel) {
    const interlocutorId = chatToCheck!.members.find(obj => obj !== this.authService.currentUser.id);
    const interlocutor = this.getUser(interlocutorId!);
    return interlocutor;
  }

  isOnline(channel: Channel) {
    const interlocutor = this.getInterlocutor(channel);
    return interlocutor.is_online;
  }
}