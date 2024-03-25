import { Injectable } from '@angular/core';

export interface CurrentUser {
  id: number,
  name: string,
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
    name: "CurrentUser",
    email: "guestuser@mailinator.com",
    picture: '',
  }
}