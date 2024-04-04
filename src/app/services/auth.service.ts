import { Injectable } from '@angular/core';

export interface CurrentUser {
  id: number,
  username: string,
  email: string,
  picture: null | string
  is_online: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser: CurrentUser = {
    id: 1,
    username: "CurrentUser",
    email: "guestuser@mailinator.com",
    picture: 'assets/img/profile_placeholder.svg',
    is_online: true,
  }

  getImg() {    
    if (this.currentUser.picture) {
      return this.currentUser.picture;
    }
    return 'assets/img/profile_placeholder.svg';
  }
}