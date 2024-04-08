import { Component } from '@angular/core';
import { MessageBarComponent, MessageContent } from '../message-bar/message-bar.component';
import { ChannelService } from '../services/channel.service';
import { SearchComponent } from '../search/search.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [MessageBarComponent, SearchComponent],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})
export class NewMessageComponent {


  constructor(
    public channelService: ChannelService,
    private mainService: MainService,
  ) { }

  handleNewMessage(messageContent: MessageContent){
    console.log('messagecontent', messageContent);
    
  }
}
