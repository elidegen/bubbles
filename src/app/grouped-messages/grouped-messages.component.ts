import { Component, Input } from '@angular/core';
import { Message } from '../services/message.service';
import { MessageComponent } from '../message/message.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-grouped-messages',
  standalone: true,
  imports: [MessageComponent, CommonModule],
  templateUrl: './grouped-messages.component.html',
  styleUrl: './grouped-messages.component.scss'
})
export class GroupedMessagesComponent {
  @Input() groupedMessages!: Message[];

  constructor(
    private authService: AuthService,
  ){}

  myMessage(message: Message) {    
    return message.author === this.authService.currentUser.id;
  }
}