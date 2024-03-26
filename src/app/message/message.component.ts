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
    this.setupClickListener();
  }

  thread() {
    const threadMsg = this.messageService.messages.find(obj => obj.source === this.message.id)
    return threadMsg != undefined;
  }

  private setupClickListener() {
    document.addEventListener('click', () => {
      this.showEmojiPicker = false;
    });
  }

  openEmojiPicker() {
    setTimeout(() => {
      this.showEmojiPicker = true;
    }, 1);
  }

  addReaction($event: any) {
    const index = this.messageService.messages.findIndex(obj => obj === this.message);
    const reaction = {
      user: this.currentUser.id,
      reaction: $event.character,
    };
    if (this.message.reactions.some(obj => obj.reaction === reaction.reaction && obj.user === reaction.user)) {
      const reactionIndex = this.message.reactions.findIndex(obj => obj.reaction === reaction.reaction && obj.user === reaction.user)
      this.message.reactions.splice(reactionIndex, 1);
    } else {
      this.message.reactions.push(reaction);
    }
    this.messageService.messages[index] = this.message;
  }

  sourceIsChannel(){
    return !this.messageService.getMessage(this.message.source)
  }
}