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

  emojiList: Array<any> = [];
  allEmojis: Array<any> = [];
  categoryList: Array<any> = [];
  filteredEmojiList = [];
  searchValue: string = '';
  currentCategory: string = 'smileys-emotion';
  categoryIcons = [
    'assets/img/smile_icon.svg',
    'assets/img/hand_icon.svg',
    '',
    'assets/img/raven_icon.svg',
    'assets/img/burger_icon.svg',
    'assets/img/car_icon.svg',
    'assets/img/football_icon.svg',
    'assets/img/lightbulb_icon.svg',
    'assets/img/heart_icon.svg',
    'assets/img/flag_icon.svg',
  ];

  url = 'https://emoji-api.com/emojis?access_key=a3f490babea502cd547755934800ad65f1dd5f65';

  /**
  * Fetches emojis from the API.
  */
  getEmojis() {
    fetch(this.url)
      .then(res => res.json())
      .then(data => this.loadEmoji(data));

    fetch('https://emoji-api.com/categories?access_key=a3f490babea502cd547755934800ad65f1dd5f65')
      .then(res => res.json())
      .then(data => this.loadCategorys(data));
  }

  /**
  * Loads emojis from the API response into the emojiList and allEmojis arrays.
  * @param {[]} data - The data containing emojis from the API response.
  */
  loadEmoji(data: []) {
    data.forEach(emoji => {
      this.allEmojis.push(emoji);
    });
    this.showCategory('smileys-emotion');
  }

  loadCategorys(data: []) {
    data.forEach(category => {
      this.categoryList.push(category);
    });
    console.log(this.categoryList);
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

  showCategory(category: string) {
    this.emojiList = this.allEmojis.filter(emoji => emoji.group == category);
    this.currentCategory = category;
  }
}