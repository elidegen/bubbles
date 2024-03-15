import { Injectable } from '@angular/core';

export interface User {
  id?:number, 
  name: string,
  email: string, 
  channels: number[], //Array of ID's with channels, direct chats
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  
}
