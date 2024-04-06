import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { Channel, ChannelService } from '../services/channel.service';
import { User } from '../services/user.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-add-members-dialog',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './add-members-dialog.component.html',
  styleUrl: './add-members-dialog.component.scss'
})
export class AddMembersDialogComponent {
  currentChannel!: Channel;
  selectedUsers: User[] = [];

  constructor(
    public mainService: MainService,
    public channelService: ChannelService,
  ) {
    this.currentChannel = channelService.currentChannel;
  }

}
