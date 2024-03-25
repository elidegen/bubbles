import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss'
})
export class EmojiPickerComponent {

  constructor() {
    this.getEmojis();
  }

  @Output() newEmoji = new EventEmitter<string>();

  public typedEmoji: string = '';

  searchValue: string = '';
  myEmojis: any;
  emojiSelectorIcon = document.getElementById('emojiSelectorIcon');
  emojiSelector = document.getElementById('emojiSelector');
  emojiList: Array<any> = [];
  allEmojis: Array<any> = [];
  filteredEmojiList = [];

  url = 'https://emoji-api.com/emojis?access_key=a3f490babea502cd547755934800ad65f1dd5f65';

  /**
  * Fetches emojis from the API.
  */
  getEmojis() {
    fetch(this.url)
      .then(res => res.json())
      .then(data => this.loadEmoji(data));
  }

  /**
  * Loads emojis from the API response into the emojiList and allEmojis arrays.
  * @param {[]} data - The data containing emojis from the API response.
  */
  loadEmoji(data: []) {
    data.forEach(emoji => {
      if(this.allEmojis.length < 70){
        this.emojiList.push(emoji);
        this.allEmojis.push(emoji);
      }
    });
  }

  /**
 * Emits the selected emoji to the parent component using the newEmoji EventEmitter.
 * @param {string} emoji - The selected emoji.
 */
  public showInInput(emoji: string): void {
    this.newEmoji.emit(emoji);
  }

  /**
  * Filters the list of emojis based on the searchValue.
  */
  search() {
    const filteredList = this.allEmojis.filter(emoji => {
      return emoji.unicodeName.toLowerCase().includes(this.searchValue.toLowerCase());
    });
    this.emojiList = filteredList;
  }
}