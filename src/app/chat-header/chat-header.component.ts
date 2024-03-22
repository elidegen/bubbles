import { Component, Input, OnInit } from '@angular/core';
import { Channel } from '../services/channel.service';
import { Message } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent implements OnInit {
  @Input() currentChat!: Channel | Message;
  pictureUrl!: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.currentChat);    
    this.prepareVariables();
  }

  prepareVariables(){
    if('is_channel' in this.currentChat && this.currentChat.is_channel === true){
      this.pictureUrl = this.currentChat.picture;
    }
  }

  renderGroupMemberInfo() {

  }

  isChannel() {
    return 'is_channel' in this.currentChat && this.currentChat.is_channel === true;
  }

  getName() {
    if ('is_channel' in this.currentChat && this.currentChat.is_channel === true) {
      return this.currentChat.name;
    } else if ('is_channel' in this.currentChat && this.currentChat.is_channel === false) {
      return this.userService.getInterlocutor(this.currentChat)?.username
    } else if ('in_thread' in this.currentChat) {
      return 'Thread'
    } else {
      return 'Select a Thread'
    }
  }

  getPicture() {
    // console.log(this.currentChat);

    if ('is_channel' in this.currentChat && this.currentChat.picture !== '') {
      // return this.currentChat.picture;
      console.log('supü mate');

      return 'assets/img/thumb_up_icon.svg'
    } else {
      return 'assets/img/profile_placeholder.svg'
    }
  }

  noThread() {
    return 'is_channel' in this.currentChat;
  }
}