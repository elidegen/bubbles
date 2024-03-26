import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel, ChannelService } from '../services/channel.service';
import { AuthService } from '../services/auth.service';
import { Message, MessageService } from '../services/message.service';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { CommonModule } from '@angular/common';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-message-bar',
  standalone: true,
  imports: [FormsModule, EmojiPickerComponent, CommonModule],
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.scss'
})
export class MessageBarComponent {
  @Input() currentChat: Channel | Message | undefined;
  @ViewChild('picker') picker!: ElementRef;
  inputContent: string = '';
  showEmojiPicker: boolean = false;

  constructor(
    private channelService: ChannelService,
    private messageService: MessageService,
    private authService: AuthService,
    public mainService: MainService,
  ) {
    this.setupClickListener();
   }

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

  typeEmoji($event: any) {
    this.inputContent += $event.character;
  }

  private setupClickListener() {
    document.addEventListener('click', () => {
      this.showEmojiPicker = false;
    });
  }

  openEmojiPicker($event: { stopPropagation: () => void; }){
    $event.stopPropagation();
    this.showEmojiPicker = true;
  }
}