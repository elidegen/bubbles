import { Component, Input, OnInit } from '@angular/core';
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
export class MessageComponent implements OnInit {
  @Input() message!: Message;
  @Input() myMessage!: Boolean;
  currentUser: CurrentUser;
  showEmojiPicker: boolean = false;
  allReactions: any[] = [];

  constructor(
    public authService: AuthService,
    public messageService: MessageService,
  ) {
    this.currentUser = authService.currentUser;
    this.setupClickListener();
  }

  ngOnInit(): void {
    this.prepareReactions();
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
      emoji: $event.character,
    };
    if (this.message.reactions.some(obj => obj.emoji === reaction.emoji && obj.user === reaction.user)) {
      const reactionIndex = this.message.reactions.findIndex(obj => obj.emoji === reaction.emoji && obj.user === reaction.user)
      this.message.reactions.splice(reactionIndex, 1);
    } else {
      this.message.reactions.push(reaction);
    }
    this.messageService.messages[index] = this.message;
    this.prepareReactions();
  }

  sourceIsChannel() {
    return !this.messageService.getMessage(this.message.source)
  }

  prepareReactions() {
    this.allReactions = [];
    this.message.reactions.forEach((reaction) => {
      if (this.allReactions.some(obj => obj.reaction === reaction.emoji)) {
        const index = this.allReactions.findIndex(obj => obj.reaction === reaction.emoji);
        this.allReactions[index].count++;
      } else {
        this.allReactions.push({
          reaction: reaction.emoji,
          count: 1,
        });
      }
    })
  }

  async getReactions() {
    await this.prepareReactions();
    return this.allReactions;
  }
}