import { Injectable } from '@angular/core';

export interface CurrentUser {
  id: number,
  username: string,
  email: string,
  picture: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser: CurrentUser = {
    id: 10,
    username: "CurrentUser",
    email: "guestuser@mailinator.com",
    picture: '',
  }
}