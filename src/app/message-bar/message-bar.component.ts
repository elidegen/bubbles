import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmojiPickerDialogComponent } from '../emoji-picker-dialog/emoji-picker-dialog.component';
import { CommonModule } from '@angular/common';
import { MainService } from '../services/main.service';
import { FilePickerComponent } from '../file-picker/file-picker.component';
import { every } from 'rxjs';

@Component({
  selector: 'app-message-bar',
  standalone: true,
  imports: [FormsModule, EmojiPickerDialogComponent, CommonModule, FilePickerComponent],
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.scss'
})
export class MessageBarComponent {
  @Input() disabled!: boolean;
  @Output() messageContent = new EventEmitter<string>();
  @ViewChild('picker') picker!: ElementRef;
  @ViewChild('myInput') myInput!: ElementRef;
  inputContent: string = '';
  showEmojiPicker: boolean = false;

  constructor(
    public mainService: MainService,
  ) {
    this.setupClickListener();
  }

  sendMsg() {
    if (this.inputContent.trim()) {
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

  openEmojiPicker() {
    setTimeout(() => {
      this.showEmojiPicker = true;
    }, 1);
  }

  attachImg(file: File) {
    console.log('filepicker messagebar', file);
  }
}