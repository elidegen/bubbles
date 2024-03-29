import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() disabled!: boolean;
  @Output() messageContent = new EventEmitter<string>();
  @ViewChild('picker') picker!: ElementRef;
  inputContent: string = '';
  showEmojiPicker: boolean = false;

  constructor(
    public mainService: MainService,
  ) {
    this.setupClickListener();
   }

  sendMsg() {
    if(this.inputContent.trim()){
      this.messageContent.emit(this.inputContent);
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

  openEmojiPicker(){
    setTimeout(() => {
      this.showEmojiPicker = true;      
    }, 1);
  }
}