import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Output() scrollToBottomChat = new EventEmitter();
  @Output() scrollToBottomThread = new EventEmitter();
  @Output() scrollToMessage = new EventEmitter();
  @Output() scrollToThread = new EventEmitter();
  @Output() updateHeader = new EventEmitter();
  @Output() renderGroupMember = new EventEmitter();

  messageToScroll: number | undefined;
  threadToScroll: number | undefined;
  chatLoader: boolean = false;

  constructor() { }

  scrollEmitChat() {
    setTimeout(() => {
      if (this.messageToScroll) {
        this.scrollToMessage.emit();
      } else if (this.threadToScroll) {
        this.scrollToThread.emit();
      } else {
        this.scrollToBottomChat.emit();
      }
      this.renderGroupMember.emit();
      this.updateHeader.emit();
    }, 500);
  }

  scrollEmitThread() {
    setTimeout(() => {
      if (this.threadToScroll) {
        this.scrollToThread.emit();
      } else {
        this.scrollToBottomThread.emit();
      }
    }, 500);
  }
}