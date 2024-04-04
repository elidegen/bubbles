import { CommonModule, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel, ChannelService } from '../services/channel.service';
import { UserService } from '../services/user.service';
import { MainService } from '../services/main.service';
import { FilePickerComponent } from '../file-picker/file-picker.component';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-channel-dialog',
  standalone: true,
  imports: [NgSwitchCase, CommonModule, FormsModule, FilePickerComponent],
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
    picture: 'assets/img/profile_placeholder.svg',
    read_by: [],
    hash: ''
  };

  constructor(
    private userService: UserService,
    public mainService: MainService,
    private channelService: ChannelService,
    private http: HttpClient,
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

  async handleImg(file: File) {
    console.log('file from newchnl dlg', file);
    this.newChannel.picture = 'assets/img/profile_placeholder_blue.svg';
    

  }

  async uploadImg(file: File) { //not in use
    const url = environment.baseUrl + 'media/channel_pictures/' + file.name + '/';
    let formdata = new FormData();
    formdata.append('picture', file);
    const response = await firstValueFrom(this.http.post<Channel>(url, formdata));
  }
}