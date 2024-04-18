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
    color1: '#4d426d', //dunkle hauptfarbe
    color2: '#5c4f82', //helle hauptfarbe
    color3: '#efa985', //nachrichten/akzente
    color4: '#3cc6b7', //buttons links (call to action) -> höherer kontrast
    color5: '#FFFFFF', //textfarbe
    color6: '#adadad', //schwarz
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
    name: 'bright',
    color1: '#c2dee9',
    color2: '#f2fafe',
    color3: '#f0d9d2',
    color4: '#ff4e94',
    color5: '#060606',
    color6: '#000000',
  },
  {
    name: 'pink',
    color1: '#490033',
    color2: '#750052',
    color3: '#f79c3a',
    color4: '#3af79c',
    color5: '#FFFFFF',
    color6: '#adadad',
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
    console.log('fetchingdone', this.fetchingDone);
    
    this.fetchingDone++;
    if (this.fetchingDone >= 3) {
      this.loader = false;
      this.fetchingDone = 0;
      console.log('fetchingdone2', this.fetchingDone);
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