import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { NewChannelDialogComponent } from '../new-channel-dialog/new-channel-dialog.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, NewChannelDialogComponent, ProfileComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  
  constructor(public mainService:MainService){

  }
}
