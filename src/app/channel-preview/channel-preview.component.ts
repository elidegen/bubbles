import { Component, Input, OnInit } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-channel-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-preview.component.html',
  styleUrl: './channel-preview.component.scss'
})
export class ChannelPreviewComponent implements OnInit {
  @Input() channel!: Channel;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService
  ) {

  }
  ngOnInit(): void { }

  getLatestMsg() {
    if (this.messageService.filterByChannel(this.channel.id).length > 0) {
      return this.messageService.filterByChannel(this.channel.id)[this.messageService.filterByChannel(this.channel.id).length - 1].content;
    } else {
      return 'Empty conversation'
    }
  }
}
