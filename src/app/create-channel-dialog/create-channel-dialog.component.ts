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
  selector: 'app-create-channel-dialog',
  standalone: true,
  imports: [NgSwitchCase, CommonModule, FormsModule, FilePickerComponent],
  templateUrl: './create-channel-dialog.component.html',
  styleUrl: './create-channel-dialog.component.scss'
})
export class CreateChannelDialogComponent {
  addMembers: boolean = false;
  addAllMembers: boolean = false;
  selectedMembers: number[] = [];
  imgSelected: File | undefined;
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
    this.postChannel();
  }

  async postChannel() {
    const url = environment.baseUrl + 'channels/';
    const formData = new FormData();

    if (this.imgSelected) {
      formData.append('name', this.newChannel.name);
      formData.append('description', JSON.stringify(this.newChannel.description));
      this.newChannel.members.forEach(memberId => {
        formData.append('members', memberId.toString());
      });
      formData.append('is_channel', this.newChannel.is_channel.toString());
      formData.append('picture', this.imgSelected);
    };
    console.log(formData);

    const response = await firstValueFrom(this.http.post(url, formData)) as Channel;
    console.log('resp', response);

    // sende newChannel ans Backend
    // this.channelService.chats.push(this.newChannel as Channel);
    this.mainService.closePopups();
  }


  handleImg(file: File) {
    console.log(this.newChannel);
    if (file) {
      this.imgSelected = file;
    }

    let reader = new FileReader();
    reader.onload = (event: any) => {
      if (event.target.readyState === FileReader.DONE) {
        const imageData = event.target.result;
        this.newChannel.picture = imageData;
      }
    };
    reader.readAsDataURL(file);
  }


  async uploadImg(file: File) { //not in use
    const url = environment.baseUrl + 'media/channel_pictures/' + file.name + '/';
    const formdata = new FormData();
    formdata.append('picture', file);
    const response = await firstValueFrom(this.http.post<Channel>(url, formdata));
  }
}