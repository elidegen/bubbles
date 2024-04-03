import { CommonModule, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel, ChannelService } from '../services/channel.service';
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
    is_channel: true,
    picture: '',
    read_by: [],
    hash: ''
  };

  constructor(
    private userService: UserService,
    public mainService: MainService,
    private channelService: ChannelService,
  ) { }

  addMemberToChannel() {
    if (this.addAllMembers) {
      this.selectedMembers = this.userService.users.map(obj => obj.id) as number[];
      this.newChannel.members = this.selectedMembers;
    } else {
      this.newChannel.members = this.selectedMembers;
    }
    
    // sende newChannel ans Backend
    this.channelService.chats.push(this.newChannel as Channel);
    this.channelService.filterChats();
    this.mainService.closePopups();
  }
}