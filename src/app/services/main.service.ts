import { Injectable } from '@angular/core';
import { Theme } from '../theme-picker/theme-picker.component';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  loader: boolean = true;

  showPopup: boolean = false;
  popupMessage: string | undefined;
  popupIsError: boolean = true;
  addChannelPopup: boolean = false;
  profilePopup: boolean = false;
  addMembersPopup: boolean = false;
  showMembersPopup: boolean = false;
  editChannelPopup: boolean = false;

  showEmojiPicker: 'thread' | 'chat' | 'reaction' | undefined;
  allEmojis: Array<any> = [];
  categoryList: Array<any> = [];
  emojiUrl: string = 'https://emoji-api.com/emojis?access_key=a3f490babea502cd547755934800ad65f1dd5f65';
  categoryUrl: string = 'https://emoji-api.com/categories?access_key=a3f490babea502cd547755934800ad65f1dd5f65';

  sideMenuOpen: boolean = true;
  threadOpen: boolean = false;
  mainChatOpen: boolean = true;
  showNewMessageSearch: boolean = false;

  userFetchingDone: boolean = false;
  chatsAndPreviewFetchingDone: boolean = false;
  messageAndThreadFetchingDone: boolean = false;

  showThemes: boolean = false;
  showColorPalette: boolean = true;
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
  },
  {
    name: 'brown',
    color1: '#a64f3c',
    color2: '#d98d62',
    color3: '#bfd9c3',
    color4: '#8abfa6',
    color5: '#262523',
    color6: '##4d4b4b',
  }];

  constructor() {
    this.checkSelectedTheme();
    this.getEmojis();
  }

  checkSelectedTheme() {
    if (!this.themes.some(theme => theme.name === this.selectedTheme)) {
      localStorage.setItem('selectedTheme', 'purple');
      this.selectedTheme = 'purple';
    }
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
    this.popupMessage = undefined;
    this.addChannelPopup = false;
    this.profilePopup = false;
    this.addMembersPopup = false;
    this.showMembersPopup = false;
    this.editChannelPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }

  popupLog(message: string, isError: boolean) {
    this.popupIsError = isError;
    this.openPopup();
    this.popupMessage = message;
    setTimeout(() => {
      this.closePopups();
    }, 3000);
  }

  deactivateLoader() {
    if (this.userFetchingDone && this.chatsAndPreviewFetchingDone && this.messageAndThreadFetchingDone) {
      this.loader = false;
      this.userFetchingDone = false;
      this.chatsAndPreviewFetchingDone = false;
      this.messageAndThreadFetchingDone = false;
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
    setTimeout(() => {
      document.documentElement.style.setProperty('--transition', 'all 125ms ease-in-out');
    }, 200);
  }
}