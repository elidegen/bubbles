import { CommonModule, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel } from '../services/channel.service';
import { UserService } from '../services/user.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-new-channel-dialog',
  standalone: true,
  imports: [NgSwitchCase, CommonModule, FormsModule],
  templateUrl: './new-channel-dialog.component.html',
  styleUrl: './new-channel-dialog.component.scss'
})
export class NewChannelDialogComponent {
  addMembers: boolean = false;
  addAllMembers: boolean = false;
  selectedMembers: number[] = [];
  newChannel: Channel = {
    id: 0,
    name: '',
    description: '',
    members: [],
    isChannel: true,
  };

  constructor(
    private userService: UserService,
    private mainService: MainService,
  ) { }

  addMemberToChannel() {
    if (this.addAllMembers) {
      this.selectedMembers = this.userService.users.map(obj => obj.id);
      this.newChannel.members = this.selectedMembers;
    } else {
      this.newChannel.members = this.selectedMembers;
    }
    console.log(this.newChannel);
    // sende newChannel ans Backend
    this.mainService.addChannelPopup = false;
    this.mainService.showPopup = false;
  }
}