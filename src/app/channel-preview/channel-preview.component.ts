import { Component, Input } from '@angular/core';
import { Channel } from '../services/channel.service';

@Component({
  selector: 'app-channel-preview',
  standalone: true,
  imports: [],
  templateUrl: './channel-preview.component.html',
  styleUrl: './channel-preview.component.scss'
})
export class ChannelPreviewComponent {

  @Input() channel: Channel | undefined;

}
