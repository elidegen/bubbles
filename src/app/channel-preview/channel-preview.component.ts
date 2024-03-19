import { Component, Input, OnInit } from '@angular/core';
import { Channel, ChannelService } from '../services/channel.service';
import { CommonModule } from '@angular/common';
import { Message, MessageService } from '../services/message.service';

@Component({
  selector: 'app-channel-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-preview.component.html',
  styleUrl: './channel-preview.component.scss'
})
export class ChannelPreviewComponent implements OnInit {
  @Input() channel!: Channel;
  latestMsg!: Message;

  constructor(
    public channelService: ChannelService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.latestMsg = this.getLatestMsg();
  }

  getLatestMsg() {
    if (this.messageService.filterByChannel(this.channel.id).length > 0) {
      return this.messageService.filterByChannel(this.channel.id)[this.messageService.filterByChannel(this.channel.id).length - 1];
    } else {
      return {
        author: 0,
        reactions: [],
        in_Thread: false,
        source: 0,
        content: 'Empty chat', // Placeholder in case there is no message in Channel
        created_at: new Date,
      } as Message
    }
  }

  getDate() {
    let date = this.latestMsg.created_at;
    // console.log(new Date().toISOString().split('T'));

    console.log(date.getHours() + ':' + date.getMinutes());


      let time = this.latestMsg.created_at.toISOString().split('T')[1];
      console.log(time);
      return time.substring(0, 5)
  }

  isToday(date: Date) {
    let dummy = date;
    return dummy.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
  }
}