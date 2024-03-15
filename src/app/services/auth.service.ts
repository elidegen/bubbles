import { Injectable } from '@angular/core';

export interface CurrentUser {
  id?: number,
  username: string,
  email: string,
  password?: string,
  profile_img?: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

}
