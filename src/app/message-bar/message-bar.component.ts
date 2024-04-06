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
  @Output() messagePicture = new EventEmitter<File>();
  @ViewChild('picker') picker!: ElementRef;
  @ViewChild('myInput') myInput!: ElementRef;
  inputContent: string = '';
  seletedFile: File | undefined;
  showEmojiPicker: boolean = false;

  constructor(
    public mainService: MainService,
  ) {
    this.setupClickListener();
  }

  sendMsg() {
    if (this.inputContent.trim() && this.seletedFile) {
      this.messagePicture.emit(this.seletedFile);
      this.messageContent.emit(this.inputContent);
      this.inputContent = '';
      this.seletedFile = undefined;
    } else if (this.inputContent.trim()) {
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

  handleImg(event: any) {
    const file: File = event.target.files[0];
    if (file && this.checkForFormat(file)) {
      this.uploadImg(file); // add img
    } else {
      alert('Only JPG, JPEG, PNG, PDF and max 5mb accepted!');
    }
  }

  /**
   * Checks if the selected file is in a valid image format (JPEG or PNG).
   * @param {File} file - The file to be checked.
   * @returns {boolean} - Returns true if the file format is valid (JPEG or PNG), otherwise false.
   */
  checkForFormat(file: File): boolean {
    return (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') && file.size < 2000000;// 2mb upload maximum
  }

  uploadImg(file: File) {
    console.log('upload', file);
  }
}