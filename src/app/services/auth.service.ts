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
    id: 4,
    username: "CurrentUser",
    email: "guestuser@mailinator.com",
    picture: null,
    is_online: true

  }

  getImg() {
    if (this.currentUser.picture != null) {
      return this.currentUser.picture;
    }
    return 'assets/img/profile_placeholder.svg';
  }
}