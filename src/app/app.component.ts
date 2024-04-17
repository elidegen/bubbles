import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MainService } from './services/main.service';
import { PopupComponent } from './popup/popup.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthService } from './services/auth.service';
import { ChannelService } from './services/channel.service';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, PopupComponent, LoaderComponent, ThemePickerComponent]
})
export class AppComponent implements OnInit {
  constructor(
    public mainService: MainService,
    public authService: AuthService,
    public channelService: ChannelService,
    private router: Router
  ) {
    mainService.setTheme();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        if (url.includes('/resetpassword') || url.includes('/forgotpassword') || url.includes('/success') || url.includes('/signup')) {
          return
        } else {
          this.handleLogin();
        }
      }
    });
  }

  async handleLogin() {
    this.mainService.loader = true;
    if (this.authService.isUserLoggedIn() && localStorage.getItem('currentUser')) {
      this.router.navigate(['/home']);
      this.channelService.getChatsForUser();
    } else {
      this.channelService.resetData();
    }
  }

  ngOnInit(): void {
    // if (authService.currentUser) {
    //   this.router.navigate(['/home']);
    // } else {
    //   this.router.navigate(['/login']);
    // }

    // document.documentElement.style.setProperty('var(--color1)', 'lightgrey');
  }
}