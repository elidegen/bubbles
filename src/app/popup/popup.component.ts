import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { NewChannelDialogComponent } from '../new-channel-dialog/new-channel-dialog.component';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { AddMembersDialogComponent } from '../add-members-dialog/add-members-dialog.component';
import { ShowMembersDialogComponent } from '../show-members-dialog/show-members-dialog.component';
import { ChannelDetailsDialogComponent } from '../channel-details-dialog/channel-details-dialog.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, NewChannelDialogComponent, ProfileDialogComponent, AddMembersDialogComponent, ShowMembersDialogComponent, ChannelDetailsDialogComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  constructor(
    public mainService: MainService
  ) { }
}
