import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChannelService } from '../services/channel.service';
import { AuthService } from '../services/auth.service';
import { Message, MessageService } from '../services/message.service';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';

@Component({
  selector: 'app-message-bar',
  standalone: true,
  imports: [FormsModule, EmojiPickerComponent],
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.scss'
})
export class MessageBarComponent {
  inputContent: string = '';

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService,
    public authService: AuthService,
  ) { }

  sendMsg() {
    if (this.inputContent.trim()) {
      let newMessage: Message = {
        author: this.authService.currentUser.id,
        reactions: [],
        in_Thread: this.channelService.currentChannel.isChannel,
        source: this.channelService.currentChannel.id,
        content: this.inputContent,
        created_at: new Date()
      }
      this.messageService.messages.push(newMessage); //send newMessage to backend
      
      this.inputContent = '';
    }
  }
}