import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  showPopup = false;
  errorMessage: string | undefined;
  loader: boolean = false;
  addChannelPopup: boolean = false;
  profilePopup: boolean = false;

  constructor() { }

  closePopups() {
    this.showPopup = false;
    this.errorMessage = undefined;
    this.addChannelPopup = false;
    this.profilePopup = false;
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

}
