import { Component, OnDestroy } from '@angular/core';
import { MainService } from '../services/main.service';
import { FilePickerComponent } from '../file-picker/file-picker.component';
import { Channel, ChannelService } from '../services/channel.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-edit-channel-dialog',
  standalone: true,
  imports: [FilePickerComponent, FormsModule],
  templateUrl: './edit-channel-dialog.component.html',
  styleUrl: './edit-channel-dialog.component.scss'
})
export class EditChannelDialogComponent {
  editName: boolean = false;
  editDesc: boolean = false;
  currentChannel: Channel;
  updatedChannel!: Channel;
  imgSelected: File | undefined;

  constructor(
    public mainService: MainService,
    public channelService: ChannelService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.currentChannel = channelService.currentChannel;
    this.updatedChannel = {
      id: this.currentChannel.id,
      name: this.currentChannel.name,
      description: this.currentChannel.description,
      members: this.currentChannel.members,
      is_channel: true,
      read_by: this.currentChannel.read_by,
      hash: this.currentChannel.hash,
      picture: this.channelService.getImg(this.currentChannel.picture),
    }
  }


  handleImg(file: File) {
    if (file) {
      this.imgSelected = file;
    }

    let reader = new FileReader();
    reader.onload = (event: any) => {
      if (event.target.readyState === FileReader.DONE) {
        const imageData = event.target.result;
        this.updatedChannel.picture = imageData;
      }
    };
    reader.readAsDataURL(file);
  }


  leaveChannel() {
    this.updatedChannel = this.currentChannel;
    const index = this.updatedChannel.members.findIndex(obj => obj === this.authService.currentUser.id)
    this.updatedChannel.members.splice(index, 1);
    this.putChannel();
    this.mainService.closePopups();
  }

  async putChannel() {
    const url = environment.baseUrl + 'channels/' + this.currentChannel.id + '/';
    const formData = new FormData();
    if (this.imgSelected) {
      formData.append('name', this.updatedChannel.name);
      formData.append('description', JSON.stringify(this.updatedChannel.description));
      this.updatedChannel.members.forEach(memberId => {
        formData.append('members', memberId.toString());
      });
      formData.append('is_channel', this.updatedChannel.is_channel.toString());
      formData.append('picture', this.imgSelected);
    };

    // const index = this.channelService.chats.findIndex(obj => obj.hash === this.currentChannel.hash);
    // this.channelService.chats[index] = this.updatedChannel;

    this.mainService.closePopups();
  }
}