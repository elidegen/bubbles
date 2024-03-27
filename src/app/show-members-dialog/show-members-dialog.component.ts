import { Component } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { User, UserService } from '../services/user.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-show-members-dialog',
  standalone: true,
  imports: [],
  templateUrl: './show-members-dialog.component.html',
  styleUrl: './show-members-dialog.component.scss'
})
export class ShowMembersDialogComponent {
  currentChannel: Channel;
  currentMembers: User[] = [];

  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private mainService: MainService,
  ) { 
    this.currentChannel = this.channelService.currentChannel;
    this.getMembers();
  }

  getMembers(){
    this.currentChannel.members.forEach((member) => {
      const user = this.userService.getUser(member);
      this.currentMembers.push(user);
    })
  }

  openAddMembers() {
    this.mainService.showMembersPopup = false;
    this.mainService.addMembersPopup = true;
  }
}