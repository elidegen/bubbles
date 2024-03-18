import { Component } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { ChannelPreviewComponent } from '../channel-preview/channel-preview.component';
import { ChannelService } from '../services/channel.service';
import { Message, MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MessageComponent, ChannelPreviewComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentUser: CurrentUser;
  inputContent: string = '';

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
  ) {
    this.currentUser = authService.currentUser;
  }

  sendMsg() {
    let newMessage: Message = {
      author: this.currentUser.id,
      reactions: [],
      in_Thread: this.channelService.currentChannel.isChannel,
      source: this.channelService.currentChannel.id,
      content: this.inputContent,
      created_at: new Date()
    }

    console.log(newMessage);
    this.messageService.messages.push(newMessage);
    this.inputContent = '';
  }
}
