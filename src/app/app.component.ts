import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MainService } from './services/main.service';
import { PopupComponent } from './popup/popup.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthService } from './services/auth.service';
import { ChannelService } from './services/channel.service';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, PopupComponent, LoaderComponent]
})
export class AppComponent implements OnInit {
  constructor(
    public mainService: MainService,
    public authService: AuthService,
    public channelService: ChannelService,
    private router: Router
  ) {
  
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        const url = this.router.url;
        if (url.includes('/resetpassword') || url.includes('/forgotpassword') || url.includes('/success') || url.includes('/signup')) {
          return
        } else {
          this.handleLogin();
        }
      }
    });  

  }

  handleLogin(){
    this.mainService.loader = true;
    console.log('User logged in?', this.authService.isUserLoggedIn());
    
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/home']);
      this.channelService.getChatsForUser();
    } else {
      this.authService.resetData();
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
