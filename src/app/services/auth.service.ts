import { Injectable } from '@angular/core';
import { User } from './user.service';

export interface CurrentUser {
  id: number,
  username: string,
  email: string,
  profile_img?: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser: CurrentUser = {
    id: 1,
    username: "GuestUser",
    email: "guestuser@mailinator.com",
  }


}
