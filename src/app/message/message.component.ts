import { Component, Input, OnInit } from '@angular/core';
import { Message, MessageService } from '../services/message.service';
import { AuthService, CurrentUser } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { EmojiPickerDialogComponent } from '../emoji-picker-dialog/emoji-picker-dialog.component';
import { UserService } from '../services/user.service';
import { ReactionsComponent } from '../reactions/reactions.component';
import { Subject } from 'rxjs';
import { MessageBarComponent, MessageContent } from '../message-bar/message-bar.component';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, EmojiPickerDialogComponent, ReactionsComponent, MessageBarComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  @Input() message!: Message;
  @Input() myMessage!: boolean;
  currentUser: CurrentUser;
  showEmojiPicker: boolean = false;
  allReactions: any[] = [];
  reactionsPreview: any[] = [];
  expandReaction: boolean = true;
  editState: boolean = false;

  addedReaction: Subject<void> = new Subject<void>();

  constructor(
    public authService: AuthService,
    public messageService: MessageService,
    public userService: UserService,
    public channelService: ChannelService,
  ) {
    this.currentUser = authService.currentUser;
    this.setupClickListener();
  }
  
  ngOnInit(): void {
    console.log('msg', this.message);
  }

  getImage() {
    if (typeof this.message.attachment === 'string')
      return this.channelService.getImg(this.message.attachment);
    else {
      return 'assets/img/profile_placeholder.svg'
    }
  }

  thread() {
    const threadMsg = this.messageService.threads.find(obj => obj.source === this.message.id)
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

  addReaction(character: string) {
    const reaction = {
      user: this.currentUser.id,
      emoji: character,
    };
    if (this.message.reactions.some(obj => obj.emoji === reaction.emoji && obj.user === reaction.user)) {
      const reactionIndex = this.message.reactions.findIndex(obj => obj.emoji === reaction.emoji && obj.user === reaction.user)
      this.message.reactions.splice(reactionIndex, 1);
    } else {
      this.message.reactions.push(reaction);
    }
    // this.messageService.updateMessage(this.message);
    this.messageService.putMessage(this.message);
    this.addedReaction.next();
  }

  getCharater($event: any) {
    return $event.character
  }

  sourceIsChannel() {
    return this.messageService.currentMessages.some(obj => obj.hash === this.message.hash);
  }

  editMessage(messageContent: MessageContent) {
    this.message.content = messageContent.content;
    this.messageService.updateMessage(this.message);
    this.editState = false;
  }
}