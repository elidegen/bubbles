import { Component, Input, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel, ChannelService } from '../services/channel.service';
import { AuthService } from '../services/auth.service';
import { Message, MessageService } from '../services/message.service';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-bar',
  standalone: true,
  imports: [FormsModule, EmojiPickerComponent, CommonModule],
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.scss'
})
export class MessageBarComponent {
  @Input() currentChat: Channel | Message | undefined;
  inputContent: string = '';

  constructor(
    private channelService: ChannelService,
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  sendMsg() {
    if (this.inputContent.trim()) {
      let newMessage: Message = {
        id: 0,
        author: this.authService.currentUser.id,
        reactions: [],
        source: this.currentChat!.id,
        content: this.inputContent,
        created_at: new Date().getTime(),
      }
      this.messageService.messages.push(newMessage); //send newMessage to backend
      if ('is_channel' in this.currentChat!)
        this.channelService.setUnread(this.currentChat!.id);
      this.inputContent = '';
    }
  }

  typeEmoji($event: any){
    this.inputContent += $event.character;
  }
}