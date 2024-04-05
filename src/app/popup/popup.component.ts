import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { CreateChannelDialogComponent } from '../create-channel-dialog/create-channel-dialog.component';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { AddMembersDialogComponent } from '../add-members-dialog/add-members-dialog.component';
import { ShowMembersDialogComponent } from '../show-members-dialog/show-members-dialog.component';
import { EditChannelDialogComponent } from '../edit-channel-dialog/edit-channel-dialog.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, CreateChannelDialogComponent, ProfileDialogComponent, AddMembersDialogComponent, ShowMembersDialogComponent, EditChannelDialogComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  constructor(
    public mainService: MainService
  ) { }
}
