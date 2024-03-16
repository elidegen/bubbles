import { Injectable } from '@angular/core';

export interface User {
  id?: number,
  name: string,
  email: string,
  profile_pic?: string,
  password?: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [
    {
      id: 11,
      username: "Joshua",
      email: "joshua@mail.com",
    },
    {
      id: 12,
      username: "Elijah",
      email: "elijah@mail.com",
    },
    {
      id: 13,
      username: "Max",
      email: "max@mail.com",
    },
    {
      id: 14,
      username: "Anna",
      email: "anna@mail.com",
    }
  ]

  constructor() { }

}