import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message!: Message;
  currentUser: CurrentUser;

  constructor(
    public authService: AuthService
  ) {
    this.currentUser = authService.currentUser;
  }

  myMessage() {
    return this.message!.author === this.currentUser.id;
  }

}
