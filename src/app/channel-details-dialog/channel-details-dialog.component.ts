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
  selector: 'app-channel-details-dialog',
  standalone: true,
  imports: [FilePickerComponent, FormsModule],
  templateUrl: './channel-details-dialog.component.html',
  styleUrl: './channel-details-dialog.component.scss'
})
export class ChannelDetailsDialogComponent {
  editName: boolean = false;
  editDesc: boolean = false;
  currentChannel: Channel;
  updatedChannel!: Channel;

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
    console.log('new file:', file);

    this.updatedChannel.picture = 'assets/img/profile_placeholder_green.svg';
  }

  leaveChannel() {
    this.updatedChannel = this.currentChannel;
    const index = this.updatedChannel.members.findIndex(obj => obj === this.authService.currentUser.id)
    this.updatedChannel.members.splice(index, 1);
    console.log('left channel', this.updatedChannel);
    this.putChannel();
    this.mainService.closePopups();
  }

  async putChannel() {
    console.log('before', this.channelService.chats);

    const url = environment.baseUrl + 'channels/' + this.currentChannel.id + '/';

    // const index = this.channelService.chats.findIndex(obj => obj.hash === this.currentChannel.hash);
    // this.channelService.chats[index] = this.updatedChannel;
    const response = await firstValueFrom(this.http.put(url, this.updatedChannel));


    console.log('res', response);
    console.log('after', this.channelService.chats);


    this.mainService.closePopups();
  }
}