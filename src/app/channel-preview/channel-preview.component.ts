import { Component, Input, OnInit } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { CommonModule } from '@angular/common';
import { Message, Reaction, MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-channel-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-preview.component.html',
  styleUrl: './channel-preview.component.scss'
})
export class ChannelPreviewComponent implements OnInit {
  @Input() channel!: Channel;
  latestMsg!: Message;
  baseUrl:string;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public userService: UserService,
    public authService: AuthService,
  ) { 
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    this.latestMsg = this.getLatestMsg();
  }

  

  getLatestMsg() {
    if (this.messageService.filterByChannel(this.channel.id).length > 0) {
      return this.messageService.sortChannel(this.channel.id)[this.messageService.filterByChannel(this.channel.id).length - 1];
    } else {
      return {
        id: 0,
        author: 0,
        reactions: [],
        source: 0,
        content: 'Empty chat', // Placeholder in case there is no message in Channel
        created_at: 0,
      } as Message
    }
  }

  isToday(date: Date) {
    let dummy = date;
    return dummy.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
  }

  getPreview() {
    if (this.getLatestMsg().author !== 0) {
      return this.getAuthor() + ': ' + this.getLatestMsg().content
    } else {
      return 'Empty conversation'
    }
  }

  getAuthor() {
    const author = this.userService.getUser(this.getLatestMsg().author);    
    return author.username === this.authService.currentUser.username ? 'You' : author.username
  }
}