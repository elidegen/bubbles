import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { Channel, ChannelService } from '../services/channel.service';
import { User, UserService } from '../services/user.service';
import { SearchComponent } from '../search/search.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-add-members-dialog',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './add-members-dialog.component.html',
  styleUrl: './add-members-dialog.component.scss'
})
export class AddMembersDialogComponent {
  currentChannel!: Channel;
  channelMembers: User[] = [];
  channelMembersId: number[] = [];

  constructor(
    public mainService: MainService,
    public channelService: ChannelService,
    private userService: UserService,
    private http: HttpClient,
  ) {
    this.currentChannel = channelService.currentChannel;

    this.prepareChannelMembers();
  }

  prepareChannelMembers() {
    for (const memberId of this.currentChannel.members) {
      this.channelMembers.push(this.userService.getUser(memberId))
    }
  }

  handleSelectedUsers(selectedUsers: User[]) {
    this.channelMembers = selectedUsers;
  }

  removeMember(member: User) {
    this.channelMembers.splice(this.channelMembers.indexOf(member), 1)
  }

  async addMembers() {
    for (const member of this.channelMembers) {
      if (member.id)
        this.channelMembersId.push(member.id);
    }

    const formData = new FormData();
    this.channelMembersId.forEach(memberId => {
      formData.append('members', memberId.toString());
    });

    const url = environment.baseUrl + 'channels/' + this.currentChannel.id + '/';
    const response = await firstValueFrom(this.http.patch<Channel>(url, formData));
    localStorage.setItem('currentChannel', JSON.stringify(response));
    // this.channelService.currentChannel = response;
    // this.mainService.closePopups();
    location.reload(); //reload der seite OK?
  }
}