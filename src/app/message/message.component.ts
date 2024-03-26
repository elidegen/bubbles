import { Component, Input } from '@angular/core';
import { Message, MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, EmojiPickerComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() myMessage!: Boolean;
  currentUser: CurrentUser;
  showEmojiPicker: boolean = false;

  constructor(
    public authService: AuthService,
    public messageService: MessageService,
  ) {
    this.currentUser = authService.currentUser;
  }

  thread() {
    const threadMsg = this.messageService.messages.find(obj => obj.source === this.message.id)
    return threadMsg != undefined;
  }

  addReaction($event: any){
    
    // this.message.reactions.push({
    //   user: this.currentUser.id,
    //   emoji: $event.character,
    // })
  }
}