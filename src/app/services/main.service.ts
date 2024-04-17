import { Injectable } from '@angular/core';
import { Theme } from '../theme-picker/theme-picker.component';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  showThemes: boolean = false;
  showPopup: boolean = false;
  errorMessage: string | undefined;
  logMessage: string | undefined;
  loader: boolean = false;
  addChannelPopup: boolean = false;
  profilePopup: boolean = false;
  addMembersPopup: boolean = false;
  showMembersPopup: boolean = false;
  editChannelPopup: boolean = false;
  sideMenuOpen: boolean = true;
  showNewMessageSearch: boolean = false;
  fetchingDone: number = 0;
  showEmojiPicker: 'thread' | 'chat' | 'reaction' | undefined;
  allEmojis: Array<any> = [];
  categoryList: Array<any> = [];
  emojiUrl: string = 'https://emoji-api.com/emojis?access_key=a3f490babea502cd547755934800ad65f1dd5f65';
  categoryUrl: string = 'https://emoji-api.com/categories?access_key=a3f490babea502cd547755934800ad65f1dd5f65';
  selectedTheme: string = localStorage.getItem('selectedTheme') || 'purple';
  themes: Theme[] = [{
    name: 'purple',
    color1: '#4d426d',
    color2: '#5c4f82',
    color3: '#efa985',
    color4: '#3cc6b7',
    color5: '#FFFFFF',
    color6: '#adadad',
  },
  {
    name: 'dark',
    color1: '#173157',
    color2: '#224780',
    color3: '#bd3c5d',
    color4: '#52c2d8',
    color5: '#FFFFFF',
    color6: '#adadad',
  },
  {
    name: 'pink',
    color1: '#490033',
    color2: '#750052',
    color3: '#f79c3a',
    color4: '#3af79c',
    color5: '#FFFFFF',
    color6: '#adadad',
  },
  {
    name: 'orange',
    color1: '#fdc92d',
    color2: '#7860cd',
    color3: '#6e9cd3',
    color4: '#70cbad',
    color5: '#060606',
    color6: '#000000',
  }];

  
  constructor() {
    this.getEmojis();
  }

  /**
  * Fetches emojis from the API.
  */
  getEmojis() {
    fetch(this.emojiUrl)
      .then(res => res.json())
      .then(data => this.loadEmoji(data));

    fetch(this.categoryUrl)
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
  }

  loadCategorys(data: []) {
    data.forEach(category => {
      this.categoryList.push(category);
    });
  }

  closePopups() {
    this.showPopup = false;
    this.errorMessage = undefined;
    this.logMessage = undefined;
    this.addChannelPopup = false;
    this.profilePopup = false;
    this.addMembersPopup = false;
    this.showMembersPopup = false;
    this.editChannelPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }

  errorLog(message: string) {
    this.openPopup();
    this.errorMessage = message;
    setTimeout(() => {
      this.closePopups();
    }, 3000);
  }

  messageLog(message: string) {
    this.openPopup();
    this.logMessage = message;
    setTimeout(() => {
      this.closePopups();
    }, 3000);
  }

  deactivateLoader() {
    this.fetchingDone++;
    if (this.fetchingDone >= 3) {
      this.loader = false;
      this.fetchingDone = 0;
    }
  }

  setTheme() {
    const currentTheme = this.themes.filter(obj => obj.name === this.selectedTheme);
    document.documentElement.style.setProperty('--color1', currentTheme[0].color1);
    document.documentElement.style.setProperty('--color2', currentTheme[0].color2);
    document.documentElement.style.setProperty('--color3', currentTheme[0].color3);
    document.documentElement.style.setProperty('--color4', currentTheme[0].color4);
    document.documentElement.style.setProperty('--color5', currentTheme[0].color5);
    document.documentElement.style.setProperty('--color6', currentTheme[0].color6);
  }
}