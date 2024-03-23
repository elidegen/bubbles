import { Injectable } from '@angular/core';

export interface CurrentUser {
  id: number,
  name: string,
  email: string,
  profile_img?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser: CurrentUser = {
    id: 10,
    name: "GuestUser",
    email: "guestuser@mailinator.com",
  }
}